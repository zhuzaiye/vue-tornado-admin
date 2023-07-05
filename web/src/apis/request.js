import qs from 'qs';
import axios from 'axios';
import {Message} from 'element-ui';

const serverConfig = {
    // baseURL: "http://127.0.0.1:8888/api", // 请求基础地址,可根据环境自定义
    useTokenAuthorization: true, // 是否开启 token 认证
};

// 创建axios实例 设置超时时间和请求头
const axiosServer = axios.create({
    timeout: 30000,
    // 设置请求头
    headers: {
        post: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        get: {'Content-Type': 'application/json;charset=utf-8'},
    },
});

// 请求拦截器
axiosServer.interceptors.request.use(
    (config) => {
        // 如果开启 token 认证
        if (serverConfig.useTokenAuthorization) {
            let token = localStorage.getItem('token');
            if (token) {
                config.headers["Authorization"] = localStorage.getItem("token"); // 请求头携带 token
            }

        }
        if (config.method === 'post') {
            config.data = qs.stringify(config.data); // 序列化,比如表单数据
        }
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

function responseError(response) {
    let message;
    switch (response.status) {
        case 302:
            message = "接口重定向了！";
            break;
        case 400:
            message = "参数不正确！";
            break;
        case 401:
            message = "您未登录，或者登录已经超时，请先登录！";
            break;
        case 403:
            message = "您没有权限操作！";
            break;
        case 404:
            message = `请求地址出错: ${response.config.url}`;
            break;
        case 408:
            message = "请求超时！";
            break;
        case 409:
            message = "系统已存在相同数据！";
            break;
        case 500:
            message = "服务器内部错误！";
            break;
        case 501:
            message = "服务未实现！";
            break;
        case 502:
            message = "网关错误！";
            break;
        case 503:
            message = "服务不可用！";
            break;
        case 504:
            message = "服务暂时无法访问，请稍后再试！";
            break;
        case 505:
            message = "HTTP 版本不受支持！";
            break;
        default:
            message = "异常问题，请联系管理员！";
            break;
    }
    return message;
}

// 响应拦截器
axiosServer.interceptors.response.use(
    (response) => {
        let data = response.data;

        if (data.code !== 200 || data.msg !== "ok") {
            Message({
                message: data.msg || 'Error',
                type: 'warning',
                duration: 5 * 1000
            })
            return Promise.reject().then().catch();
        }
        return Promise.resolve(data);
    },
    (error) => {
        console.log('err: ' + error) // for debug
        let errmsg = responseError(error && error.response);
        Message({
            message: errmsg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(errmsg)
    }
)

export default axiosServer

