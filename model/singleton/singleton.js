const singlecost = function(name) {
  this.name = name
}

singlecost.prototype.sayName = function() {
  console.log(this.name)
}

singlecost.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new singlecost(name)
  }
  return this.instance
}

const a = singlecost.getInstance('a')
const b = singlecost.getInstance('b')

console.log(a === b)



const createLogin = function() {
  console.log('我是单链模式')
}

const getSingle = function(fn) {
  let result

  return function() {
    if (!result) {
      result = fn.apply(this, arguments)
    }
    return result
  }
}

const resultSingle = getSingle(createLogin)

console.log(resultSingle)

