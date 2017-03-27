const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './source/js/index.js',
  output: {
    path: './docs/',
    filename: 'js/app.js',
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
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
    ],
  },
  postcss: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.ejs',
    }),
    new CopyWebpackPlugin([
      {
        from: './source/data/images',
        to: 'images',
      },
    ]),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      syntax: 'scss',
    }),
  ],
};
