import axios from 'axios'
var qs = require('qs')
// axios.interceptors.request.use(function(config){
//
//
// })
// //定义一个响应拦截器
// axios.interceptors.response.use(function(config){
//   store.state.isShow=false//在这里对返回的数据进行处理
//   return config
// })
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach((item) => {
        dataStr += `${item}=${data[item]}&`
      })
      if (dataStr) {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = `${url}?${dataStr}`
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, qs.stringify(data))
    }
    promise
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
