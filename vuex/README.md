# vuex文档

## vuex 的组成部分分为

- state
- getter
- mutation
- action

### state

Vuex 使用 `state` 来存储应用中需要共享的状态，为了能让 Vue 组件在 state 更改后也随着更改，需要基于 state 创建计算属性。

### getters

类似于 Vue 中的计算属性，获取 state 中的数据

### mutations

前面两个都是状态值本身， `mutations` 才是改变状态的执行, `mutations` 用于同步地改变状态，其中第一个参数是 `state`，后面的其他参数是发起 `mutation` 时传入的参数。

### actions

想要 `异步地更改状态`, 需要使用 action，但 action 并不直接改变 state，而是通过发起 `mutation` 来进行改变。

- action 返回的是一个 promise 对象

```javascript
store.dispath('actionA', param).then((data) => {
  // data 是通过 action，return 回来的值。
})
```

## 与组件组合功能

- mapState
- mapGetters
- mapMutations
- mapActions
