const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html')

const configBuilder = (browser) => {
  return {
    entry: {
      background: './src/background.js',
      main: './src/index.js',
      options: './src/options.js'
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
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),
      new HtmlWebpackPlugin({
        inject: false,
        chunks: [ 'options' ],
        filename: './src/options.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          EXTENSION_VERSION: '2.0.0',
          BROWSER: browser
        }
      })
    ]
  }
};

module.exports = [
  configBuilder('chrome'),
];