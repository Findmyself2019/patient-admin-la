import request from "@/util/request";
import baseURL from "@/api/config";
export function getCityList() {
  return request({
    url: "/address",
    method: "get",
    baseURL
  });
}
