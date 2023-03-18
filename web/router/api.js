// 后端路由定义
import request from "./request";

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

export function sayHello() {
    return request({
        url: '/api/hello',
        method: 'get',
    })
}