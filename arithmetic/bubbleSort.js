var arrList = [45, 67, 23, 88, 21, 6, 99, 88, 11, 0 ,21 ,21];

/**
 * 排序初始化版本
 * @param {Array}} arr 需要排序的数组
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return
  const sortArr = arr.slice()

  for (let i = 0; i < sortArr.length - 1; i++) {
    for (let j = 0; j < sortArr.length - 1; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]]
      }
    }
  }

  return sortArr
}

console.log(bubbleSort(arrList))



/**
 * 冒泡排序优化1: 每轮比较少比较一次。
 * (每一轮都会比较出一个最大值, 下一轮就没有必要再比较了，所以每比较一轮就应该少次 j < a.length-1-i)
 **/
function bubbleSort2(arr) {
  if (!Array.isArray(arr) || arr.length <=1) return
  const sortArr = arr.slice()

  //这里不减 1 后面轮数就 +1 这是不对的 因为数组下标 0 开始
  for (var i = 0; i < sortArr.length - 1; i++) {
    // 每一轮都会比较出一个最大值，然后后一轮没有必要再比较了，所以每比较一轮就少比较一次。
    for (var j = 0; j < sortArr.length - 1 - i; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]]
      }
    }
  }
  return sortArr
}
console.log(bubbleSort2(arrList))



/**
 * 冒泡排序优化2: 做一个判断，如果在比较的时候 两两不发生比较了 就退出循环
 * 如: [2, 1, 3, 4, 5, 6, 7, 8, 9] 这种情况
 **/
function bubbleSort3(arr) {
  if (!Array.isArray(arr) || arr.length <=1) return
  const sortArr = arr.slice()

  //这里不减 1 后面轮数就 +1 这是不对的 因为数组下标 0 开始
  for (var i = 0; i < sortArr.length - 1; i++) {

    // 开闭原则（写在第一个for循环里，是为了每轮比较初始化 bool 变量变为true）
    let bool = true
    // 每一轮都会比较出一个最大值，然后后一轮没有必要再比较了，所以每比较一轮就少比较一次。
    for (var j = 0; j < sortArr.length - 1 - i; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]]
        bool = false;
      }
    }

    // bool 这个变量默认值为 true ; 如果本轮比较有一对元素相互交换位置，那么也不能跳出循环。
    // 如果本轮比较没有任何元素相互交换位置，那么说明已经比较完成，可以跳出循环。
    if (bool) {
      break
    }
  }

  return sortArr
}
console.log(bubbleSort3(arrList))