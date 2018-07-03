var fs = require('fs')
var thunkify = require('thunkify')
var readFileThunk = thunkify(fs.readFile)

var gen = function* () {
  console.log('111')
  var r1 = yield readFileThunk('./test.html')
  console.log('222')
  var r2 = yield readFileThunk('./.gitignore')
  console.log('333')
}


function run(fn) {
  // 这里获得genrator后的函数
  var gen = fn()

  function next(err, data) {
    // 获取到第一 yield 分段函数值 ({ value: [Function], done: false })
    var result = gen.next(data)

    // 如果 done 为 true，则表示 yield 全部执行完毕，直接退出
    if (result.done) return

    // 否则把 next 函数，传给 thunkify模块的 function(done){ ... }
    result.value(next)
  }

  next();
}

run(gen)
