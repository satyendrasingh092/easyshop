module.exports = {
    entry: [
        './index.js'
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude : __dirname + '/node_modules/',
            loaders: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1'],
                plugins: [ 'syntax-dynamic-import' ],
            },

        },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            }
        ]
    },
   /* optimization: {
        splitChunks: {
            chunks: 'all',
            name: true,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
    }*/
}