import {cc} from './c'

console.log(cc)


import('./d').then(({dd}) => {
  console.log('异步加载', dd)
})
