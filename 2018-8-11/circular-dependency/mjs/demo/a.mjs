// a.js
import {bar} from './b.mjs';
export function foo(param) {
  bar();
  console.log(param);
}
foo('执行完毕, a.mjs');