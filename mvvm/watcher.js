class Watcher {
  constructor(vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    // 将自己添加到订阅器中
    this.value = this.get()
  }

  update() {
    this.run()
  }

  run() {
    const value = this.vm.data[this.exp]
    const oldVal = this.value

    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }

  get() {
    Dep.target = this
    // 强制执行监听器里面的get函数
    const value = this.vm.data[this.exp]
    Dep.target = null

    return value
  }
}