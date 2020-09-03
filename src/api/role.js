import request from '@/util/request'
import BaseUrl from './config'
// 查询角色列表
export function listRole(query) {
  return request({
    url: `${BaseUrl}/system/role/list`,
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: `${BaseUrl}/system/role/${roleId}`,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: `${BaseUrl}/system/role`,
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: `${BaseUrl}/system/role`,
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(roleId) {
  return request({
    url: `${BaseUrl}/system/organization/roleOrgTreeselect/${roleId}`,
    method: 'get',
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: `${BaseUrl}/system/role/changeStatus`,
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: `${BaseUrl}/system/role/${roleId}`,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: `${BaseUrl}/system/role/export`,
    method: 'get',
    params: query
  })
}
export function submitDataScope(query) {
  return request({
    url: `${BaseUrl}/system/role/dataScope`,
    method: 'put',
    data: query
  })
}
