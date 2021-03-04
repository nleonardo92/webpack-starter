const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        //assetModuleFilename: 'images[hash][ext][query]',
        clean:true,
    },
    optimization: {
        minimize: false,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },


    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources:false,
                  }

            },
            {
                test: /\.css$/i,
                //exclude: /styles\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {

                test: /\.(jpg|svg|png|gif)$/i,
         
                type: 'asset/resource'
         
            },
       

            
            


        ]
    },



    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', ignoreOrder: false,

        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets/" },
            ],
          }),
       
    ],





}