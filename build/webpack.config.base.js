'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');

let environment = (process.env.webpackEnvironment) ? process.env.webpackEnvironment : process.env.NODE_ENV;
//console.log("environment == ", environment);

/*********************************
* Entry
*********************************/
function siteScripts(name) {
  return `./src/${name}.site.js`;
}

function siteStyles(name) {
  return `./assets/sass/${name}.site.scss`;
}

function siteScriptsAndStyles(name) {
  return [
    siteStyles(name),
    siteScripts(name),
  ];
}

let entry = {
  'app': siteScriptsAndStyles('app')
};

const plugins = [
  require('autoprefixer'),
  new HtmlWebpackPlugin({
    title: 'HTML / Webpack 4 Template',
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }),
  new CopyWebpackPlugin([{
    from: utils.resolve('static/images'),
    to: utils.resolve('dist/static/images'),
    toType: 'dir'
  }]),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: false
  }),
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   Vue: ['vue/dist/vue.esm.js', 'default'],
  //   // _map: ['lodash', 'map']
  // })
];

module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'], // not sure .scss works here
    alias: {
      'assets': utils.resolve('assets'),
      'pages': utils.resolve('src/pages'),
      'static': utils.resolve('static'),
      'components': utils.resolve('src/components'),
      'mixins': utils.resolve('src/mixins'),
      'data': utils.resolve('src/data'),
      '@': utils.resolve('src'),
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js',
      '@fortawesome/fontawesome-free-regular$': '@fortawesome/fontawesome-free-regular/shakable.es.js'
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          compact: 'false'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.site.scss$/,
        exclude: ['node_modules'],
          use: [
            {
              loader: "style-loader"
            },
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
