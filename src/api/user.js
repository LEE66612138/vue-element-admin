import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
    // baseURL: 'http://192.168.4.38:9527/dev-api'
  })
}

export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
    // baseURL: 'http://192.168.4.38:9527/dev-api'
  })
}
