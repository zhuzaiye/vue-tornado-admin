import request from '@/utils/request'

// 用户登入
export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: data,
  })
}

// 用户登出
export const logout = (data) => {
  return request({
    url: '/api/user/logout',
    method: 'post',
    data: data,
  })
}

// 获取用户信息
export const getInfo = (params) => {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { params },
  })
}

