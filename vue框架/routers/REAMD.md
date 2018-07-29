# 前端路由实现

## 事件

- load: 页面加载完成后触发的事情
- hashchange: hash变化时触发的回调事件

## 常用 API 接口

- window.history.back()  // 后退
- window.history.forward() // 前进
- window.history.go(-3)  // 后退三个页面
- window.history.pushState(state, title, url) // 添加历史记录，并不触发跳转
- window.history.replaceState(state, title, url) // 修改当前纪录,同样不触发跳转。
- window.history.popstate() // 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。