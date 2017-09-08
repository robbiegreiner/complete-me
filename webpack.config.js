var path = require('path');

module.exports = {
  entry: './index.js',
  module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "transform-loader?brfs"
            }
        ]
    },
  output: {
    filename: 'bundle.js',
    path: __dirname
  }
};
