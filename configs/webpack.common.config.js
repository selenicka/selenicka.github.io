var path = require('path');
var helpers = require('./helpers');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['./index.js'],
  output: {
    path: helpers.root('dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.css']
  },
  resolveLoader: {
    root: path.resolve(__dirname, "node_modules")
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        plugins: [
          ['transform-runtime', {
            'polyfill': false,
            'regenerator': true
          }]
        ]
      }
    },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
        include: helpers.root('sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      filename: '../index.html'
    })
  ]
};