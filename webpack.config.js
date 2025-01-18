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
            history: './src/popup/history.js',
            background: './src/background.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            clean: true
        },
        resolve: {
            extensions: ['.js', '.css'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@utils': path.resolve(__dirname, 'src/popup/utils'),
                '@components': path.resolve(__dirname, 'src/popup/components'),
                '@services': path.resolve(__dirname, 'src/popup/services'),
                '@state': path.resolve(__dirname, 'src/popup/state')
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true
                        }
                    }
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'common',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/popup/popup.html',
                filename: 'popup.html',
                chunks: ['popup', 'vendors', 'common']
            }),
            new HtmlWebpackPlugin({
                template: './src/popup/history.html',
                filename: 'history.html',
                chunks: ['history', 'vendors', 'common']
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
                    contentScript: ['popup', 'history'],
                    background: 'background'
                }
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ].filter(Boolean),
        watch: isDevelopment,
        watchOptions: {
            ignored: /node_modules/
        }
    };
};