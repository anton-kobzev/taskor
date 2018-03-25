const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./source/static/js/app.js', './source/static/css/style.sass'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js',
        publicPath: 'public'
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [

    ],
    externals: [
        require('webpack-require-http')
    ],
};