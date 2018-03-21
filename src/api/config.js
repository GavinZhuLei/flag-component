export default process.env.NODE_ENV === 'development' ? {
  // 开发环境
  host: 'http://10.0.0.0:8002', // 成都开发
  hostBack: 'http://10.0.0.0:8001' // 成都开发
} : {
  // 发布环境
  host: 'http://10.0.0.0:8002', // 成都
  hostBack: 'http://10.0.0.0:8001' // 成都
}
