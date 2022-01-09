const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        clean: true, //clean the dist folder before output 
        path: path.resolve(__dirname, 'dist'), 
        filename: 'main.js', 
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
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('process.env')
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/client/media", to: "media"},
            ]
        }),
    ]
}