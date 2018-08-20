const path = require("path");

module.exports = [
    {
        mode: "development",
        entry: "./client/src/js/main.js",
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, "client/public"),
            filename: "js/bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: "/node_modules",
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["env", "react", "stage-2"]
                        }
                    }
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: "./client/src/css/vars.scss"
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [],
        externals: [require("webpack-require-http")]
    },
    {
        mode: "development",
        entry: {
            "sw.js": "./client/src/js/sw.js"
        },
        output: {
            path: path.resolve(__dirname, "client/public"),
            filename: "[name]"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: "/node_modules",
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["env", "react", "stage-2"]
                        }
                    }
                }
            ]
        }
    }
];
