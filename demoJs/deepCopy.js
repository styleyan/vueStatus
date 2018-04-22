function deepCopy(obj, parent = null) {
  // 创建一个对象
  let result = {}
  let keys = Object.keys(obj),
      temp = null,
      _parent = parent;

  // 该字段有父级则需要追溯该字段的父级
  while(_parent) {
    // 如果该字段引用了他的父级则为循环引用
    if (_parent.originalParent === obj) {
       // 循环引用直接返回同级的新对象
       return _parent.currentParent
    }
    _parent = _parent.parent
  }

  keys.forEach((prop) => {
     temp = obj[prop]
     // 如果字段的值也是一个对象
     if (temp && typeof temp === 'object') {
       // 递归执行深拷贝, 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
       result[prop] = deepCopy(temp, {
          originalParent: obj,
          currentParent: result,
          parent: parent,
       })
     } else {
       result[prop] = temp
     }
  })
  
  return result
}

const aaa = {'ffff': '3333'}

aaa.cc = aaa

console.log(deepCopy(aaa))