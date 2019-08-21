import * as path from "path"
import * as through from "through2"
import * as vinyl from "vinyl"

export function getSuffix(filename: string) {
  const index = filename.lastIndexOf(".")
  return filename.substr(index + 1)
}

export function src2dist(filename: string, dist: string, srcRegExp: RegExp) {
  const relativePath = path.relative(__dirname, filename).split(path.sep).join('/')
  const projectPath = relativePath.replace(srcRegExp, '')
  const distPath = path.join(dist, projectPath)
  return distPath
}

export function vinylIsTs(fs: vinyl) {
  return fs.extname === '.ts'
}

export function vinylIsNotTs(fs: vinyl) {
  return fs.extname !== '.ts'
}

export function vinylIsJs(fs: vinyl) {
  return fs.extname === '.js'
}

export function vinylIsStyl(fs: vinyl) {
  return fs.extname === '.styl'
}

export function isFixed(fs: vinyl) {
  return fs.eslint && fs.eslint.fixed && fs.eslint.errorCount === 0
}

export function pipeFunc(callback: Function) {
  return through.obj(function (chunk, enc, cb) {
    callback && callback(chunk)
    this.push(chunk)
    return cb()
  })
}

export function getNowTime() {
  function fillZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`
  }
  const now = new Date()
  const year = now.getFullYear()
  const month = fillZero(now.getMonth() + 1)
  const date = fillZero(now.getDate())
  const hour = fillZero(now.getHours())
  const minute = fillZero(now.getMinutes())
  const second = fillZero(now.getSeconds())
  const currentTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  return currentTime
}