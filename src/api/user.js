import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/man/v1/login/doLogin',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function getInfo(token) {
  return request({
    url: '/api/man/v1/login/state',
    method: 'post',
    baseURL: process.env.VUE_APP_BASE_API2,
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/man/v1/login/doLogout',
    baseURL: process.env.VUE_APP_BASE_API2,
    method: 'post',
    data: {}
    // baseURL: 'http://192.168.4.38:9527/dev-api'
  })
}
