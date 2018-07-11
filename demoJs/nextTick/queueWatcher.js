const nextTick = require('./nextTick')

let has = {}
let queue = []
let waiting = false

function flushSchedulerQueue() {

  queue.forEach((watcher) => {
    has[watcher.id] = null
    watcher.run()
  })

  waiting = false
}

/** watcher对象执行 update() 方法调用该方法 */
function queueWatcher(watcher) {
  const id = watcher.id

  // 防止同一个watch对象执行多次updated的时重复添加
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)
  }

  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue)
  }
}

module.exports = queueWatcher