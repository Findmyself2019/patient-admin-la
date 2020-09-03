import request from '@/util/request'
import baseURL from './config'
export function reqOrgInfo() {
  return request({
    url: `/organization/info/selectInfo`,
    method: 'get',
    baseURL
  })
}
export function reqOrgList(query) {
  return request({
    url: `/organization/manage/list`,
    method: 'get',
    baseURL,
    params:query
  })
}
export function getInfoByCode(code) {
  return request({
    url: 'organization/info/getInfoByCode/'+code ,
    method: 'get',
    baseURL
  })
}
export function addSubmit(data) {
  return request({
    url: 'organization/manage/add',
    method: 'post',
    baseURL,
    data:data
  })
}
export function editQrgList(data) {
  return request({
    url: 'organization/info/edit',
    method: 'put',
    baseURL,
    data:data
  })
}
export function getTypeList() {
  return request({
    url: 'organization/manage/getOrganizaitonTypeList',
    method: 'get',
    baseURL,
  })
}
export function getOperLogList(query) {
  return request({
    url: `monitor/operlog/listByOrg`,
    method: 'get',
    baseURL,
    params:query
  })
}
