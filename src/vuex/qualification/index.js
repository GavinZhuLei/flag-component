import api from 'api'
import util from 'common/js/util'

const state = {
  quaModel: {
    address: '',
    applicantId: '',
    applicantIdUrl: '',
    applicantName: '',
    authStatus: 0,
    authorizationLetterUrl: '',
    checkResult: undefined,
    checkView: undefined,
    city: '',
    corpId: '',
    corpLicenseUrl: '',
    corpName: '',
    createDate: '',
    id: '',
    identityType: 0,
    legalPerson: '',
    legalPersonId: '',
    province: '',
    societyCreditCode: '',
    submitStatus: 0,
    updateDate: '',
    userId: ''
  },
  applyRecord: []
}

const getters = {
  company: state => {
    let statusName = ''

    switch (state.quaModel.authStatus) {
      case 0:
        statusName = '未认证'
        break
      case 1:
        statusName = '认证中 '
        break
      case 2:
        statusName = '认证不通过'
        break
      case 3:
        statusName = '已认证'
        break
    }

    return {
      id: state.quaModel.spId,
      name: state.quaModel.spName,
      address: state.quaModel.spArea,
      spClassify: state.quaModel.spClassify,
      spTrade: state.quaModel.spTrade,
      spCT: state.quaModel.spCT,
      contact: state.quaModel.spContact,
      email: state.quaModel.contantEmail,
      authStatus: state.quaModel.authStatus,
      authStatusName: statusName
    }
  },
  checkRecord: state => state.quaModel.records ? state.quaModel.records.map(item => {
    return {...item, date: util.formatDate.format(item.createDate, 'yyyy-MM-dd')}
  }) : [],
  form: state => {
    return {
      applicantName: state.quaModel.applicantName,
      applicantId: state.quaModel.applicantId,
      applicantIdUrl: state.quaModel.applicantIdUrl,
      identityType: state.quaModel.identityType ? state.quaModel.identityType : 0,
      corpLicenseUrl: state.quaModel.corpLicenseUrl,
      societyCreditCode0: state.quaModel.identityType === 0 ? state.quaModel.societyCreditCode : '',
      societyCreditCode1: state.quaModel.identityType === 1 ? state.quaModel.societyCreditCode : '',
      corpName: state.quaModel.corpName,
      legalPerson: state.quaModel.legalPerson,
      legalPersonId: state.quaModel.legalPersonId,
      address: state.quaModel.address,
      authorizationLetterUrl: state.quaModel.authorizationLetterUrl,
      cityData: [state.quaModel.province, state.quaModel.city]
    }
  }
}

// mutations
const mutations = {
  UPDATE_QUA_MODEL (state, playload) {
    state.quaModel = {...state.quaModel, ...playload}
  },
  SET_QUA_APPLYR_RECORD (state, {applyRecord}) {
    state.applyRecord = []
    state.applyRecord = state.applyRecord.concat(applyRecord.map((item) => {
      return {...item, date: util.formatDate.format(item.createDate, 'yyyy-MM-dd')}
    }))
  },
  SET_SATTUS_ING (state) {
    state.authStatus = 1
  },
  UPDATE_QUA_APPLICANTNAME (state, playload) {
    state.applicantName = playload
  }
}

// actions
const actions = {
  getQualification ({dispatch, commit, state}, params) {
    return new Promise((resolve, reject) => {
      api.getQualification(params).then(data => {
        let tspClassify = data.spClassify ? '{' + data.spClassify + '}' : ''
        let tspTrade = data.spTrade ? ' - {' + data.spTrade + '}' : ''
        dispatch('getDictCN', {type: 'SYS_INDUSTRY', code: tspClassify + tspTrade}).then(val => {
          data.spCT = val
          commit('UPDATE_QUA_MODEL', data)
          resolve()
        })
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  saveQua ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.saveQua(params).then(data => {
        commit('UPDATE_QUA_MODEL', params)
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  },
  submitQua ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.submitQua(params).then(data => {
        commit('UPDATE_QUA_MODEL', params)
        commit('SET_SATTUS_ING')
        resolve()
      }).catch((msg) => {
        reject(msg)
      })
    })
  }
}

export default {
  actions,
  mutations,
  getters,
  state
}
