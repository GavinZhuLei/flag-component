import io from './io'
// import axios from 'axios'
import config from './config'

let base = config.host
let apiUrl = {
  userRegister: '/home/register', // 注册企业
  verify: '/home/verify' // 注册手机号验证
}
let apiUrlObj = {}
for (let key in apiUrl) {
  apiUrlObj[key] = params => { return io.post(`${base}${apiUrl[key]}`, params) }
}

export default apiUrlObj
