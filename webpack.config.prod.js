const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


process.env.NODE_ENV = "production";

const publicUrl = '/public'


module.exports = {
    mode: "production",
    target: "web",
    devtool: "none",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "[name].[hash].js"
    },
    plugins: [
        // Display bundle stats
        new CleanWebpackPlugin(),
        // new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),

        new CompressionPlugin({
            compressionOptions: {level: 9}
        }),

        //TODO see https://vembainfra.atlassian.net/browse/VEM-3702

        new webpack.DefinePlugin({
            // This global makes sure React is built in prod mode.
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
            minify: {
                // see https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunksSortMode: 'dependency'
        }),
        new WebpackMd5Hash(),
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("cssnano")],
                            sourceMap: true
                        }
                    }
                ]
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
