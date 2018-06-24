# commander笔记

https://blog.csdn.net/qq_26733915/article/details/80461257
https://juejin.im/entry/59e973be51882546b15ba28b
https://juejin.im/post/5a31d210f265da431a43330e
vue官方模板：https://github.com/vuejs-templates

## commander参数

> 尖括号（例如 < cmd >）代表必填输入，方括号（例如 [env]）代表可选输入。

- program.version('1.2.3') 版本
- program.usage("< command >") 定义用法提示
- program.command('rmdir < dir > [otherDirs...]') 自定义命令定义命令
  - '[other...]' 参数名后面追加 `...` 使参数可变, option只能是单独一个参数对于`...`是无效的
  - 当 command 带有描述参数时会并原来的bin名称+命令拼接成另外一个文件名称运行传的参数也会传过去，如在vue中运行 init 最终会运行 vue-init 文件
  - 当 command 带有描述时不能采用 .action(callback) 来处理子命令
- program.action(() => {}) 自定义命令的回调，参数的个数由 command参数 + option决定，最后默认的参数是option
- program.alias('a') command 命令的别名
- program.description('') command 命令的描述
- program.option('-C, --chdir < path >', '描述', callback) 设置命令可选参数列表
- program.parse(process.argv) 解析 process.argv 参数
- program.arguments('< cmd > [env]') 获取输入命令名称，与 command 不能同时存在。
- program.args 获取命令行所有参数
- program.outputHelp 不退出输出帮助信息
- program.on('--help', function() {})  自定义帮助信息
