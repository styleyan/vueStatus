/**
 * 推荐文章地址:
 * http://hcysun.me/vue-design/appendix/core-util.html#perf-js-%E6%96%87%E4%BB%B6%E4%BB%A3%E7%A0%81%E8%AF%B4%E6%98%8E
 */

import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
