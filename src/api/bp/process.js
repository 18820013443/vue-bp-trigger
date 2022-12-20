import request from '@/utils/request'

export function fetchAllRequest(params) {
  return request({
    url: '/process/',
    method: 'get',
    params
  })
}
