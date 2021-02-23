const path = require("path"); //Ścieżka do katalogu musi być absolutna, dlatego wyliczamy ją za pomocą path
const HtmlWebpackPlugin = require('html-webpack-plugin'); //niektóre pluginy trzeba zainstalować i zaimportować
const webpack = require('webpack');


module.exports = {
        entry: "./src/js/main.js", // skąd ma bundlowac 
        output: {
            filename: "bundle.min.js", //filename konkretną ścieżkę do pliku // do czego ma bundlowac
            path: path.resolve(__dirname, "./dist"),
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
                }]
            }
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html",
            }),
        ]
    }
