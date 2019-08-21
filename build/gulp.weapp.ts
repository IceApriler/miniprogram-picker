import * as path from "path"
import * as fs from "fs-extra"
import * as gulp from "gulp"
import * as sourcemaps from "gulp-sourcemaps"
import * as ts from "gulp-typescript"
import * as gulpIf from "gulp-if"
import { isFixed } from './gulp.utils'
const eslint = require('gulp-eslint')
const tsProject = ts.createProject('tsconfig.json')

export type Done = (error?: any) => void

export interface WeappConfig {
  /** 开发源码 */
  srcPath: string
  /** 开发目录 */
  devPath: string
  /** 编译完成的组件源码 */
  distPath: string
}

export class Weapp {
  readonly fileSrc: string[]
  readonly tsSrc: string

  readonly srcPath: string
  readonly distPath: string
  readonly devPath: string

  constructor(config: WeappConfig) {
    const { srcPath, distPath, devPath } = config
    this.srcPath = srcPath
    this.distPath = distPath
    this.devPath = devPath

    this.tsSrc = path.resolve(this.srcPath, '**/*.ts')
    this.fileSrc = ['.js', '.json', '.wxss', '.wxml'].map(ext => path.resolve(this.srcPath, `**/*${ext}`))
    this.init()
  }

  init() {
    this.createClean()
    this.createCopy()
    this.createBuild()
    this.createWatch()

    gulp.task("default", gulp.series('clean:dev', gulp.parallel('copy', 'build:ts')))
    gulp.task('dev', gulp.series('clean:dev', gulp.parallel('copy', 'build:ts'), 'watch'))
  }

  createClean() {
    gulp.task("clean:dev", (done: Done) => {
      fs.emptyDirSync(this.devPath)
      done()
    })
    gulp.task("clean:dist", (done: Done) => {
      fs.emptyDirSync(this.distPath)
      done()
    })
  }

  createCopy() {
    gulp.task("copy", () => {
      return gulp.src(this.fileSrc)
        .pipe(gulp.dest(this.devPath))
    })
  }

  createBuild() {
    gulp.task("build:ts", () => {
      return gulp.src(this.tsSrc)
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(this.srcPath)))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(this.devPath))
    })
  }

  createWatch() {
    gulp.task("watch", (done: Done) => {
      gulp.watch(this.tsSrc, gulp.series('build:ts'))
      gulp.watch(this.fileSrc, gulp.series('copy'))
      done()
    })
  }
}
