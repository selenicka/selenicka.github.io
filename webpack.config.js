var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const devServer = {
  port: 8080,
  host: '127.0.0.2'
};

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: ['./index.js'],
  devServer: devServer,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
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
        include: path.resolve(__dirname, 'sass')
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
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('production')
    })
  ]
};