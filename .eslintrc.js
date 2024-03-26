//eslint 的配置
module.exports = {
    //继承es6规则
    extends:["eslint:recommended"],
    env:{
        node:true, //启用node中的全局变量
        browser:true, //允许浏览器使用全局变量
    },
    parserOptions:{
        ecmaVersion:6, //解析es6语法
        sourceType:'module', //解析模块
    },
}
