// 内部路由组axios定义
import axios from 'axios'
import {Message} from 'element-ui'

// 初始化一个实例 超时时间5000
const instance = axios.create({
    timeout: 5000
})

// request
instance.interceptors.request.use(
    (config) => {
        config.headers.token = localStorage.getItem('token')
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response
instance.interceptors.response.use(
    (response) => {
        const res = response.data
        if (res.status !== 200) {
            Message({
                message: res.Message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // do something
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data
        }
    },
    (error) => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default instance

