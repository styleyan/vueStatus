let uid = 0

class Watcher {
  constructor() {
    this.id = ++uid
  }

  update() {
    console.log(`watch${this.id}update`)
    queueWatcher(this)
  }

  run() {
    console.log(`watch${this.id}视图更新了`)
  }
}

let callbacks = []
let pending = false

function nextTick(cb) {
  callbacks.push(cb)
  
  if (!pending) {
    pending = true
    setTimeout(flushCallbacks, 0)
  }
}

function flushCallbacks() {
  pending = false
  // 先复制一遍数组，然后把旧数组给清空，最后在调用数组里的每一个方法
  const copies = callbacks.slice(0)
  callbacks.length = 0
  copies.forEach((fn) => {
    fn()
  })
}

let has = {}
let queue = []
let waiting = false

function flushSchedulerQueue() {
  let watcher, id

  queue.forEach((watcher) => {
    id = watcher.id
    has[id] = null
    watcher.run()
  })

  waiting = false
}

function queueWatcher(watcher) {
  const id = watcher.id

  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)

    if (waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

(function() {
  let watch1 = new Watcher()
  let watch2 = new Watcher()

  watch1.update()
  watch1.update()
  watch2.update()
})()