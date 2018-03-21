import Vue from 'vue'
import Vuex from 'vuex'
import clientActions from './actions'
import clientMutations from './mutations'
import clientGetters from './getters'
import qualification from './qualification'
import kit from './kit'
import warehousing from './warehousing'
import deploy from './deploy'

Vue.use(Vuex)

const client = new Vuex.Store({
  // 应用初始状态
  strict: true,
  namespaced: true,
  state: {
    count: 10,
    // 配置跨路由跳转
    index_host: '/client/index', // 本地
    dev_host: '/client/developers', // 本地
    // index_host: 'http://open-client.test61.ums86.com', // 线上
    // dev_host: 'http://open-dev.test61.ums86.com', // 线上
    dict: [],
    getDS: false,
    userInfo: {},
    roleList: [],
    rolesType: {}
  },
  mutations: clientMutations,
  actions: clientActions,
  getters: clientGetters,
  modules: {
    qualification,
    kit,
    warehousing,
    deploy
  }
})

export default client
