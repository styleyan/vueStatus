// orderType: 表示订单类型，1：500 元定金用户；2：200 元定金用户；3：普通购买用户
// pay：表示用户是否已经支付定金，true: 已支付；false：未支付
// stock: 表示当前用于普通购买的手机库存数量，已支付过定金的用户不受此限制

// const order = function( orderType, pay, stock ) {
//   if ( orderType === 1 ) {
//     if ( pay === true ) {
//       console.log('500 元定金预购，得到 100 元优惠券')
//     } else {
//       if (stock > 0) {
//         console.log('普通购买，无优惠券')
//       } else {
//         console.log('库存不够，无法购买')
//       }
//     }
//   } else if ( orderType === 2 ) {
//     if ( pay === true ) {
//       console.log('200 元定金预购，得到 50 元优惠券')
//     } else {
//       if (stock > 0) {
//         console.log('普通购买，无优惠券')
//       } else {
//         console.log('库存不够，无法购买')
//       }
//     }
//   } else if ( orderType === 3 ) {
//     if (stock > 0) {
//         console.log('普通购买，无优惠券')
//     } else {
//       console.log('库存不够，无法购买')
//     }
//   }
// }
// // 普通购买，无优惠券
// order( 2, true, 500 ) 

// ==================================初步优化后代码===============================
// const order500 = function(orderType, pay, stock) {
//   if (orderType === 1 && pay === true) {
//     console.log('500 元定金预购，得到 100 元优惠券')
//   } else {
//     order200(...arguments)
//   }
// }

// const order200 = function(orderType, pay, stock) {
//   if (orderType === 2 && pay === true) {
//     console.log('200元定金预购，得到50元优惠券')
//   } else {
//     orderCommon(...arguments)
//   }
// }

// const orderCommon = function(orderType, pay, stock) {
//   if (orderType === 3 && stock > 0) {
//     console.log('普通购买，，无优惠券')
//   } else {
//     console.log('库存不够， 无法购买')
//   }
// }

// order500(3, true, 0)


//===================================优化第二版===========================================
const order5001 = function(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const order2001 = function(orderType, pay, stock) {
  if ( orderType === 2 && pay === true) {
    console.log('200 元定金预购, 得到50元优惠券')
  } else {
    return 'nextSuccess'
  }
}

const orderCommon1 = function(orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券')
  } else {
    console.log('库存不够，无法购买')
  }
}

// 链路代码
Function.prototype.after = function(fn) {
  const self = this
  return function() {
    const result = self.apply(self, arguments)
    if (result === 'nextSuccess') {
      return fn.apply(self, arguments) // 这里需要retrun 
    }
  }
}


const order1 = order5001.after(order2001).after(orderCommon1)

order1(1, true, 0)