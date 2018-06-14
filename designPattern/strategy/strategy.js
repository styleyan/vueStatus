const strategy = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  },
}

const calcuateBonus = function(level, salary) {
  return strategy[level](salary)
}

console.log(calcuateBonus('A', 1000))

