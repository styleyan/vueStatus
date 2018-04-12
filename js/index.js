class Vue {
  constructor(options) {
    this.data = options.data
    this.methods = options.methods

    Object.keys(this.data).forEach((key) => {
      this.proxyKeys(key)
    })

    observe(this.data)
    new Compile(options.el, this)
    // 所有事情执行后，触发mounted函数
    options.mounted.call(this)
  }

  /**
   * Vue实例代理【修改、获取】data
   * @param {String} key data属性名
   */
  proxyKeys(key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: () => this.data[key],
      set: (newVal) => this.data[key] = newVal,
    })
  }
}