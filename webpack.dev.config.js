const merge = require('webpack-merge')
const common = require('./webpack.common.config')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BUILD_ROOT = path.join(__dirname,'/dev/')
module.exports = merge(common,{
    mode : 'development',
    devtool: 'source-map',
    plugins: [
        new ProgressBarPlugin()
    ],
    output : {
        'path' : BUILD_ROOT,
        'filename': 'dev-bundle.js',
        'publicPath': path.join(__dirname,'/dev/'),
        'chunkFilename':  '[name]-chunk.js'
    }
})