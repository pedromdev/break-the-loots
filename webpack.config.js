const path = require('path');
const del = require('del');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteJsonPlugin = require('write-json-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const EXTENSION_VERSION = '2.0.0';

const browsers = [
  'chrome',
];

del.sync([
  path.join(__dirname, 'dist', '*'),
  `!${path.join(__dirname, 'dist', '.gitconfig')}`
]);

const configBuilder = (browser) => {
  let manifest = require(`./src/manifest/${browser}.json`);

  manifest.version = EXTENSION_VERSION;

  return {
    entry: {
      background: [ 'babel-polyfill', './src/background.js' ],
      main: [ 'babel-polyfill', './src/index.js' ],
      options: [ 'babel-polyfill', './src/options.js' ],
      popup: [ 'babel-polyfill', './src/popup.js' ]
    },
    output: {
      path: path.join(__dirname, 'dist', browser),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.png$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                context: ''
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        chunks: [ 'options' ],
        template: './src/options.html',
        filename: 'options.html'
      }),
      new WriteJsonPlugin({
          object: manifest,
          filename: 'manifest.json',
          pretty: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env.BROWSER': JSON.stringify(browser),
        'process.env.EXTENSION_VERSION': JSON.stringify(EXTENSION_VERSION),
      })
    ],
    optimization: {
      minimize: true
    }
  }
};

module.exports = browsers.map((browser) => configBuilder(browser));