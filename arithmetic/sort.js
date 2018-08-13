var arrList = [3, 2, 4, 5, 6, 8]

function sortFn(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return

  const _arr = arrList.slice()

  for (let i = 0; i < _arr.length - 1; i++) {
    let status = true
    for (let j = 0; j < _arr.length - 1 - i; j++) {
      if (_arr[j] > _arr[j + 1]) {
        [_arr[j], _arr[j + 1]] = [_arr[j + 1], _arr[j]]
        status = false
      }
    }

    if (status) continue
  }

  return _arr
}

console.log(sortFn(arrList))