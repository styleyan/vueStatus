
/**
 * Module dependencies.
 */

/**
 * Expose `thunkify()`.
 */

module.exports = {
  thunkify,
  run,
};


/**
 * Wrap a regular callback `fn` as a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

 // 收集回调 fs.readFile
function thunkify(fn){
  // 收集文件名
  return function(){
    var args = Array.from(arguments);
    var ctx = this;

    // done 参数是 run 执行后的next方法
    return function(done){
      var called;
      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });
      try {
        // args值：['./test.eee.js', function(){...}]
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};


function run(fn) {
  // 这里获得 generator 后的函数
  var gen = fn()

  // data : 获取到的文件内容
  function next(err, data) {
    console.log(data)
    // 获取到第一 yield 分段函数值 ({ value: [Function], done: false })
    var result = gen.next(data)

    // 如果 done 为 true，则表示 yield 全部执行完毕，直接退出
    if (result.done) return

    // 否则把 next 函数，传给 thunkify模块的 function(done){ ... }
    result.value(next)
  }

  next();
}
