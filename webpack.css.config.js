// webpack 3.x 的配置
var path = require('path')
const autoprefixer = require('autoprefixer')
var glob = require('globby')  
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS入口配置
var CSS_PATH = {
  css: {
    pattern: ['./src/**/[^_]*.less'],
    src: path.join(__dirname, 'src/components'),
    dst: path.resolve(__dirname, 'dist'),
  }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
  var fileList = glob.sync(config.pattern)
  return fileList.reduce(function (previous, current) {
    var filePath = path.parse(path.relative(config.src, current))
    var withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    return previous
  }, {})
}

module.exports = [
  {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname),
    entry: getCSSEntries(CSS_PATH.css),
    output: {
      path: CSS_PATH.css.dst,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },
              {
                loader: require.resolve('less-loader')
              }, 
            ]
          }),
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            // name: '[name].[ext]',
            outputPath: './',
            publicPath: '../'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader', 
        },
      ]
    },
    resolve: {
      extensions: ['.less', '.js', '.jsx']
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  },
]