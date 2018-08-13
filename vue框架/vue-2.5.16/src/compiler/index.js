/* @flow */

// parse讲解: http://hcysun.me/vue-design/art/81vue-lexical-analysis.html#%E5%AF%B9-parser-%E7%9A%84%E7%AE%80%E5%8D%95%E4%BB%8B%E7%BB%8D
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将 template字符串解析成 AST
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 主要功能就是标记静态节点，为后面 patch 过程中对比新旧 VNode 树形结构做优化。被标记为 static 的节点在后面的 diff 算法中会被直接忽略，不做详细的比较。
    optimize(ast, options)
  }
  // 主要功能就是根据 AST 结构生成 render function 的字符串
  const code = generate(ast, options)
  // 传递给 creater-compile.js，compiled
  return {
    ast,
    render: code.render,
    // 静态渲染函数
    staticRenderFns: code.staticRenderFns
  }
})
