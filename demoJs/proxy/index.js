function foo() {}

foo.prototype.getValue = function() {
  return this.value
}

var p = new Proxy(function() {}, {
  construct(target, args) {
    console.log(`called:${args.join(',')}`)
    return { value: args[0] * 10 }
  }
})

const bar = new p(1)
console.log(bar)