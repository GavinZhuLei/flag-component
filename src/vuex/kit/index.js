import api from 'api'
// import util from '../../../common/js/util'
import Vue from 'vue'
import globalStore from '../index'

const state = {
  kitList: [],
  total: 0,
  page: 1,
  pageSize: 10,
  detail: {},
  developGroups: [],
  usableKits: [],
  developMethodList: [],
  networkList: []
}

const getters = {
  kitPageList: state => state.kitList.map((item) => {
    return {...item,
      // createFormatDate: util.formatDate.format(item.createDate, 'yyyy-MM-dd hh:mm:ss'),
      // updateFormatDate: util.formatDate.format(item.updateDate, 'yyyy-MM-dd hh:mm:ss')
      createFormatDate: item.createDate,
      updateFormatDate: item.updateDate,
      groupName: item.groupName,
      statusName: (function () {
        switch (+item.status) {
          case 1:
            return '新建'
          case 2:
            return '开发中'
          case 3:
            return '测试中'
          case 4:
            return '入库审核中'
          case 5:
            return '已入库'
          case 6:
            return '已上架'
          default:
            return ''
        }
      })()
    }
  }),

  kitListTotal: state => state.total,
  page: state => state.page,
  pageSize: state => state.pageSize,
  kitDetail: state => {
    return {
      suiteNo: state.detail.suiteNo,
      name: state.detail.name,
      version: state.detail.version,
      key: state.detail.suiteKey,
      logoUrl: state.detail.logoUrl,
      secret: state.detail.suiteSecret,
      developeMethod: state.detail.developeMethod,
      network: state.detail.network,
      groupName: state.detail.groupName,
      groupId: state.detail.groupId,
      suiteDesc: state.detail.suiteDesc,
      status: state.detail.status
    }
  },
  appList: state => state.detail.suiteAppList,
  developAarray: state => {
    return globalStore
  },
  developGroups: state => state.developGroups,
  usableKits: state => state.usableKits,
  developMethodList: state => state.developMethodList,
  networkList: state => state.networkList
}

const mutations = {
  SET_DEVELOPMETHOD_LIST (state, playload) {
    state.developMethodList = [...playload]
  },
  SET_NETWORK_LIST (state, playload) {
    state.networkList = [...playload]
  },
  SET_USABLE_KITS (state, playload) {
    state.usableKits = [...playload]
  },
  SET_KIT_LIST (state, {kitList}) {
    state.kitList = []
    state.kitList = kitList
  },
  SET_KIT_DEVELOP_GROUP (state, playload) {
    state.developGroups = [...playload]
  },
  SET_KIT_TOTAL (state, {total}) {
    state.total = total
  },
  SET_KIT_PAGE (state, playload) {
    state.page = playload
  },
  SET_KIT_PAGESIZE (state, playload) {
    state.pageSize = playload
  },
  SET_KIT_ITEM (state, playload) {
    console.log('change state')
    for (let i in state.kitList) {
      if (state.kitList[i].suiteNo === playload.suiteNo) {
        console.log(playload)
        Vue.set(state.kitList, i, {...state.kitList[i], ...playload})
        break
      }
    }
  },
  SET_KIT_DETAIL (state, playload) {
    state.detail = {...state.detail, ...playload}

    console.log(state.detail)
  },
  SET_KIT_APPLICATION (state, playload) {
    for (let i in state.detail.suiteAppList) {
      if (state.detail.suiteAppList[i].id === playload.id) {
        Vue.set(state.detail.suiteAppList, i, {...state.detail.suiteAppList[i], ...playload})
        return
      }
    }
    state.detail.suiteAppList.splice(0, 0, {...playload})
    Vue.set(state.detail, 'suiteAppList', state.detail.suiteAppList)
  },
  REMOVE_KIT_APPLICATION (state, playload) {
    let removeIndex = 0
    for (let i in state.detail.suiteAppList) {
      if (state.detail.suiteAppList[i].id === playload.id) {
        removeIndex = i
        break
      }
    }
    state.detail.suiteAppList.splice(removeIndex, 1)
    Vue.set(state.detail, 'suiteAppList', state.detail.suiteAppList)
  }
}

const actions = {
  getKitList ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getKitList(params).then(data => {
        let {list, total} = data
        commit('SET_KIT_LIST', {kitList: list})
        commit('SET_KIT_TOTAL', {total})
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  createKit ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.createKit(params).then(data => {
        commit('SET_KIT_PAGE', 1)
        resolve(data)
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  updateKit ({commit}, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      console.log('promise')
      api.updateKit(params).then(data => {
        commit('SET_KIT_ITEM', params)
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  getKitDetail ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getKitDetail(params).then(data => {
        console.log('#############33')
        console.log(data)
        commit('SET_KIT_DETAIL', {...data})
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  createAppOnKit ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.createApplicationOnKit(params).then(data => {
        commit('SET_KIT_APPLICATION', data)
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  updateAppOnKit ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.updateApplicationOnKit(params).then(data => {
        commit('SET_KIT_APPLICATION', data)
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  deleteAppOnKit ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.deleteApplicationOnKit(params).then(data => {
        commit('REMOVE_KIT_APPLICATION', params)
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  getDevelopGroups ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getDevelopGroups(params).then(data => {
        commit('SET_KIT_DEVELOP_GROUP', data)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  getUsableKits ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getKitUsable(params).then(data => {
        commit('SET_USABLE_KITS', data)
        resolve()
      }).catch(msg => {
        reject(msg)
      })
    })
  },
  saveDevelopMethods ({commit}, params) {
    commit('SET_DEVELOPMETHOD_LIST', [...params])
  },
  saveNetworks ({commit}, params) {
    commit('SET_NETWORK_LIST', [...params])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
