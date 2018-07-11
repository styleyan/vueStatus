const queueWatcher = require ('./queueWatcher')

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

let watch1 = new Watcher()
let watch2 = new Watcher()

watch1.update()
watch2.update()
watch1.update()