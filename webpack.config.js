// The path to the CesiumJS source code
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry:  ['./source/js/main.ts', './source/css/styles.scss'],
  output: {
    filename: 'source/js/main.js',
    path: __dirname,
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {outputPath: 'source/css', name: 'styles.css'},
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'production',
};
