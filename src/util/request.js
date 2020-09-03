import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/util/user-token'
import errorCode from '@/util/errorCode'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = localStorage.getItem('Admin-Token')
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const message = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 500) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    } else if (code === 403) {
      Message({
        message: "没有权限，请联系管理员授权",
        type: 'error'
      })

    } else if (code !== 200) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
