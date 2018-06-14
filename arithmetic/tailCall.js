// http://www.ruanyifeng.com/blog/2015/04/tail-call.html

function aft(n, result) {
  result = result || 0
  if (n <= 0) {
    return result
  }
  return aft(n - 1, result + n)
}

console.log(aft(1000))