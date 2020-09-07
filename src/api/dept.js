import request from "@/util/request";
import BaseUrl from "./config";
// 查询部门列表
export function listDept(query) {
  return request({
    url: `${BaseUrl}/system/organization/list`,
    method: "get",
    params: query
  });
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: `${BaseUrl}//system/dept/list/exclude/${deptId}`,
    method: "get"
  });
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: `${BaseUrl}/system/dept/${deptId}`,
    method: "get"
  });
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: `${BaseUrl}/system/organization/treeselect`,
    method: "get"
  });
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: `${BaseUrl}/system/dept/roleDeptTreeselect/${roleId}`,
    method: "get"
  });
}

// 新增部门
export function addDept(data) {
  return request({
    url: `${BaseUrl}/system/dept`,
    method: "post",
    data: data
  });
}

// 修改部门
export function updateDept(data) {
  return request({
    url: `${BaseUrl}/system/dept`,
    method: "put",
    data: data
  });
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: `${BaseUrl}/system/dept/${deptId}`,
    method: "delete"
  });
}

// 下载机构导入模板
export function importTemplate() {
  return request({
    url: `${BaseUrl}/organization/manage/importTemplate`,
    method: "get"
  });
}

//导出
export function exportOrg(query) {
  return request({
    url: `${BaseUrl}/organization/manage/export`,
    method: "get",
    params: query
  });
}
