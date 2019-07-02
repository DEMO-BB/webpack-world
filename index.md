使用这种方式去管理 JavaScript 项目会有一些问题：

无法立即体现，脚本的执行依赖于外部扩展库(external library)。
如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

# 第一种打包方式
```
npx webpack
```

# 第二种打包方式
```
npm webpack --config webpack.config.js
```

# 第三种打包方式
```
npm run build
```

webpack 将动态打包（dynamically bundle）所有依赖项（创建所谓的依赖图dependency graph）

# Manifest
你可能会感兴趣，webpack及其插件似乎“知道”应该哪些文件生成。答案是，通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。如果你对通过其他方式来管理 webpack 的输出更感兴趣，那么首先了解 manifest 是个好的开始。

通过使用 WebpackManifestPlugin，可以直接将数据提取到一个 json 文件，以供使用。

我们不会在此展示一个关于如何在你的项目中使用此插件的完整示例，但是你可以仔细深入阅读 manifest 的概念页面，以及通过缓存指南来弄清如何与长期缓存相关联。

# 实时监听错误
```
npm run watch
```
问题是：你需要刷新浏览器

# webpack-dev-server

# webpack-dev-middleware
webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

# 热更新
需要配合node来处理

# tree shaking
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

# sideEffects
将文件标记为无副作用(side-effect-free)
在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。

如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将属性标记为false，来告知webpack，它可以安全的删除未用到的export导出。

副作用：
再导入时会执行特殊行为的代码，而不是仅仅暴露一个export或多个export。举例说明，例如polyfill，它影响全局作用域，并且通常不提供export

# 区分开发环境和生产环境的配置
开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

# 代码分离
有三种常用的代码分离方法：

* 入口起点：使用 entry 配置手动地分离代码。
* 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
* 动态导入：通过模块的内联函数调用来分离代码。

# 动态导入(dynamic imports)
自动分离公共的代码，动态加载，只有引用到的时候才进行加载输出

# bundle 分析(bundle analysis)
通过代码分析，可以看到依赖包的大小依赖情况

# 懒加载
核心问题，就是异步出发的操作，可以等到点击操作的时候再进行加载处理。这个其实可以用在有很多交互操作的页面上。对于项目打包还是一个非常有意义的优化目标。

# 缓存
https://searchstorage.techtarget.com/definition/cache

只要打包之后的项目部署到服务器上，客户端就能访问网站此服务器的资源。而最后一步获取资源是比较耗费时间的。浏览器有一种缓存技术，可以通过命中缓存，以降低网络流量，使网站加载速度更快。
缓存的存在，当你需要获取新的代码时，就会有问题。
Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' (use [hash] instead)

更新一个文件之后，其他的文件不需要更新hash值，但是如果仅仅时添加manifest，就会出现其他的问题。
添加这个：new webpack.HashedModuleIdsPlugin(),试试,有问题

https://www.cnblogs.com/lalalagq/p/9809174.html

# 问题解决
* css打包 ok
* clean代码
* hashedModuleIdsPlugin失效

webpack 4 的Code Splitting 它最大的特点就是配置简单，如果你的 mode 是 production，那么 webpack 4 就会自动开启 Code Splitting。
它内置的代码分割策略是这样的：

新的 chunk 是否被共享或者是来自 node_modules 的模块
新的 chunk 体积在压缩之前是否大于 30kb
按需加载 chunk 的并发请求数量小于等于 5 个
页面初始加载时的并发请求数量小于等于 3 个
https://www.jianshu.com/p/23dcabf35744

# shimming
我们不推荐使用全局的东西，但是如果有就需要使用shimming来进行处理。
polyfill浏览器功能以支持更多用户时，在这种情况下，我们希望这些polifils提供给到需要修复的浏览器上，也就是实现按需加载

一些传统的模块依赖的this指向的是widnwo对象。

其他工具，还有一些其他工具能够帮助我们处理老旧的模块

# 渐进式网络应用程序
使用Workbox的Google项目来实现配置 web app 的离线支持
这个板块需要专门研究一下，然后出一个可以针对项目快速构建PWA的插件

# babel 转译器
* 主要对预设 presets 和插件 plugins 进行配置
* 语法转义，对js最新语法糖进行编译，并不负责转译js新增的api和全局对象
babel-preset-env、babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest等
```
{ // 官方推荐配置
  "presets": ["env", {
      "modules": false
    }],
    "stage-2"
}
```
* 补丁转义器，主要负责转译js新增的api和全局对象
babel-plugin-transform-runtime这个插件能够编译Object.assign,同时也可以引入babel-polyfill进一步对includes这类用法保证在浏览器的兼容性。Object.assign 会被编译成以下代码：__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()
* jsx和flow插件，这类转译器用来转移jsx语法和移除类型生命，使用react的额时候你将使用他
转译器名称为babel-preset-react
