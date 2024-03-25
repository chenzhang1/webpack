const path = require("path")
module.exports = {
    entry: "./src/main.js",
    //输出
    output: {
        path: path.resolve(__dirname, "dist"),//绝对路径
        //入口文件打包输出文件名字
        filename: "static/js/main.js",
        clean: true,
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/i,
                //use的执行顺序是从右到左从下到上
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'stylus-loader',
                ],
                // 将 Stylus 文件编译为 CSS
            },
            {
                test: /\.jpg/,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        /* 小于10kb的文件会被转为base64 */
                        maxSize: 10 * 1024
                    }
                },
                generator:{
                    filename:"static/images/[hash:10][ext]",
                }
            }
        ]
    },
    plugins: [],
    mode: 'development'
}
