export default {
  INCREMENT: (state, count) => {
    state.count = count++
  },
  DECREMENT: (state, count) => {
    state.count = count--
  },
  SET_DICT: (state, dict) => {
    state.dict = dict
  },
  SET_DICTSTATUS: (state, status) => {
    state.getDS = status
  },
  SET_USERINFO: (state, obj) => {
    state.userInfo = obj
  },
  GET_USERINFO: (state, key) => {
    return state.userInfo[key]
  },
  SET_ROLELIST: (state, array) => {
    state.roleList = array
  },
  SET_ROLESTYPE: (state, obj) => {
    state.rolesType = obj
  }
}
