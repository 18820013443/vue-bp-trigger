import request from '@/utils/request'

export function buildMenu() {
  return request({
    url: '/system/menus/build/',
    method: 'get'
  })
}
