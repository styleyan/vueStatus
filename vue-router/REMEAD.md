# api

## 全局守卫

beforeEach(to, from, next) {}   全局前置守卫
beforeResolve() {} 这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
afterEach(to, from) {}  全局后置钩子

## 路由独享守卫

beforeEnter(to, from, next) {}  路由独享前置守卫

## 组件内守卫

beforeRouteEnter(to, from, next) {}  在渲染该组件的对应路由被 confirm 前调用，不！能！获取组件实例 `this`
beforeRouteUpdate(to, from, next) {} 在当前路由改变，但是该组件被复用时调用
beforeRouteLeave(to, from, next) {}  导航离开该组件的对应路由时调用 ，可以访问组件实例 `this`

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

[单个路由的过渡](https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1)

