'use strict'

const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');
const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/*********************************
* Clean Webpack Plugins
*********************************/
// the path(s) that should be cleaned
let pathsToClean = [
  'dist/*'
];

// the clean options to use
let cleanOptions = {
  root: path.join(__dirname, '..', '/'),
  //exclude:  ['shared.js'],
  verbose:  true,
  dry:      false,
  allowExternal: true,
  watch: true
};

console.log("cleanOptions.root = ", cleanOptions.root);

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].bundle.min.[hash:7].js',
    path: utils.resolve('dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
          loaders: {
            scss: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['../dist/*.*'], {allowExternal: true}),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    // Extract Imported css into own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].bundle.min[hash:7].css',
      chunkFilename: "css/[name].[id].css"
    }),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
      }
    })
  ]
})
