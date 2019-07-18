import request from '@/utils/request'

export function fetchList(query) {
  return request({
    baseURL: 'http://192.168.2.51',
    url: '/api/man/v1/course/coursePage',
    method: 'post',
    params: query
  })
}
