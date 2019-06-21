const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonOptions = {
  chunks: 'all',
  reuseExistingChunk: true
}

module.exports = {
  mode: "production", // 和 --optimize-minimize 标记一样都会在webpack内部调用UglifyJsPlugin
  // mode: "development",
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js'
    // app: './src/dynamic.js',
    vendor: ['lodash'],
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
      // title: 'Code Splitting',
      title: 'Caching',
    }),
    // 4之后已经删除，需要在optimization中设置 moduleIds: hashed,
    // new webpack.HashedModuleIdsPlugin({
    //   hashFunction: 'sha256',
    //   hashDigest: 'hex',
    //   hashDigestLength: 20
    // }),// 用来缓存打包文件的hash，仅仅改变需要改变的文件hash名
    new ExtractTextPlugin('style.css'),
    new ManifestPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(), // 分析依赖包
    // 该方法在4之后就移除了
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称
    // }),
  ],
  optimization: {
    namedChunks: true,
    moduleIds: 'hashed',
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      maxInitialRequests: 5,
      cacheGroups: {
        // polyfill: {
        //   test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
        //   name: 'polyfill',
        //   priority: 2,
        //   ...commonOptions
        // },
        // dll: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: 'dll',
        //   priority: 1,
        //   ...commonOptions
        // },
        commons: {
          name: "vendor",
          minChunks: 3, // 至少3个页面的引入才打入common包,
          ...commonOptions,
        },
      },
    }
  },
  output: {
    // filename: 'bundle.js',
    // filename: '[name].bundle.js',
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // 动态代码导入
    // chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
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