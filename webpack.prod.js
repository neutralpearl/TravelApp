const path = require('path');
const webpack = require('webpack');
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
        minimizer: [],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: false, 
            verbose: true, 
            cleanStaleWebpackAssets: false, 
            protectWebpackAssets: false 
        }),
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