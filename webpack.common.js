const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  // mode: "production", // 和 --optimize-minimize 标记一样都会在webpack内部调用UglifyJsPlugin
  // mode: "development",
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    // print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new ManifestPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new ExtractTextPlugin('style.css'),
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        // 处理其他文件格式的数据
        test: /\.(csv|tsv)$/,
        use: [ 'csv-loader' ]
      },
      {
        test: /\.xml$/,
        use: [ 'xml-loader' ]
      }
    ]
  },
};
