const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BUILD_ROOT = path.join(__dirname,'/prod/')
module.exports = merge(common,{
    mode : 'production',
    plugins: [
        new ProgressBarPlugin(),
        new UglifyJsPlugin(),
    ],
    output : {
        'path' : BUILD_ROOT,
        'filename': 'prod-bundle.js',
        'publicPath': path.join(__dirname,'/prod/'),
        'chunkFilename':  '[name]-chunk.js'
    }
})