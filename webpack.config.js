const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  resolve: {
    fallback: {
      "child_process": false,
      "fs": false,
      "path": false,
      "os": false,
      "stream": false,
      "util": false,
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin'),
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ]
}
