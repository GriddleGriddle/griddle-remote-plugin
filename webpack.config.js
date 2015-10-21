var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

module.exports = {
  devtool: 'eval',
  entry: './src/index',
  output: {
    path: __dirname + '/build/',
    filename: 'griddle-render.js',
    publicPath: '/build/',
    libraryTarget: 'umd'
  },
  plugins: [
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': reactExternal,
    'superagent': 'superagent'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    } ]
  }
};
