function throttle(fn, awit) {
  let timer = null
  let flag = true

  return function() {
    const arg = arguments

    if (flag) {
      flag = false
      fn.apply(this, arg)
      return flag
    }

    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(this, arg)
    }, awit)
  }
}

const abs = throttle(function(param1) {
  console.log(`参数：${param1}`)
}, 5000)

abs(222)
abs(333)
abs(555)