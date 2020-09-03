import request from '@/util/request'
import baseURL from './config'
export function getReviewList(query){
  return request({
    url: `/organization/review/list`,
    method: 'get',
    baseURL,
    params:query
  })
}
export function adminReview(organizationId){
  return request({
    url: `organization/review/getInfo/${organizationId}`,
    method: 'get',
    baseURL
  })
}
export function rejection(query){
  return request({
    url: `organization/review/rejection`,
    method: 'put',
    baseURL,
    data:query
  })
}
export function pass(query){
  return request({
    url: `organization/review/pass`,
    method: 'post',
    baseURL,
    data:query
  })
}
