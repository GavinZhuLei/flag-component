import Vue from 'vue'
import Vuex from 'vuex'
import clientActions from './client/actions'
import clientMutations from './client/mutations'
import clientGetters from './client/getters'
import sysActions from './sys/actions'
import sysMutations from './sys/mutations'
import sysGetters from './sys/getters'

Vue.use(Vuex)
// A模块状态管理
const client = {
  // 应用初始状态
  namespaced: true,
  state: {
    count: 10,
    isLoading: false,
    articles: []
  },
  mutations: clientMutations,
  actions: clientActions,
  getters: clientGetters
}
// A模块状态管理
const sys = {
  // 应用初始状态
  namespaced: true,
  state: {
    count: 10
  },
  mutations: sysMutations,
  actions: sysActions,
  getters: sysGetters
}
// 创建 store 实例
export default new Vuex.Store({
  modules: {
    client,
    sys
  }
})
