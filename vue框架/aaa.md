# vue 原理图

## createCompilerCreator(callback)

通过该函数会得到 `createCompiler`

```javascript
export const createCompiler = createCompilerCreator(function(template, options) {
  const ast = parse(template.trim(), options)
  optimize(ast, options)
  const code = generate(ast, options)

  return {
    ast,
    render: code.render,
    // 静态渲染函数
    staticRenderFns: code.staticRenderFns
  }
})
```

## createCompiler(baseOptions)

执行该函数会得到 `compileToFunctions` 和 `compile` 2个函数

## compileToFunctions(template, options, vm[当前vue实例])

该函数式由 createCompileToFunctionFn 通过闭包的形式创建，目的是为了 通过 cache 对象缓存字符串模板的编译结果

- 是 Vue.compile 函数的别名
- 合并默认参数, 如对 `options` 的处理
- 缓存字符串模板的编译结果，防止重复编译，提升性能
- 调用 `compile` 函数
- 检查使用 compile 对模板进行编译的过程中是否存在错误和提示的，如果存在那么需要将其打印出来
- 该函数位于 `$mount` 方法中，作用是把传入的模板字符串 (template) 编译成渲染函数(render)的，

render函数的由来，src/compiler/to-function.js

```javascript
function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}
const compiled = compile(template, options)
// compiled.render 是个字符串
res.render = createFunction(compiled.render, fnGenErrors)
// 主要作用是渲染优化
res.staticRenderFns = compiled.staticRenderFns.map(code => {
  return createFunction(code, fnGenErrors)
})
```

## compile(template, options)

- 检查 options(使用编译器编译模板时传递的选项参数) 是否存在
- 合并自定义 `modules、directives`，以及拷贝 options 其他配置
- parse(template, options)
  该函数是一个解析器，它的作用是将模板字符串解析为对应的抽象语法树(AST)，包括(v-for，v-pre，v-once，key，ref，slot，v-bind，v-on)

  ```javascript
  {
    type: 1,
    tag: 'ul',
    parent: div,
    // optimezer 静态节点标记
    static: false,
    attrsList: [],
    children: [],
  }
  ```

- optimezer(ast, options)
  标记静态节点，为后面 patch 过程中对比新旧 VNode 树形结构做优化。被标记为 static 的节点在后面的 diff 算法中会被直接忽略，不做详细的比较。
  - 判断依据根据 node.if && !node.for 和节点类型，如果子节点也是非静态的，那也不是静态的
- generate(ast, options)
  根据给定的 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串

## render()

## vnode
VNode 是由 render function 转化而来
我们知道，render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。...

## update()

## path