/*
 * @Author: 卢天宇
 * @Date: 2022-07-28 23:05:09
 * @Description: webpack 的基础打包设置
 */
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../index.tsx'),
  },
  output: {
    path: Path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      "@src": Path.resolve(__dirname, '../src'),
      "@components": Path.resolve(__dirname, '../src/components'),
      "@assets": Path.resolve(__dirname, '../src/assets'),
      "@containers": Path.resolve(__dirname, '../src/containers'),
      "@layout": Path.resolve(__dirname, '../src/layout'),
      "@ltyDesign": Path.resolve(__dirname, '../src/ltyDesign'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ]
          },
        },
      },
      // * CSS Module 的配置
      {
        test: /\.modules\.(c|le)ss$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: NODE_ENV === 'development' ? "[path][name]__[local]--[hash:8]" : '[hash:8]'
              }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"]
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      // * 普通样式文的配置
      {
        test: /\.(c|le)ss$/,
        exclude: [/node_modules/, /\.modules\.(c|le)ss$/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"]
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        type: "asset/source",
        // generator: {
        //   filename: 'assets/markdown/[hash][ext][query]'
        // }
        // use: [
        //   { loader: "html-loader" },
        //   { 
        //     loader: 'remark-loader',
        //     options: {
        //       remarkOptions: {
        //         plugins: [RemarkHTML]
        //       }
        //     }
        //   },
        // ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name]_[hash:8].css', // * 如果是本地开发的话不添加 hash 值，给css名字添加 hash contenthash chunckhash 都会使css文件不重新渲染。
    }),
    new CleanWebpackPlugin()
  ]
}