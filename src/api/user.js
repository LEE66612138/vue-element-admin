import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/man/v1/login/doLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/man/v1/login/state',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/man/v1/login/doLogout',
    method: 'post'
    // baseURL: 'http://192.168.4.38:9527/dev-api'
  })
}
