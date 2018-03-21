import Mock from 'mockjs'

const kitList = Mock.mock({
  "emptyIdentifier": 1,
  "data": {
      "list|10": [
          {
              "auditStatus": 1,
              "createDate|1": [1503478645000,1503478286000,1503474953000,1503476804000,1503579729000,1503476818000,1503474964000,1503478345000,1503476829000],
              "developeMethod": 1,
              "groupId": 1,
              "groupName": 1,
              "isSudit": 1,
              "logoUrl": 1,
              "name": '@ctitle(3, 5)',
              "network": "网络环境",
              "spId": 1,
              "spNmae": 1,
              "status": "1",
              "statusName": 1,
              "suiteDesc": '@cword(0, 50)',
              "suiteNo": '@increment',
              "updateDate|1": [1503478645000,1503478286000,1503474953000,1503476804000,1503579729000,1503476818000,1503474964000,1503478345000,1503476829000],
              "version": "1.0.1"
          }
      ],
      "pageNumber": 1,
      "pageSize": 10,
      "total": 25,
      "totalPage": 1
  },
  "resCode": "0",
  "resMsg": "ok"
})

const kitDetail = Mock.mock({
    "emptyIdentifier": 1,
    "data": {
        "auditStatus": "测试内容y2w4",
        "createDate|1": [1503478645000,1503478286000,1503474953000,1503476804000,1503579729000,1503476818000,1503474964000,1503478345000,1503476829000],
        "developeMethod": "开发222方式",
        "groupId": 1,
        "groupName": "所属开发组222没名字",
        "logoUrl": "https://assets.servedby-buysellads.com/p/manage/asset/id/33430",
        "name": "项目名222字",
        "network": "网络环境",
        "status": "测试内容dm2k",
        "statusName": "测试内容bv3c",
        "suiteAppList": [
            {
                "address": "测试内容5dts",
                "appDesc": "cword",
                "id": "2",
                "logoUrl": "https://assets.servedby-buysellads.com/p/manage/asset/id/33430",
                "name": "@ctitle()",
                "suiteId": 0,
                "type": "EP",
                "version": 1
            }
        ],
        "suiteDesc": "项目描述",
        "suiteKey": "aaaa",
        "suiteNo": 1,
        "suiteSecret": "bbb",
        "suiteServiceList": [],
        "updateDate|0": [1503478645000,1503478286000,1503474953000,1503476804000,1503579729000,1503476818000,1503474964000,1503478345000,1503476829000],
        "version": "1.0.1"
    },
    "resCode": "0",
    "resMsg": "ok"
})

export {kitList, kitDetail}

