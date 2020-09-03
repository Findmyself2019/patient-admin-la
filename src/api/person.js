import request from '@/util/request'
import baseURL from "@/api/config"
import BaseUrl from './config'
export function getPersonList(query) {
  return request({
    url: '/employee/info/list',
    method: 'get',
    baseURL,
    params: query
  })
}
export function addPerson(query) {
  return request({
    url: '/employee/info/add',
    method: 'post',
    baseURL,
    data: query
  })
}
export function getDetail(id) {
  return request({
    url: `/employee/info/${id}`,
    method: 'get',
    baseURL,
  })
}
export function getType() {
  return request({
    url: `/employee/type/list`,
    method: 'get',
    baseURL,
  })
}
export function editPersonInfo(query) {
  return request({
    url: `/employee/info`,
    method: 'put',
    baseURL,
    data: query
  })
}
export function getSelfPerson(id) {
  return request({
    url: `/employee/info/organizationId/${id}`,
    method: 'get',
    baseURL,
  })
}
export function getPersonById(id) {
  return request({
    url: `/employee/info/getEmpInfoById/${id}`,
    method: 'get',
    baseURL,
  })
}


// 下载从业人员导入模板
export function importTemplate() {
  return request({
    url: `${BaseUrl}/employee/info/importTemplate`,
    method: 'get'
  })
}

// 导出
export function exportEmp(query){
  return request({
    url: `${BaseUrl}/employee/info/export`,
    method: 'get',
    params: query
  })
}
