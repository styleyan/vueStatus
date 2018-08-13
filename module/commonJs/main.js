// main.js

if (3 > 1) {
  var mod = require('./lib');

  console.log(mod.counter);  // 3
  mod.incCounter();
  console.log(mod.counter); // 3
}
