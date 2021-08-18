const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './frontend/App.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/index.html",
            filename: "react-ssr.html",
            scriptLoading: "defer",
            cache: true,
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
};