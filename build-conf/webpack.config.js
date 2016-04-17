const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    name: 'browser',
    entry: {
      main: './src/client/main.js',
    },
    output: {
      path: './public/resources',
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel?cacheDirectory', 'eslint'] },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, loader: 'url-loader' },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
    externals: {
      jquery: 'jQuery',
    },
  },
];
