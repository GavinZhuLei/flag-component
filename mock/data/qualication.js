import Mock from 'mockjs'

const qualication = Mock.mock({
  "data": {
      "address": "上海虹桥33号",
      "applicantId": "0",
      "applicantIdUrl": "www.jfdu.jpg",
      "applicantName": "张三",
      "authStatus": 0,
      "authorizationLetterUrl": "www.jdifgjdfsdfg.jpg",
      "checkResult": 75834,
      "checkView": "测试内容o0o3",
      "city": "上海市",
      "corpId": "260003",
      "corpLicenseUrl": "www.edjwfewj.jpg",
      "corpName": "上海帜讯",
      "createDate": 1503492584000,
      "id": "B65F42B986AD42F0A1743E8F68A02E7F",
      "identityType": 0,
      "legalPerson": "大王",
      "legalPersonId": "4210481988040645663",
      "province": "上海",
      "societyCreditCode": "1542344512",
      "submitStatus": 0,
      "updateDate": 1503467925000,
      "userId": "17545126366551"
  },
  "resCode": "0",
  "resMsg": "ok"
})

const applyRecord = Mock.mock({
  "data|0-5": [
      {
          "applicant": "王五",
          "corpId": "260004",
          "createDate": 1503493835000,
          "id": "0F4E489DF2094B24889680511A0A06C5",
          "status|0-2": 0,
          "updateDate": 1
      }
  ],
  "resCode": "0",
  "resMsg": "ok"
})

export {qualication, applyRecord}