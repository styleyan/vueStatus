function Promise2(fn) {
  var value = null
  var callbacks = []
  var state = 'pending'

  this.then = function(onFulfilled) {
    // resolve之前添加的函数，放在队列中去，之后添加的则立即执行
    if (state === 'pending') {
      callbacks.push(onFulfilled)
      return this
    }
    onFulfilled(value)
    return this
  }
  function resolve(newValue) {
    value = newValue
    state = 'fulfilled'
    // 支持 Promise/A+规范，保证在resolve执行之前，then方法已经注册完所有的回调
    // 通过setTimeout机制，将resolve中执行回调的逻辑放置到JS任务对象末尾
    setTimeout(() => {
      callbacks.forEach((callback) => {
        callback(value)
      })
    }, 0)
  }
  fn(resolve)
}

new Promise2((resolve) => {
  resolve('eee')
}).then((msg) => {
  console.log(msg)
}).then((msg) => {
  console.log(msg)
})
