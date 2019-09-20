const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin');


process.env.NODE_ENV = "development";

const publicUrl = '/public'


module.exports = {
    mode: "development",
    target: "web",
    devtool: "source-map",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false,
        host:'0.0.0.0',
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            // This global makes sure React is built in prod mode.
            "process.env.NODE_ENV": JSON.stringify("development"),
            api_path: JSON.stringify("localhost:8888"),
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /(\.scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                include: path.resolve(__dirname, 'src'),

            },
            {
                test : /\.(png|svg|jpg|gif|woff|woff2|ttf)$/,
                use: [
                    "file-loader"
                ],
                include: path.resolve(__dirname, 'src'),

            }
        ]
    }
};
