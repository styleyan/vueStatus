export default function (Vue) {
  Vue.mixin({ beforeCreate: vuexInit })
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
