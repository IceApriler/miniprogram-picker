import * as path from "path"
import { WeappConfig } from './gulp.weapp'

export const weappConfig: WeappConfig = {
  srcPath: path.resolve(__dirname, '../src'),
  distPath: path.resolve(__dirname, '../miniprogram_dist'),
  devPath: path.resolve(__dirname, '../miniprogram_dev')
}