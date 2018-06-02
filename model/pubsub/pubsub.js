class Event {
  constructor(){
    this.obj = {}
    this.cache = {}
  }
  on(eventType, fn) {
    if (typeof fn !== 'function') {
      throw('fn只能为函数')
      return
    }

    if (!this.obj[eventType]) {
      this.obj[eventType] = []
    }
    this.obj[eventType].push(fn)

    // 方便emit之后添加的订阅能立即执行
    const curCache = this.cache[eventType]
    if (curCache){
      curCache.length = Object.keys(curCache).length
      fn.apply(this, Array.from(curCache))
    }
  }
  emit() {
    const eventType = Array.prototype.shift.call(arguments)
    const eventList = this.obj[eventType]

    if (!eventList) {
      return
    }
    eventList.forEach((curFn) => {
      curFn.apply(curFn, arguments)
    })

    // 方便emit之后添加的订阅能立即执行
    this.cache[eventType] = {...arguments}
  }
}

const ev = new Event()

ev.on('yxf', function() {
  console.log(...arguments)
})

ev.emit('yxf', '我是参数1', '我是参数2')

ev.on('yxf', function() {
  console.log(...arguments)
})



