# vue 笔记

参考文章: http://hcysun.me/vue-design/art/8vue-reactive-dep-watch.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%9A%84%E6%84%8F%E4%B9%89

## init.js

- 初始化uuid
- 合并和规范化 prop、Inject(可以是数组、也可以是对象[类似于取别名])、Directives、mixins、options、data、mergeAssets、watch
- 通过 `initProxy` 代理作用域的确定

## state.js

initState 其实是很多选项初始化的汇总，包括：props、methods、data、computed 和 watch 等。并且我们注意到 props 选项的初始化要早于 data 选项的初始化

- 监听 '$data', '$props' 属性
- 原型上增加 '$set', '$delete'，'$watch'

## lifecycle.js(确定组件之间的关系)

- 在原型上添加 _update、$forceUpdate、$destroy 三个方法
- $children
- $refs

## event.js

- $emit
- $off
- $once
- $on

## render.js

- $nextTick
- _render

## vue 全局api

- Vue.extend
- Vue.mixin
- Vue.use
- Vue.component
- Vue.directive
- Vue.filter
- Vue.set(别名: this.$set)
- Vue.delete(别名: this.$delete)

## 其他的

- [shared/util.js](http://hcysun.me/vue-design/appendix/shared-util.html)

- [Vue 构造函数整理-全局API](http://hcysun.me/vue-design/appendix/vue-global-api.html)

- [Vue 构造函数整理-原型](http://hcysun.me/vue-design/appendix/vue-prototype.html)

- [Vue 实例的设计](http://hcysun.me/vue-design/appendix/vue-ins.html)

- [探索Vue高阶组件](http://hcysun.me/vue-design/more/vue-hoc.html)

- Vue.compile 就是 `compileToFunctions` 的别名

- 多了解下 vue 的 inject 功能

- vue的生命周期函数是可以写成数组形式包含多个钩子，钩子函数是按顺序执行的
- 注册的全局组件，都保存在 `Vue.options.components` 对象中
- vue 包含 KeepAlive, Transition, TransitionGroup 3个内置组件
- render 函数需要好好看下
- vue 初始化处理的优先级: props优先级 > data优先级 > methods优先级
- 只有在执行了 $mount 情况下 才会调用 compileToFunctions方法 将 template 字符串编译为渲染函数(render)，并将渲染函数添加到 vm.$options，在然在通过 render 函数并返回生成的虚拟节点(vnode)，_update 函数的作用是把 vm._render 函数生成的虚拟节点渲染成真正的 DOM。


## 生命周期

- beforeCreated
  - 初始化uuid
  - 合并和规范化 prop、Inject(可以是数组、也可以是对象[类似于取别名])、Directives、mixins、options、data、mergeAssets、watch
  - 通过 `initProxy` 代理作用域的确定
  - 对 $options 规范和合并

- created(由于没有挂载，所有无法访问dom)
  - initInjections(vm) // resolve injections before data/props
  - initState(vm) // 包括 initProps、initMethods、initData initComputed 以及 initWatch
  - initProvide(vm) // resolve provide after data/props