const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

let config = {
    mode: 'development',
    entry: './public/javascripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
        // make bundle available globally
        libraryTarget: 'var',
        library: 'lib'
    },
    module: {
      rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env'],
                // Needed for compiling async await
                plugins: [ ["@babel/transform-runtime"] ]
                }
            }
        },
        // {
        //     test: /\.css$/i,
        //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // },
      ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),
    ]
};

// if (process.env.NODE_ENV !== 'production') {
//     config.plugins.push(new WebpackShellPlugin({onBuildEnd: ['webpack-dev-server --open']}));
// }

module.exports = config;