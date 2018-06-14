// http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
function quickSort(arr) {
  if (arr.length === 0) {
    return arr
  }

  var baseValue = arr[Math.floor((arr.length - 1) / 2)]
  const left =  []
  const right = []

  arr.forEach((item) => {
    if (item < baseValue) {
      left.push(item)
    } else if(item > baseValue) {
      right.push(item)
    }
  })

  return quickSort(left).concat(baseValue, quickSort(right))
}

const arrs = [3, 6, 1, 88, 22, 0, 12]

console.log(quickSort(arrs))