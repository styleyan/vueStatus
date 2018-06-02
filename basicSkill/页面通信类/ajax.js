const ajax = function(param) {
  const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
  const type = (param.type || 'get').toUpperCase()
  let   url = param.url
  
  if (!url) {
    return
  }
  
  const { data } = param
  const dataArr = []
  
  Object.keys(data).forEach((key) => {
   dataArr.push(`${key}=${data[key]}`)
  })
  
  // 添加时间戳防止缓存
  dataArr.push(`_=${Math.random()}`)
  
  if (type === 'GET'){
    url = `${url}?${dataArr.join('&')}`
    xhr.open(type, url)
    xhr.send()
  } else {
    xhr.open(type, url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(dataArr.join('&'))
  }
  
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 304) {
      let res
      if (param.success && (typeof param.success === 'function')) {
        if (typeof xhr.responseText === 'string') {
          res = JSON.parse(res)
          param.success.call(xhr, res)
        }
      }
    }
  }
}