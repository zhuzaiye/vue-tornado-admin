// 内部路由组axios定义
import axios from 'axios'
import {Message} from 'element-ui'

// 创建axios实例 设置超时时间5000
const instance = axios.create({
    timeout: 12 * 1000
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

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
        let res = response.data;
        console.log(res)
        if (res.code !== 200) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(res);
        } else {
            return Promise.resolve(res);
        }
    },
    (error) => {
        console.log('err' + error) // for debug
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default instance

