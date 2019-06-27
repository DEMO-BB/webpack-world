var path = require('path');

console.log(path.resolve(__dirname, ''))
module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',
    libraryTarget: 'umd',
  },
  externals: {
    // 这意味着你的library需要一个名为lodash的依赖，这个依赖在用户的环境中必须存在且可用
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    },
  },
};