var config = require('./webpack.common.config');
var merge = require('webpack-merge');
var webpack = require("webpack");

module.exports = merge(config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});