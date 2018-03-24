const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app/src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'app/dist/js'),
        filename: 'bundle.js',
        publicPath: '/app/dist'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.sass$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [

    ],
    externals: [
        require('webpack-require-http')
    ],
};