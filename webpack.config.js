const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production", // 和 --optimize-minimize 标记一样都会在webpack内部调用UglifyJsPlugin
  // mode: "development",
  // entry: './src/index.js',
  entry: {
    // app: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js'
    app: './src/dynamic.js',
  },
  devtool: 'inline-source-map', // 不要用于生产环境
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true, // 启用HMR
    host: 'localhost',
    // webpack-dev-server --entry /entry/file --output-path /output/path --allowed-hosts .host.com,host2.com
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Code Splitting',
    }),
    new ManifestPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(), // 分析依赖包
    // 该方法在4之后就移除了
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称
    // }),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // 动态代码导入
    chunkFilename: '[name].bundle.js',
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
      // {
      //   // 处理其他文件格式的数据
      //   test: /\.(csv|tsv)$/,
      //   use: [ 'csv-loader' ]
      // },
      // {
      //   test: /\.xml$/,
      //   use: [ 'xml-loader' ]
      // }
    ]
  },
};