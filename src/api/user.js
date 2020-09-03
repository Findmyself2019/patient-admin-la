import request from '@/util/request'
import BaseUrl from './config'
import { praseStrEmpty } from "@/util/ruoyi"
//登录
export function login(data) {
  return request({
    url: `${BaseUrl}/login`,
    method: 'post',
    data
  })
}
//个人信息
export function getInfo() {
  return request({
    url: `${BaseUrl}/getInfo`,
    method: 'get',
  })
}
//登出
export function logout() {
  return request({
    url: `${BaseUrl}/logout`,
    method: 'post'
  })
}
//侧边栏
export function getMenuList() {
  return request({
    url: `${BaseUrl}/getRouters`,
    method: 'get',
    params: {}
  })
}
//验证码
export function getCaptchaImage() {
  return request({
    url: `${BaseUrl}/captchaImage`,
    method: 'get',
  })
}
//角色管理
export function roleList(params) {
  return request({
    url: `${BaseUrl}/system/role/list`,
    method: 'get',
    params
  })
}

// 查询用户列表
export function listUser(query) {
  return request({
    url: `${BaseUrl}/system/user/list`,
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: `${BaseUrl}/system/user/` + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: `${BaseUrl}/system/user`,
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: `${BaseUrl}/system/user`,
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: `${BaseUrl}/system/user/${userId}`,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: `${BaseUrl}/system/user/export`,
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: `${BaseUrl}/system/user/resetPwd`,
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: `${BaseUrl}/system/user/changeStatus`,
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: `${BaseUrl}/system/user/profile`,
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: `${BaseUrl}/system/user/profile`,
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: `${BaseUrl}/system/user/profile/updatePwd`,
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: `${BaseUrl}/system/user/profile/avatar`,
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: `${BaseUrl}/system/user/importTemplate`,
    method: 'get',
  })
}

