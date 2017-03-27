const webpack = require('webpack');

module.exports = {
  entry: './source/js/html.js',
  output: {
    path: './docs/',
    filename: 'js/html.js',
  },
  target: 'node',
  node: {
    __dirname: true,
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
    ],
  },
  plugins: [
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
  ],
};
