/**
 * 增加 链式Promise 功能
 * https://segmentfault.com/a/1190000009478377
 */

function Promise2(fn) {
  var value = null
  var callbacks = []
  var state = 'pending'

  /**
   * onFulfilled: 是then 添加的观察者
   * resolve: 是 new Promise2((resolve) => consle.log(resolve))
   * TODO: then，catch是注册观察者
   */
  this.then = function(onFulfilled) {
    return new Promise2(function(thenResolve) {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: thenResolve,
      })
    })
  }

  function handle(callback) {
    // pending状态添加到监听者队列中
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }
    // then没有添加观察者情况，比如：new Promise().then().then((result) => console.log(result))
    if (!callback.onFulfilled) {
      callback.resolve(value)
      return
    }

    // 执行当前 then回调函数的结果，如 new Promise((resolve) => resolve('第一个')).then((a) => return 'first')
    const currThenCallbackResult = callback.onFulfilled(value)

    // 得到结果值后，把后面一个promise的状态也改为成功
    callback.resolve(currThenCallbackResult)
  }

  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then
      if (typeof then === 'function') {
        /**
         * 把后邻Promise的resolve方法，注册到then方法 retrun 回来Promise的then回调中
         * new Promise((resolve) => resolve('foo')).then(() => Promise.resolve('bar')).then((msg) => {console.log(msg)})
         */
        then.call(newValue, resolve)
        return;
      }
    }

    value = newValue
    state = 'fulfilled'
    // 支持 Promise/A+规范，保证在resolve执行之前，then方法已经注册完所有的回调
    setTimeout(() => {
      callbacks.forEach((callback) => {
        handle(callback)
      })
    }, 0)
  }


  // new Promise() 的对外参数。
  fn(resolve)
}


new Promise2((resolve) => {
  setTimeout(() => {
    resolve('eee')
  }, 2000)
}).then().then((data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('then1')
    }, 3000)
  })
}).then(function(){
  console.log('then2')
})
