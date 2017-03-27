const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './source/js/index.js',
  output: {
    path: './docs/',
    filename: 'js/app.[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'latest', 'stage-0', 'react' ],
        },
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        ),
      },
    ],
  },
  postcss: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  plugins: [
    new ExtractTextPlugin('styles.[contenthash:8].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: './source/index.ejs',
      minify: {
        html5: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'deploy/CNAME',
        toType: 'file',
      },
      {
        from: 'deploy/.nojekyll',
        toType: 'file',
      },
      {
        from: './source/data/images',
        to: 'images',
      },
    ]),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss',
    }),
  ],
};
