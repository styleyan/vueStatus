#### 条件
- 保证一个类仅有一个实例
- 可以全局访问

#### 适用
- 弹框的实现和全局缓存。

```javascript
function singleton(fn) {
  let instance = null
  return function () {
    if (!instance) {
      instance = fn.appley(this, arguments)
    }
    return instance
  }
}
```