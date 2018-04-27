export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
   /** Vuex的init钩子，会存入每一个Vue实例等钩子列表 */
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      // 存在store其实代表的就是Root节点，直接执行store(function)或者使用store(非function)
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    // 子组件直接从父组件中获取$store，这样就保证了所有组件都共用了全局的同一份store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
