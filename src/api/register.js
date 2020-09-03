import request from '@/util/request'
import baseURL from "@/api/config"
export function sendEmail(query){
  return request({
    url:'/verify/sendEmail',
    method:'get',
    baseURL,
    params:query
  })
}
export function registerOrg(query){
  return request({
    url:'/verify/registerOrg',
    method:'post',
    baseURL,
    data:query
  })
}
export function uploadFile(query){
  return request({
    url:'/verify/uploadFile',
    method:'put',
    baseURL,
    data:query
  })
}
