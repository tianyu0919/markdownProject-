/*
 * @Author: 卢天宇
 * @Date: 2022-07-29 00:57:09
 * @Description: 生产环境的配置
 */
process.env.NODE_ENV = "production";

const Path = require('path');
const baseConfig = require('./webpack.base.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  ...baseConfig,
  output: {
    path: Path.resolve(__dirname, '../../server/dist'),
    filename: 'js/[name]_[hash:8].js',
    publicPath: './'
  },
  optimization: {
    minimize: false, // * 打包不显示 .license.txt 文件：https://segmentfault.com/q/1010000037637581
  },
  mode: 'production',
  plugins: baseConfig.plugins.concat([
    new BundleAnalyzerPlugin()
  ])
}