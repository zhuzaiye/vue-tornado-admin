// 后端路由定义
import request from "./request";


export const login = (data) => {
    return request({
        url: '/api/login',
        method: 'post',
        data: data,
    })
}

export const logout = (data) => {
    return request({
        url: '/api/logout',
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