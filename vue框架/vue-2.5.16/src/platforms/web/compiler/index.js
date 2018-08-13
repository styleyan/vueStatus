/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

// compile 函数生成的是字符串形式的代码
// compileToFunctions 生成的才是真正可执行的代码，并且 compileToFunctions 函数本身是使用 src/compiler/to-function.js 文件中的 
// createCompileToFunctionFn 函数根据 compile 生成的
export { compile, compileToFunctions }
