const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');

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
    polyfills: './src/polyfills.js',
    // print: './src/print.js',
    // another: './src/another-module.js'
    // app: './src/dynamic.js',
    vendor: ['lodash'],
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
      //   test: /\.js$/,
      //   enforce: "pre",
      //   loader: 'eslint-loader'
      // },
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
      // {
      //   // todo 有问题，不能打包处理成功
      //   test: require.resolve('index.js'),
      //   use: 'imports-loader?this=>window'
      // },
      // {
      //   // 将一个文件导出到全局
      //   test: require.resolve('globals.js'),
      //   use: 'exports-loader?file,parse=helpers.parse'
      // }
    ]
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
    new CleanWebpackPlugin(),
    // new webpack.BannerPlugin({ banner: (yourVariable) => { console.log('yourVariable: ', yourVariable); return `yourVariable: ${yourVariable}`; } }),
    new webpack.BannerPlugin({
      banner: `filename: [name]\nauthor: beth\ndate: ${new Date()}`
    }),
    new HtmlWebpackPlugin({
      // title: 'Code Splitting',
      // title: 'Caching',
      title: 'Progressive Web Application',
      meta: {
        favicon: 'https://admin.uskid.com/favicon.ico',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    }),
    // 4之后已经删除，需要在optimization中设置 moduleIds: hashed,
    // new webpack.HashedModuleIdsPlugin({
    //   hashFunction: 'sha256',
    //   hashDigest: 'hex',
    //   hashDigestLength: 20
    // }),// 用来缓存打包文件的hash，仅仅改变需要改变的文件hash名
    
    // 注意一定要在HtmlWebpackPlugin之后引用
    // inline 的name 和你 runtimeChunk 的 name保持一致
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /manifest\..*\.js$/
    }),
    new ExtractTextPlugin('style.css'),
    // new ManifestPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(), // 分析依赖包
    // 该方法在4之后就移除了
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称
    // }),
    new webpack.ProvidePlugin({
      // _: 'lodash'
      join: ['lodash', 'join'],
    }),
    // todo workbox 依赖安装不上
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助 ServiceWorkers 快速启动
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
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
};