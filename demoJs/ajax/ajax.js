/**
 * 调用方式
 * 
 * ajax.get('url', param, callback(error, data) {})
 * ajax.post('url', param, callback(error, data) {})
 * 
 * ajax({
 *   type: '',
 *   url: '',
 *   data: {},
 *   success: fn,
 *   error: fn,
 * })
 */

 const ajax = function(param) {
  const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  const type = (param.type || 'get').toUpperCase()
  let url = param.url

  if (!url) return

  const { data } = param
  const dataArr = []

  // 拼接url参数
  Object.keys(data).forEach((key) =>{
    dataArr.push(`${key}=${data[key]}`)
  })

  // 添加随机数，防止缓存
  dataArr.push(`_t=${Math.random()}`)

  /**
   * xhr.open 默认有5个参数, 请求类型 || 请求地址 || 默认为true,意味着是否执行异步操作 || 用户名 || 用户密码
   * xhr.open(type, url, async(true), user, pwd)
   */
  if (type === 'GET') {
    url = `${url}?=${dataArr.join('&')}`
    xhr.open(type, url)
    xhr.send()
  } else {
    xhr.open(type, url)
    xhr.setRequestHeader('Content-type', 'applation-x-form-urlencoded')
    xhr.send(dataArr.join('&'))
  }

  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 304) {
      if (typeof xhr.responseText === 'text' && typeof param.success === 'function') {
        let res = JSON.parse(xhr.responseText)
        param.success.call(xhr, res)
      }
    }
  }
 }