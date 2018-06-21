let arr = [0,33,11,1,88,99,10]

const bubbleSort = (arr) => {
  if (!Array.isArray(arr)) return
  const ret = arr.slice()
  ret.forEach((val, i, result) => {
    for (let j = i+1; j < result.length; j++) {
      if (result[i] > result[j]) {
        [result[i], result[j]] = [result[j], result[i]]
      }
    }
  })
  return ret
}

console.log(bubbleSort(arr))