/* 入口文件
 */
import count  from "./js/count";
import sum from './js/sum'
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./stylus/index.styl"
import "./css/iconfont.css"
var result=count(2,1)
console.log(result)
console.log(count(3,1));
console.log(sum(1,2,3,4,5,6))
if(module.hot){
    module.hot.accept("./js/count")
    module.hot.accept("./js/sum")
}
