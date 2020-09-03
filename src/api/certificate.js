import request from '@/util/request'
import baseURL from "@/api/config"
import BaseUrl from "./config"
export function getInfoList(query) {
  return request({
    url: '/certificate/info/list',
    method: 'get',
    baseURL,
    params: query
  })
}
export function getInfoByOrgId(query) {
  return request({
    url: 'employee/info/getInfoByOrgId',
    method: 'get',
    baseURL,
    params: query
  })
}
export function addCertificate(data) {
  return request({
    url: 'certificate/info/add',
    method: 'post',
    baseURL,
    data: data
  })
}
export function exportCertificate() {
  return request({
    url: 'certificate/info/export',
    method: 'get',
    baseURL
  })
}
export function loocer(cerId) {
  return request({
    url: `certificate/info/lookCer/${cerId}`,
    method: 'get',
    baseURL
  })
}
export function getSelfDetail() {
  return request({
    url: 'certificate/info/getInfoByOrgId',
    method: 'get',
    baseURL
  })
}
export function isUploadCer(id) {
  return request({
    url: `certificate/info/isUploadCer/${id}`,
    method: 'get',
    baseURL
  })
}
export function getByHolderCode(holderCode) {
  return request({
    url: `certificate/info/getInfoByHolderCode/${holderCode}`,
    method: 'get',
    baseURL
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: `certificate/info/importTemplate`,
    method: 'get',
    baseURL
  })
}
export function editCertificate(query) {
  return request({
    url: `certificate/info/edit`,
    method: 'put',
    baseURL,
    data:query
  })
}

//导出证照
export function exportCer(query) {
  return request({
    url: `${BaseUrl}/certificate/info/export`,
    method: 'get',
    params: query
  })
}
