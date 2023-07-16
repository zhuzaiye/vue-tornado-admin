/** 基于axios的请求响应设计 */ 
import qs from 'qs'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const axioServer = axios.create({
  // BaseURL: "",
  timeout: 5000, // request timeout
  // 设置请求头
  headers: {
    post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    get: { 'Content-Type': 'application/json;charset=utf-8' },
  },
})

// request interceptor
axioServer.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      config.headers['Authorization'] = getToken()
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data) // 序列化,比如表单数据
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axioServer.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 || res.msg !== "ok") {
      Message({
        message: data.msg || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject().then().catch();
    }

    return Promise.resolve(res);
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axioServer
