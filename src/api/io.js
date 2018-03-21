import axios from 'axios'
import util from 'common/js/util'
const io = axios.create({withCredentials: true})
io.interceptors.request.use((config) => {
  let token = window.localStorage.getItem('token') || util.cookie.get('token')
  if (token) config.headers['X-token'] = token
  return config
}, (error) => {
  return Promise.reject(error)
})
io.interceptors.response.use((response) => {
  if (response.data.resCode === '0') return response.data.data
  else return Promise.reject(response.data.resMsg)
}, (error) => {
  // 400 参数错误
  // 401 未登录
  try {
    switch (error.response.status) {
      case 401: {
        let hostname = window.location.hostname
        let hostArr = hostname.split('.')
        let domain = hostArr.length < 3 ? hostname : (hostArr.splice(0, 1), hostArr.join('.'))
        let loginUrl = domain === 'test61.ums86.com' ? 'http://open-client.test61.ums86.com/#/login' : '/client/index/index.html#/login'
        setTimeout(() => { window.location.href = loginUrl }, 2000)
        return Promise.reject(error.response.data.resMsg || error.response.data.message)
      }
      default:
        return Promise.reject(error.response.data.resMsg || error.response.data.message)
    }
  } catch (e) {
    return Promise.reject(new Error('服务器无响应').message)
  }
})

export default io
