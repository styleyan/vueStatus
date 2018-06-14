/** ==================================难点================================== */
// 订阅者依赖收集器
class Dep {
  constructor() {
    this.subs = []
  }
  // 在subs中添加一个Watcher对象
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知所有Watcher对象更新视图
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
Dep.target = null

// 观察者 Watcher，(一个组件就有一个观察者，收集该组件所有的依赖)
class Watcher {
  constructor() {
    console.log(this)
    /** 在new 一个Watcher对象时，将该对象复制给Dep.target，在get中会用到 */
    Dep.target = this
  }
  /** 更新视图的方法 */
  update() {
    console.log('视图更新啦~~')
  }
}


/** =============================添加和难点=================================== */
function defineReactive(obj, prop, val) {
  const dep = new Dep()
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get:() => {
      /** 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target)
      return val
    },
    set:(newVal) => {
      if (newVal === val) return
      val = newVal
      /* 在set的时候出发dep的notify来通知所有的Watcher对象更新视图 */
      dep.notify()
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

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    /** 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();
    /** 在这里模拟render的过程，为了出发test属性的算数 */
    // console.log('render~', this._data.test)
    this._data.test = 'yxf--sss'
  }
}

const va = new Vue({
  data: {
    test: 'fff',
    add: 'yxf',
  }
})

va._data.test = 'eeee'
