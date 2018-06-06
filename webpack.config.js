const path = require('path');
const del = require('del');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const browsers = [
  'chrome',
];

del.sync([
  path.join(__dirname, 'dist', '*'),
  `!${path.join(__dirname, 'dist', '.gitconfig')}`
]);

const configBuilder = (browser) => {
  return {
    entry: {
      background: './src/background.js',
      main: './src/index.js',
      options: './src/options.js',
      popup: './src/popup.js'
    },
    output: {
      path: path.join(__dirname, 'dist', browser),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          use: [ 'style-loader', 'css-loader' ],
          test: /\.css$/
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
      new webpack.DefinePlugin({
        'process.env': {
          EXTENSION_VERSION: '2.0.0',
          BROWSER: browser
        }
      })
    ],
    optimization: {
      minimize: true
    }
  }
};

module.exports = browsers.map((browser) => configBuilder(browser));