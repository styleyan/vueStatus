/**
 * 颗粒化函数
 */
function createCurry(func, args) {
  const len = func.length
  const _args = args || []

  return function() {
    const _ag = Array.prototype.slice.call(arguments)
    Array.prototype.push.apply(_ag, _args)

    if (_ag.length < len) {
      return createCurry.call(this, func, _ag)
    }

    func.apply(this, _ag)
  }
}

const abc = createCurry(function(a, b, c) {
  console.log(a + b + c)
})

abc(33)(22)(11)

/** ==========================函数防抖======================== */
function throttle(fun, awit) {
  let timer = null
  let flag = true

  return function() {
    const arg = arguments

    if (flag) {
      flag = false
      fun.apply(this, arg)
      return
    }

    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fun.apply(this, arg)
    }, awit)
  }
}

const abs = throttle(function(param1) {
  console.log(`参数：${param1}`)
}, 5000)

abs(222)
abs(333)
abs(555)