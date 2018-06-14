function cb(val) {
  console.log(`${val}: 更新了`)
}

/**
 * 数据劫持
 * @param {Object} obj 监听的对象
 * @param {String} prop 属性名称
 * @param {any} val 属性值
 */
function defineReactive(obj, prop, val) {
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(prop, '执行了获取数据')
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      cb(newVal)
    },
  })
}

/**
 * 给对象每个属性添加监听
 * @param {Object} value - 需要监听的对象
 */
function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  Object.keys(value).forEach((prop) => {
    defineReactive(value, prop, value[prop])
  })
}

const people = {
  name: 'yxf',
  add: '江西省上饶市广丰县',
}

observer(people)

