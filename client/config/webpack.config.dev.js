/*
 * @Author: 卢天宇
 * @Date: 2022-07-28 23:05:09
 * @Description: 开发环境的配置。
 */
process.env.NODE_ENV = "development";

const Path = require('path');
const baseConfig = require('./webpack.base.js');
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    port: 3000,
    open: true
  },
  plugins: baseConfig.plugins.concat([
    new ReactRefreshPlugin(),
    // * 用来检查代码错误，会启用 eslint ，eslint 配置在了 package.json 中
    new ForkTsCheckerWebpackPlugin(),
  ])
}