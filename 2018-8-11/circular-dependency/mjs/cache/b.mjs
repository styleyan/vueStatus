import {foo} from './a.mjs';
console.log(foo);
setTimeout(() => console.log(foo), 500);