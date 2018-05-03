// https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown

class Vue{
  constructor(options) {
    this._data = options.data && options.data()
    observe(this._data, options.render)
  }
}

function observe(value, cb) {
  Object.keys(value).forEach((key) => {
    defineReact(value, key, value[key], cb)
  })
}

function defineReact(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: () => {
      return obj[key]
    },
    set: (newVal) => {
      cb(newVal)
    },
  })
}


let app = new Vue({
  el: '#app',
  data() {
    return {
      aaa: 'fff',
      fff: 'cccc',
    }
  },
  render(val) {
    console.log(val)
  },
})

setTimeout(() => {
  app._data.aaa = 'yxfces'
}, 4000)