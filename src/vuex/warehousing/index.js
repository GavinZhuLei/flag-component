import api from 'api'
import Vue from 'vue'

const state = {
  warehousingList: [],
  warehousingTotal: 0,
  warehousingPage: 1,
  warehousingSize: 10,
  allowKitList: [],
  applyList: []
}

const getters = {
  warehousingPageList: state => state.warehousingList.map(item => {
    return {
      ...item,
      statusName: (() => {
        switch (+item.auditStatus) {
          case 1:
            return '审核中'
          case 2:
            return '审核通过'
          case 3:
            return '审核不通过'
          default:
            return ''
        }
      })()
    }
  }),
  warehousingTotal: state => state.warehousingTotal,
  warehousingPage: state => state.warehousingPage,
  warehousingSize: state => state.warehousingSize,
  allowKits: state => state.allowKitList,
  warehousingApplyRecord: state => state.applyList.map(item => {
    return {
      ...item,
      assessStatusName: (() => {
        switch (+item.assessStatus) {
          case 1:
            return '提交审核'
          case 2:
            return '审核通过'
          case 3:
            return '审核不通过'
          default:
            return ''
        }
      })()
    }
  })
}

const mutations = {
  SET_WAREHOUSING_LIST (state, playload) {
    state.warehousingList = [...playload]
  },
  SET_WAREHOUSING_TOTAL (state, {total}) {
    state.warehousingTotal = total
  },
  SET_ALLOW_KIT_LIST (state, playload) {
    state.allowKitList = [...playload]
  },
  SET_WAREHOUSING_PAGE (state, playload) {
    state.warehousingPage = playload
  },
  SET_WAREHOUSING_APPLY_LIST (state, playload) {
    state.applyList = [...playload]
  },
  SET_WAREHOUSING_APPLY_RESET (state, id) {
    for (let i in state.warehousingList) {
      if (state.warehousingList[i].id === id) {
        Vue.set(state.warehousingList, i, {...state.warehousingList[i], auditStatus: 1})
        break
      }
    }
  }
}

const actions = {
  getWarehousingList ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getWarehousingList(params).then(data => {
        console.log(data)
        commit('SET_WAREHOUSING_LIST', data.list)
        commit('SET_WAREHOUSING_TOTAL', data)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  getAllowKitList ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getKitList(params).then(data => {
        commit('SET_ALLOW_KIT_LIST', data.list)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  createApply ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.addApply(params).then(data => {
        commit('SET_WAREHOUSING_PAGE', 1)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  getWarehousingApplyRcord ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getApplyRecord(params).then(data => {
        commit('SET_WAREHOUSING_APPLY_LIST', data)
        resolve(data)
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  resetSubmitApply ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.resetApply(params).then(data => {
        commit('SET_WAREHOUSING_APPLY_RESET', params.id)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
