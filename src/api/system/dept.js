import request from "@/util/request";
import baseURL from "@/api/config";

// 查询部门列表
export function listDept(query) {
  return request({
    url: "/system/dept/list",
    method: "get",
    params: query,
    baseURL
  });
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: "/system/dept/list/exclude/" + deptId,
    method: "get",
    baseURL
  });
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: "/system/dept/" + deptId,
    method: "get",
    baseURL
  });
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: "/system/dept/treeselect",
    method: "get",
    baseURL
  });
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: "/system/dept/roleDeptTreeselect/" + roleId,
    method: "get",
    baseURL
  });
}

// 新增部门
export function addDept(data) {
  return request({
    url: "/system/dept",
    method: "post",
    data: data,
    baseURL
  });
}

// 修改部门
export function updateDept(data) {
  return request({
    url: "/system/dept",
    method: "put",
    data: data,
    baseURL
  });
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: "/system/dept/" + deptId,
    method: "delete",
    baseURL
  });
}
