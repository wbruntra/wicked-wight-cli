const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'lib'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  stats: {
    // Ignore warnings due to yarg's dynamic module loading
    warningsFilter: [/node_modules\/yargs/],
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
}
