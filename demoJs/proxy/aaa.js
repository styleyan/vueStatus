var proxy = new Proxy({aa: {cc: 'dc'}}, {
  get: function(target, property) {
    console.log(property)
    return 35;
  },
  set: function(target, property, value, Reflection) {
    console.log(target,property, value, Reflection)
  }
});

let obj = Object.create(proxy);

obj.aa.cc = 111
