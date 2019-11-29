const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Pirate'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-react'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                use: 'file-loader?name=fonts/[name].[ext]!static'
            }
        ],
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            "webfontloader": path.resolve(__dirname, "./node_modules/webfontloader/webfontloader.js")
        },
        extensions: [".ts", ".js"]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};