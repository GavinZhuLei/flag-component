import Mock from 'mockjs';
const developerinfo = [
  {
    id: '405001',
    phone: '13375698564',
    name: '张三',
    roleId: '研发人员',
    group: '分组1',
    dateadd: '2017-12-12 15:36:05',
    author: '李四'
  }
]

const roleDict = {
  '1': '研发人员',
  '2': '研发管理员'
}
// Random.extend({
//   constellations: ['研发人员', '研发管理员'],
//   role: function(date){
//       return this.pick(this.constellations)
//   }
// })

const developerlist = [];

for (let i = 0; i < 86; i++) {
  developerlist.push(Mock.mock({
    id: Mock.Random.string('number', 6),
    phone: Mock.Random.string('number', 11),
    name: Mock.Random.cname(),
    roleId: Mock.Random.pick(['研发人员', '研发管理员']),
    group: '分组' + Mock.Random.natural(1, 10),
    dateadd: Mock.Random.datetime(),
    author: Mock.Random.cname()
  }));
}

export { roleDict, developerinfo, developerlist };
