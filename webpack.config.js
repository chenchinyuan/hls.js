var path = require('path')
var webpack = require('webpack')
var pkgJson = require('./package.json')

var env = process.env.NODE_ENV

var config = {
  output: {
    library: 'Hls',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkgJson.version)
    })
  ]
};

if (env == 'development') {
  config.output.sourceMapFilename = 'hls.js.map'
  config.devtool = 'source-map'
}
else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true
      }
    })
  )
}

module.exports = config
