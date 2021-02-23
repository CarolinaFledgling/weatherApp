const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: "./src/js/main.js", // skąd ma bundlowac 
    output: {
        filename: "bundle.min.js", //filename konkretną ścieżkę do pliku // do czego ma bundlowac
        path: path.resolve(__dirname, "./dist")
    }, // ma kierowac na katalog dis
    stats: 'verbose',
    module: {
        rules: [
            {
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
        }]
    },
    plugins: [
        new WorkboxPlugin.GenerateSW(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ]

}