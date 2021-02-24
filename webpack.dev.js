const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: "./src/js/main.js", // our entry file 
    output: { // where to emit and how to to name these files
        filename: "bundle.min.js", 
        path: path.resolve(__dirname, "./dist")
    }, 
    stats: 'verbose',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: "defaults"
                        }]
                    ]
                }
            }
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }, {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
        }, ]
    },
    plugins: [
        new WorkboxPlugin.GenerateSW(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: false, // 
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }), new CopyPlugin({
            patterns: [{
                from: "./src/img",
                to: "./img"
            }, ],
        }),
    ]

}