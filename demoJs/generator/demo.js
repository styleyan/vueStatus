function thunkify(fn) {
  return function(...args) {
    let called = false
    const ctx = this

    return function(next) {
      args.push(function() {
        if (called) return
        called = true
        next.apply(null, arguments)
      })

      try {
        fn.apply(ctx, args)
      } catch (err) {
        next(err)
      }
    }
  }
}

function run(generator) {
  const gen = generator()

  function next(data) {
    const result = gen.next(data)
    if (result.done) return
    result.value(next)
  }
  next()
}

let num = 0
function test(timer, cb) {
  setTimeout(() => {
    cb(++num)
  }, timer)
}

const thunkifyTest = thunkify(test)

function* gen() {
  const a1 = yield thunkifyTest(2000)
  console.log(a1)

  const a2 = yield thunkifyTest(4000)
  console.log(a2)

  const a3 = yield thunkifyTest(1000)
  console.log(a3)
}


run(gen)