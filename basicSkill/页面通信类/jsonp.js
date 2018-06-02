const utils = {
  /**
   * 页面中注入js脚本
   * @param {String} url - js请求地址
   * @param {String} charset - 字符集
   */
  createScript(url, charset) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    charset && script.setAttribute('charset', charset)
    script.setAttribute('src', url)
    script.async = true

    return script
  },
  /**
   *  获取一个随机的5位字符串(toString(36)是什么?)
   * @param {String} prefix - 前缀
   */
  getName(prefix) {
    const random = Math.random().toString(36).replace(/[^a-z]+)/g, '').substr(0, 5)
    return `${prefix}${random}`
  },
  /**
   * 判断是否是一个函数
   * @param {function} source - 函数名称
   * @returns {Boolean} 是否是函数布尔值
   */
  isFunction() {
    return '[object Function]' === Object.prototype.toString.call(source)
  }
}

/**
 * jsonp函数
 * @param {String} url - 地址
 * @param {Function} onsuccess - 成功回调函数
 * @param {Function} onerror - 失败回调函数
 * @param {String} charset - 编码 
 */
function jsonp(url, onsuccess, onerror, charset) {
  const callbackName = utils.getName('tt_player')

  window[callbackName] = function() {
    if (onsuccess && utils.isFunction(onsuccess)) {
      onsuccess(arguments[0])
    }
  }

  const script = utils.createScript(`${url}&callback=${callbackName}`, charset)
  script.onload = script.onreadystatechange = function () {
    if (!script.readyState || /load|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null
      // 移除该script的DOM对象
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // 删除函数或变量
      window[callbackName] = null
    }
  }

  script.onerror = function() {
    if (onerror && utils.isFunction(onerror)) {
      onerror()
    }
  }

  document.getElementsByTagName('head')[0].appendChild(script)
}
