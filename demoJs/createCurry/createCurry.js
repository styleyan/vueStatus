function createCurry(fn, params) {
  const len = fn.length
  const _params = params || []

  return function(...args) {
    Array.prototype.push.apply(_params, args)

    if (_params.length < len) {
      return createCurry.call(this, fn, _params)
    }

    fn.apply(this, _params)
  }
}

const fns = createCurry(function(a, b, cb) {
  cb(a + b)
})

fns(2)(3)(function(result){
  console.log(result)
})