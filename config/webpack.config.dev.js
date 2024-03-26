const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
    entry: "./src/main.js", //相对路径
    //输出
    output: {
        path: undefined,//绝对路径.开发模式没有输出可以不指定路径
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
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        /* 小于10kb的文件会被转为base64 */
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: "static/images/[hash:10][ext]",
                }
            },
            {
                test: /\.(ttf||woff||woff2||mp3||mp4||avi)$/,
                type: 'asset/resource',
                generator: {
                    filename: "static/media/[hash:10][ext]",
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    /*   options: {
                        presets: ['@babel/preset-env'],
                      }, */
                },
            },
        ]
    },
    plugins: [new ESLintPlugin({
        //检测有哪些文件需要检查
        context: path.resolve(__dirname, '../src'),
    }), new HtmlWebpackPlugin({
        //模板:将模板文件复制到打包目录中 1.结构和原来一致,2.可以自动引入打包的资源
        template: path.resolve(__dirname, "../public/index.html"),
    })],
    //开发服务器
    devServer: {
        host: "localhost",
        port: "3000",
        open: true,
    },
    mode: 'development'
}
