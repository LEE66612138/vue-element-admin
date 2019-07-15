import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/man/v1/course/createCourse',
    method: 'post',
    params: query,
    baseURL: 'http://192.168.2.51:80'

  })
}

