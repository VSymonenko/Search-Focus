const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',

  entry: {
    playground: './src/playground.ts'
  },

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: 'inline-source-map',

  devServer: {
    index:  'ui.html',
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    open: true,
    port: 8081,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    noInfo: true,
    injectHot: true,
    inline: true,
    hotOnly: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui', 'playground'],
    }),
    // stub, this plugin crashed production build
    new webpack.HotModuleReplacementPlugin(),
  ],
})
