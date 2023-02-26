import request from "./request";

export function login(data) {
    return request({
        url: '/user/login',
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