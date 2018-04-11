class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(data, key, val) {
    const dep = new Dep()
    const childObj = observe(val)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // 添加观察者对象
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        
        return val
      },
      set: (newVal) =>{
        if (newVal === val) return
        
        val = newVal
        dep.notify()
      },
    })
  }
}

/**
 * 依赖收集
 */
class Dep {
  constructor() {
    // 观察者列表
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  /**
   * 通知所有观察者列表
   */
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
Dep.target = null


function observe(value, vm) {
  if (!value || typeof value !== 'object') return

  return new Observer(value)
}