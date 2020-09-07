import request from "@/util/request";
import baseURL from "@/api/config";
export function getCityList() {
  return request({
    url: "/common/address",
    method: "get",
    baseURL
  });
}
