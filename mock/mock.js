import axios from 'axios'
import _Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
import { Infos } from './data/infos'
import { Telephone } from './data/telephone'
import { testElist } from './data/testEnterprise'
import { groupslist } from './data/groups'
import { roleDict, developerlist } from './data/developer'
import { qualication, applyRecord } from './data/qualication'
import {kitList, kitDetail} from './data/kit'
let _Users = Users
let _Infos = Infos
let _Telephone = Telephone
let _groupslist = groupslist

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      resMsg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      resMsg: 'failure'
    });

    // 登录
    mock.onPost('/home/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            console.log(u)
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { resCode: 200, resMsg: '请求成功', data: user }]);
          } else {
            resolve([200, { resCode: 500, resMsg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });
    // 获取info列表
    mock.onGet('/info/list').reply(config => {
      console.dir(config.params);
      let {name} = config.params;
      let mockInfos = _Infos.filter(info => {
        if (name && info.name.indexOf(name) === -1) {
          return false;
        }
        return true;
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            infos: mockInfos
          }]);
        }, 1000);
      })
    })
    // 获取联系我们列表
    mock.onGet('/telephone/list').reply(config => {
      let {name} = config.params;
      let mockTel = _Telephone.filter(telephone => {
        if (name && telephone.name.indexOf(name) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            telephones: mockTel
          }]);
        }, 1000);
      });
    });

    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    mock.onGet('/user/queryAllUser').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resMsg: '请求成功', resCode: 200, data: _Users
            // users: _Users
          }]);
        }, 1000);
      });
    })

    // 获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    // 删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '编辑成功'
          }]);
        }, 500);
      });
    });

    // 新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取测试企业列表（分页）
    mock.onPost('/corporation/list').reply(config => {
      let {page, pageSize} = JSON.parse(config.data);
      let total = testElist.length;
      let mockTestElist = testElist.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resMsg: '请求成功', resCode: 200, data: mockTestElist, total: total
          }]);
        }, 1000);
      });
    });

    // 新增测试企业
    mock.onPost('/corporation/add').reply(config => {
      console.log(config)
      let { contactUserName, name, username } = JSON.parse(config.data);
      testElist.unshift({
        id: _Mock.Random.string('number', 6),
        name: name,
        username: username,
        contactUserName: contactUserName,
        creator: '张三',
        dateadd: _Mock.Random.now(),
        userupdate: '',
        dateup: ''
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取分组列表（分页）
    mock.onPost('/dev/group/list').reply(config => {
      let {page, pageSize} = JSON.parse(config.data);
      let total = groupslist.length;
      // let mockgroupslist = groupslist.sort(function (a, b) {
      //   return a.dateadd.localeCompare(b.dateadd)
      // })
      let mockgroupslist = groupslist.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resMsg: '请求成功', resCode: 200, data: mockgroupslist, total: total
          }]);
        }, 1000);
      });
    });

    // 新增分组
    mock.onPost('/dev/group/add').reply(config => {
      let { members, name } = JSON.parse(config.data);
      _groupslist.unshift({
        id: _Mock.Random.string('number', 6),
        title: name,
        memcount: members.length,
        dateadd: _Mock.Random.now(),
        dateup: '',
        status: true
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取开发者列表（分页）
    mock.onPost('/developer/listpage').reply(config => {
      console.log(config)
      let {page, pageSize} = JSON.parse(config.data);
      let total = developerlist.length;
      let mockdeveloperlist = developerlist.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resMsg: '请求成功', resCode: 200, data: mockdeveloperlist, total: total
          }]);
        }, 1000);
      });
    });

    // 新增开发者
    mock.onPost('/developer/add').reply(config => {
      let { name, tel, roleId } = JSON.parse(config.data);
      developerlist.unshift({
        id: _Mock.Random.string('number', 6),
        phone: tel,
        name: name,
        roleId: roleDict[roleId],
        group: '分组' + _Mock.Random.natural(1, 10),
        dateadd: _Mock.Random.now(),
        author: '张三'
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: 200,
            resMsg: '新增成功'
          }]);
        }, 500);
      });
    });

    // 获取企业资质信息
    mock.onPost('/credential/query').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, qualication])
        }, 1000);
      })
    })

    // 获取企业资质审核列表
    mock.onPost('/credential/queryRecoeds').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, applyRecord])
        }, 1000);
      })
    })

    // 保存企业资质信息
    mock.onPost('/credential/save').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {id: 1, resCode: '0', resMsg: ''}])
        }, 1000)
      })
    })

    // 企业资质提交审核
    mock.onPost('/credential/submit').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {resCode: '0', resMsg: ''}])
        }, 1000);
      })
    })

    mock.onGet('/suite/getSuiteList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, kitList])
        }, 1000)
      })
    })

    mock.onGet('/suite/insert').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {data: 1, resCode: '0', resMsg: ''}])
        }, 1000)
      })
    })

    mock.onGet('/suite/getSuiteDetail').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, kitDetail])
        }, 1000)
      })
    })

    mock.onPost('/suiteApp/insert').reply(config => {
      console.log('##############3')
      let {params} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: '0',
            resMsg: '',
            data: {
              address: params.address,
              appDesc: params.appDesc,
              id: parseInt(Math.random() * 100),
              logoUrl: params.logoUrl,
              name: params.name,
              suiteId: params.suiteId,
              type: params.type,
              version: params.version
            }
          }])
        }, 1000)
      })
    })

    mock.onPost('/suiteApp/update').reply(config => {
      let {params} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            resCode: '0',
            resMsg: '',
            data: {
              address: params.address,
              appDesc: params.appDesc,
              id: params.id,
              logoUrl: params.logoUrl,
              name: params.name,
              suiteId: params.suiteId,
              type: params.type,
              version: params.version
            }
          }])
        }, 1000)
      })
    })

    mock.onPost('/suiteApp/delete').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {resCode: '0'}])
        }, 1000)
      })
    })
  }
};
