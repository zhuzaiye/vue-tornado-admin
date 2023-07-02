// 后端路由定义 采用自定义的Axiosz封装
import request from "./request";

export function loginByUsername(username, password) {
    const data = {
      username,
      password
    }
    return fetch({
      url: '/api/user/login',
      method: 'post',
      data
    })
  }

export const logout = (data) => {
    return request({
        url: '/api/user/logout',
        method: 'post',
        data: data,
    })
}

export const getUserInfo = (token) =>{
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

