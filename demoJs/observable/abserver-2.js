function defineReactive(obj, prop, val) {
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get:() => {
      cb('这个更新了: get')
      debugger
      return val
    },
    set:(newVal) => {
      if (newVal === val) {
        return
      }
      val = newVal
      cb('这个更新了：set')
    },
  })
}

function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key])
  })
}

function cb(value) {
  console.log(`${value}: 更新了`)
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

const va = new Vue({
  data: {
    name: 'fff'
  }
})


console.log(JSON.stringify(va))