class Routers {
  constructor() {
    // 以键值对形式存储路由
    this.routers = {}
    // 当前路由的URL
    this.currentUrl = ''

    // 监听对应事件
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  // 将 path 路径与对应的 callback 函数存储
  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  // 刷新
  refresh() {
    // 获取当前URL中的 hash 路径
    this.currentUrl = location.hash.slice(1) || '/'
    // 执行当前 hash 路径的callback函数
    this.routes[this.currentUrl]()
  }
}