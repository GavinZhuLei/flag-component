import api from 'api'

const state = {
  deployList: [],
  deployTotal: 0,
  deployPage: 1,
  deploySize: 10,
  allowKitList: []
}

const getters = {
  deployPageList: state => state.deployList.map(item => {
    return {
      ...item,
      statusName: (() => {
        switch (+item.status) {
          case 1:
            return '部署中'
          case 2:
            return '通过'
          case 3:
            return '不通过'
          default:
            return ''
        }
      })()
    }
  }),
  deployPageNum: state => state.deployPage,
  deployPageSize: state => state.deploySize,
  deployTotal: state => state.deployTotal
}

const mutations = {
  SET_DEPLOY_LIST (state, playload) {
    if (playload) {
      state.deployList = [...playload]
    } else {
      state.deployList = []
    }
  },
  SET_DEPLOY_PAGE (state, playload) {
    state.deployPage = playload
  },
  SET_DEPLOY_TOTAL (state, {total}) {
    if (total) {
      state.deployTotal = total
    } else {
      state.deployTotal = 0
    }
  }
}

const actions = {
  getDeployList ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getDeployList(params).then(data => {
        commit('SET_DEPLOY_LIST', data.list)
        commit('SET_DEPLOY_TOTAL', data)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  addDeploy ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.addDeploy(params).then(data => {
        commit('SET_DEPLOY_PAGE', 1)
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
