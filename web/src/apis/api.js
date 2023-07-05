// 后端路由定义
import request from "./request";


export const login = (data) => {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: data,
    })
}

export const logout = (data) => {
    return request({
        url: '/api/user/logout',
        method: 'post',
        data: data,
    })
}



export const sayHello = (params) => {
    return request({
        url: '/api/user/hello',
        method: 'get',
        params: params,
    })
}