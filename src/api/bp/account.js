import request from '@/utils/request'

export function fetchAllRequest(params) {
  return request({
    url: '/account/',
    method: 'get',
    params
  })
}

export function fetchSingleRequest(id) {
  return request({
    url: `/account/${id}/`,
    method: 'get'
  })
}

export function createRequest(data) {
  return request({
    url: '/account/',
    method: 'post',
    data
  })
}

export function reviseRequest(id, data) {
  return request({
    url: `/account/${id}/`,
    method: 'put',
    data
  })
}

export function deleteRequest(id) {
  return request({
    url: `/account/${id}/`,
    method: 'delete'
  })
}

export function getInfo() {
  return request({
    url: '/account/info/',
    method: 'get'
  })
}
