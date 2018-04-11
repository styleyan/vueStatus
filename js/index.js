function Vue(options) {
  this.data = options.data
  this.methods = options.methods

  Object.keys(this.data).forEach((key) => {
    this.proxyKeys(key)
  })

  observe(this.data)
  new Compile(options.el, this)
  // 所有事情处理好后执行mounted函数
  options.mounted.call(this)
}

Vue.prototype = {
  proxyKeys(key) {
    const self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get() {
        return self.data[key]
      },
      set(newVal) {
        self.data[key] = newVal
      }
    })
  }
}