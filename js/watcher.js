function Watcher(vm, exp, cb) {
  this.cb = cb
  this.vm = vm
  this.exp = exp
  // 将自己添加到订阅器的操作
  this.value = this.get()
}

Watcher.prototype = {
  update() {
    this.run()
  },
  run() {
    const value = this.vm.data[this.exp]
    const oldVal = this.value

    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get() {
    // 缓存自己
    Dep.target = this
    // 强制执行监听器里面的get函数
    const value = this.vm.data[this.exp]
    // 释放自己
    Dep.target = null
    return value
  }
}