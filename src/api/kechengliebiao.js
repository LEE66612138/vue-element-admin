import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/man/v1/course/coursePage',
    method: 'post',
    params: query
  })
}
