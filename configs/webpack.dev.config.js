var config = require('./webpack.common.config');
var merge = require('webpack-merge');
var webpack = require("webpack");

const devServer = {
  port: 8080,
  host: '127.0.0.2'
};

module.exports = merge(config, {
  devServer: devServer,
  watch: true,
  output: {
    publicPath: 'dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('production')
    })
  ]
});