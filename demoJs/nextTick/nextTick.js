/* ===================收集和执行观察者对象==================== */
let callbacks = []
let pending = false

function nextTick(cb) {
  callbacks.push(cb)

  if (!pending) {
    pending = true
    setTimeout(() => {
      pending = false
      // 这里为什么用 slice???
      const copies = callbacks.slice(0)
      callbacks.length = 0
      copies.forEach((fn) => {
        fn()
      })
    }, 0)
  }
}

module.exports = nextTick