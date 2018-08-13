// b.js
import {foo} from './a.mjs';
export function bar() {
  const random = Math.random()
  if (random > 0.5) {
    foo(random);
  }
}