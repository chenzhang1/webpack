const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { devtool } = require("./webpack.config.dev");
const { sources } = require("webpack");
function getStyleLoader(pre) {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                        ],
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    entry: "./src/main.js",
    //输出
    output: {
        path: path.resolve(__dirname, "../dist"),//绝对路径
        //入口文件打包输出文件名字
        filename: "static/js/main.js",
        clean: true,
    },
    module: {
        rules: [
            //loader的配置
            {
                oneOf:[
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
                              options: {
                                cacheDirectory: true,//缓存
                        cacheCompression: false,//缓存压缩
                              }, 
                        },
                    },
                ]
               }
        ]
    },
   
    plugins: [new ESLintPlugin({
        //检测有哪些文件需要检查
        context: path.resolve(__dirname, '../src'),
        cache: true, //缓存
        cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'), //缓存位置
        exclude: "node_modules", //默认值
    }), new HtmlWebpackPlugin({
        //模板:将模板文件复制到打包目录中 1.结构和原来一致,2.可以自动引入打包的资源
        template: path.resolve(__dirname, "../public/index.html"),
    }), new MiniCssExtractPlugin({
        filename: "static/css/main.css",
    }),new CssMinimizerPlugin()//css压缩
],
    mode: 'production',
    devtool:'source-map'

}
