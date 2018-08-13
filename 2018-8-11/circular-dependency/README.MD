# 循环引用

- [阮一峰文章](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

PS:

ES6 module 在运行的时候会先预解析 export 对外参数, 然后在解析 import 导入的对应模板，最后执行该模块的代码