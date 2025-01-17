const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtReloader = require('webpack-ext-reloader');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'inline-source-map' : false,
        entry: {
            popup: './src/popup/popup.js',
            background: './src/background.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/popup/popup.html',
                filename: 'popup.html',
                chunks: ['popup']
            }),
            new CopyPlugin({
                patterns: [
                    { 
                        from: "manifest.json",
                        to: "manifest.json"
                    },
                    {
                        from: 'assets',
                        to: 'assets'
                    }
                ]
            }),
            isDevelopment && new ExtReloader({
                port: 9090,
                reloadPage: true,
                entries: {
                    contentScript: 'popup',
                    background: 'background'
                }
            }),
            !isDevelopment && new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ].filter(Boolean),
        watch: isDevelopment,
        watchOptions: {
            ignored: /node_modules/
        }
    };
};