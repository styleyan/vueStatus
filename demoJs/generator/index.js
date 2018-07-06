var fs = require('fs')
var { thunkify, run } = require('./thunkify')
var readFileThunk = thunkify(fs.readFile)

// console.log(readFileThunk.toString())
var gen = function* () {
  // console.log('111')
  var r1 = yield readFileThunk('./test.eee.js')
  // console.log('333')
}

run(gen)
