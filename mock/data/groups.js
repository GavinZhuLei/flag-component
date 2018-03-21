import Mock from 'mockjs';
const groupsinfo = [
  {
    id: '405001',
    title: '掌上会议',
    memcount: '2',
    dateadd: '2017-12-12 15:36:05',
    dateup: '2017-12-17 12:11:34',
    status: true
  }
];

const groupslist = [];

for (let i = 0; i < 86; i++) {
  groupslist.push(Mock.mock({
    id: Mock.Random.string('number', 6),
    title: '分组' + Mock.Random.natural(1, 10),
    memcount: Mock.Random.natural(1, 100),
    dateadd: Mock.Random.datetime(),
    dateup: Mock.Random.datetime(),
    status: Mock.Random.boolean()
  }));
}

export { groupsinfo, groupslist };
