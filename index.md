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