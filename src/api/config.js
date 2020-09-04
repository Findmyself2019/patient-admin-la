let BASE_URL = ''
let BASE_URL1 = '/heng'
if (process.env.NODE_ENV === "development") {
  BASE_URL = '/heng'
}else {
  // 线上环境
  BASE_URL = 'http://10.67.78.48:8285'
}
export default BASE_URL
export const url = BASE_URL1
