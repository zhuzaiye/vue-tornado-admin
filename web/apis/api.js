// 后端路由定义
import request from "./request";

export const login = (data) => {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}


export const sayHello = () => {
    return request({
        url: '/api/hello',
        method: 'get',
    })
}