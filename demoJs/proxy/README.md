# proxy

- set(target, propKey, value)   // 拦截设置对象属性
- get(target, propKey) // 拦截获取属性
- deleteProperty(target, propKey) // 拦截通过 delete 删除属性
- [construct(target, args, newTarget)](http://es6.ruanyifeng.com/#docs/proxy#construct) // 拦截 `new` 命令，target: 目标对象, args: 构造函数的参数对象, newTarget: 创建实例的对象，必须返回一个对象否则会报错。
- defineProperty(target, key, descriptor) // 拦截 Object.defineProperty 操作