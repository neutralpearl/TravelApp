const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: "var",
        library: "Client",
        assetModuleFilename: 'assets/[name][ext]'
      },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',

            }
        ]
    },
    devServer: {
        port: 4000,
        compress: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // true = Simulate the removal of files
            dry: false,
            // Write Logs to Console
            verbose: true,
            // true = Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: false,
            // Do not allow removal of current webpack assets
            protectWebpackAssets: false
        }),
    ]
}