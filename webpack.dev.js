const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true, // 启用HMR
    host: 'localhost',
    // webpack-dev-server --entry /entry/file --output-path /output/path --allowed-hosts .host.com,host2.com
  },
});