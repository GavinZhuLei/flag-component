// import Vue from 'vue'
import api from 'api';
const sleep = (commit, status, time = 400) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  })
}
export default {
  getDictAll: ({commit}, status) => {
    commit('SET_DICTSTATUS', true)
    return new Promise((resolve, reject) => {
      api.getDict({status})  // 获取全部的数据字典
      .then(data => {
        commit('SET_DICT', data.list)
        commit('SET_DICTSTATUS', false)
        resolve()
      }, (resMsg) => {
        // Vue.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
      })
    })
  },
  refreshUserData: () => {
    return new Promise((resolve, reject) => {
      api.refreshUserData({}).then(data => {
        window.localStorage.setItem('userdata', JSON.stringify(data))
        resolve(data)
      })
    })
  },
  async getDict ({dispatch, commit, state}, {codeId, status = '0'}) {
    await dispatch('getDictAll', status)
    let data = state.dict
    let toTree = (data, codeId) => {
      // 删除 所有 children,以防止多次调用
      let result = []
      let temp = []
      data.forEach(function (item) {
        temp.push({id: item.id, value: item.code, type: item.type, label: item.value, pid: item.parentId, status: item.status})
        // delete item.children;
      });
      data = temp
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function (item) {
        map[item.id] = item;
      });
      // console.log(map);
      var val = [];
      data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
      val.forEach(function (item) {
        if (item.value === codeId) result.push(item)
      })
      // return result.length ? (result[0].children || []) : val
      return result.length ? result[0].children : []
    }
    return toTree(data, codeId)
  },
  async getDictCN ({dispatch, commit, state}, obj) {
    // getDictCN('{SYS_WEB}和{SYS_COMPUTER}')
    let type = obj.type
    let code = obj.code
    let result = []
    let json = {}
    let pattern = /\{(\w*[:]*[=]*\w+)\}(?!})/g;
    let codeReg = code.match(/\{[^}]+\}/ig)
    // if (codeReg) let codeArr = codeReg
    // else let codeArr = code
    let tempEngine = (template, json) => {
      return template.replace(pattern, (match, key, value) => {
        return json[key];
      });
    }
    let toCN = (data, type, code) => {
      data.forEach(function (item) {
        if (codeReg) {
          codeReg.forEach(function (codeitem) {
            if (codeitem === '{' + item.code + '}' && item.type === type) {
              json[item.code] = item.value
            }
          })
        }
      })
      return tempEngine(code, json)
    }
    if (!state.getDS) await dispatch('getDictAll')
    for (var i = 1; i <= 10; i++) {
      if (!state.dict.length) {
        await sleep()
      } else {
        result = toCN(state.dict, type, code)
        break
      }
    }

    return result
  }
}
