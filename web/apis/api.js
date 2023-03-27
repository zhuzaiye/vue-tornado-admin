// 后端路由定义
import request from "./request";


export const login = (data) => {
    console.log("api+login_", data)
    return request({
        url: '/api/login',
        method: 'post',
        data: data,
    })
}


export const sayHello = (params) => {
    return request({
        url: '/api/hello',
        method: 'get',
        params: params,
    })
}