# webpack-StudyNotes
## webpack高级部分
1.提升开发体验
sourcemap:为什么,是什么,怎么用
1.1是什么:
SourceMap(源代码映射)是一个用来生成源代码与构建后代码一一映射的文件的方案,它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。
It generates an xxx.map file that contains the mapping between the source code and each line and column of the built code.
当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。
When a code error occurs after construction, the xxx.map file will be used to find the error location of the mapped source code from the error location of the code after construction, so that the browser can prompt the error location of the source code file, helping us find the root cause of the error faster.
2.2怎么用
实际开发中只需要关注两种情况:
开发模式:cheap-module-source-map
优点:打包编译速度快,只包含行映射
缺点没有列映射
```
module.export={
    mode:"development",
    devtool:"cheap-module-source-map"
}
```
生产模式:source-map
优点:包含行/列映射
缺点:打包编译速度更慢
```
module.export={
    mode:"development",
    devtool:"source-map"
}
```
# 提升打包构建速度
HotModuleReplacement
为什么? 开发时我们修改了其中一个模块代码,webpack默认会将
是什么? 在程序运行中,替换添加或删除模块,而无需重新加载整个页面
怎么用?在devserver中添加hot:true属性,只能在开发环境
OneOf
为什么打包时每个文件都会经过所有loader处理,虽然因为test正则原因实际没有处理上,但是都要过一遍。
Why each file will be processed by all loader when packaging, although it is not actually processed because of the test regular reason, but it must be passed over.
比较慢。
It's relatively slow.
是什么顾名思义就是只能匹配上一个 loader，剩下的就不匹配了。
As the name implies, it can only match the last loader, and the rest will not match.
怎么用
How does it work?
```
rules:[
    {
        oneOf:[]
    }
]
```
include/Exclude(只能写一个)
为什么 开发中我们需要使用第三方的库或者插件,所有文件都下载到node_modules中了,而这些文件是不需要编译可以直接使用的
所以我们在对js文件处理时,要排除node_modules文件夹下的文件
是什么 include包含,只处理xxx文件 exclude排除除了xxx文件以外其他文件都处理
怎么用:
cache 
为什么 每次打包的时候js文件都要经过Eslint检查和babel编译,速度比较慢
我们可以缓存之前的Eslint检查和babel的编译结果,这样第二次打包速度就更快了
是什么 :对eslint检查和babel编译结果进行缓存
怎么用:
Thead
**为什么使用 Thread？**

在 Webpack 构建过程中，很多任务都是可以并行处理的，比如文件读取、代码转换等。使用单线程处理这些任务会导致构建过程变慢，因为它们是串行执行的，每个任务必须等待上一个任务完成后才能开始执行。而使用 Thread 可以将这些任务分配给多个线程同时执行，从而提高构建速度。

**怎么使用 Thread？**

在 Webpack 中，可以使用 `thread-loader` 来实现多线程处理任务。安装 `thread-loader`：

```bash
npm install thread-loader --save-dev
```

然后在 Webpack 配置中使用 `thread-loader` 包裹需要并行处理的 loader：

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        'thread-loader', // 使用 thread-loader 并行处理下面的 loader
        'babel-loader'
      ]
    }
  ]
}
```

这样就可以利用多线程并行处理 JavaScript 文件的编译，提高构建速度。