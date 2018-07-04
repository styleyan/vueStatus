var fs = require('fs')
var { thunkify, run } = require('./thunkify')
var readFileThunk = thunkify(fs.readFile)

// console.log(readFileThunk.toString())
var gen = function* () {
  // console.log('111')
  var r1 = yield readFileThunk('./test.eee.js')
  // console.log('r1', r1)
  var r2 = yield readFileThunk('./test.eee.1.js')
  // console.log('r2', r2)
  // console.log('333')
}

run(gen)
