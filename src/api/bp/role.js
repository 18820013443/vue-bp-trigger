import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/system/role/',
    method: 'get'
  })
}
