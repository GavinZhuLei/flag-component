import Mock from 'mockjs';
const testEinfo = [
  {
    id: '405001',
    name: '陕西联通',
    username: '张三',
    contactUserName: '李四',
    creator: '王五',
    dateadd: '2017-12-12 15:36:05',
    userupdate: '王五',
    dateup: '2017-12-12 22:36:05'
  }
];

const testElist = [];

for (let i = 0; i < 5; i++) {
  testElist.push(Mock.mock({
    id: Mock.Random.string('number', 6),
    name: '@ctitle(3,5)',
    username: '@cname()',
    contactUserName: Mock.Random.cname(),
    creator: Mock.Random.cname(),
    dateadd: Mock.Random.datetime(),
    userupdate: Mock.Random.cname(),
    dateup: Mock.Random.datetime()
  }));
}

export { testEinfo, testElist };
