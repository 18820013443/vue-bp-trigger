import request from '@/utils/request'

export function uploadFileRequest(params) {
  return request({
    url: '/file/upload/',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}

export function deleteFileRequest(id) {
  return request({
    url: '/file/delete/' + id +  '/',
    method: 'delete'
  })
}

export function getFileInfo(query) {
  return request({
    url: '/file/query/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

// export function downloadFile(id) {
//   return request({
//     url: '/file/download/' + id + '/',
//     method: 'get',
//   })
// }
