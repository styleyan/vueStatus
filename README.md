# vueStatus

vue学习仓库

### flow笔记

#### 对象的可选属性与变量的可选类型

```javascript
// @flow
type Test = {
 key1: ?string,
 key2?: number,
}
```

- 一个问号是在冒号后，类型名称前；表示 Test 类型中，必须有 key1 属性，但是属性值不一定的 string
- 另一个问号是在冒号前，属性名后；表示 Test 类型中，可以没有 key2 属性，但是如果出现了 key2 属性，属性值必须是一个 number 类型