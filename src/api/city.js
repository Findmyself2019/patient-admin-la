import request from '@/util/request'
import baseURL from "@/api/config"
export function getCityList(){
  return request({
    url:'/address',
    method:'get',
    baseURL
  })
}
export function getPicture(){
  return request({
    url:'/fastdfsdownload',
    method:'get',
    params:{filePath:'M00/00/00/wKheD18xElyAIXMoAADLJd42Er4738.png'},
    baseURL
  })
}
