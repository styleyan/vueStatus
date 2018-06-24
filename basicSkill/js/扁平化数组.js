const arrs = [1, [55, [2, 3], 4], [5, 6]]

let flat = function* (a) {
  let length = a.length
  for (let i = 0; i < length; i++) {
    let item = a[i]

    if (typeof item !== 'number') {
      yield* flat(item)
    } else {
      yield item
    }
  }
};

/**
 * 扁平化数组方法2
 * @param {Array} tree 需要扁平化数组对象
 */
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i])
    }
  } else {
    yield tree
  }
}

// 扁平化数据
console.log([...flat(arrs)])
console.log(Array.from(flat(arrs)))

/**
 * 其他方法：https://github.com/JesseZhao1990/algorithm/issues/9
 */

