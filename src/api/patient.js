import request from "@/util/request";
import baseURL from "./config";

export function patientList(query) {
  return request({
    url: `/patient/info/list`,
    method: "get",
    params: query,
    baseURL
  });
}
export function addPatient(query) {
  return request({
    url: `patient/info/add`,
    method: "post",
    data: query,
    baseURL
  });
}
export function religionLis() {
  return request({
    url: `common/religionList`,
    method: "get",
    baseURL
  });
}