// 获取用户列表
export function list () {
    return {
      // isOpen: false,
      url: '/sys/user/list',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'page': {
          'totalCount': 2,
          'pageSize': 10,
          'totalPage': 1,
          'currPage': 1,
          'list': [{
            'userId': 1,
            'username': 'admin',
            'password': '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d',
            'salt': 'YzcmCZNvbXocrsz9dm8e',
            'email': 'root@renren.io',
            'mobile': '13612345678',
            'status': 1,
            'roleIdList': null,
            'createUserId': 1,
            'createTime': '2016-11-11 11:11:11'
          },
          {
            'userId': 2,
            'username': 'test',
            'password': 'e477847e4d57f667c1ff1e8a7d463a31583563104270e61f589fa829ab56a8a9',
            'salt': 'FWrbqmSyS3J0jps556lt',
            'email': '11@11.com',
            'mobile': '13311111111',
            'status': 1,
            'roleIdList': null,
            'createUserId': 1,
            'createTime': '2018-03-12 11:30:15'
          }]
        }
      }
    }
  }
  
  // 获取用户信息
  export function info () {
    return {
      // isOpen: false,
      url: '/sys/user/info',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'user': {
          'userId': 1,
          'username': 'admin',
          'password': '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d',
          'salt': 'YzcmCZNvbXocrsz9dm8e',
          'email': 'root@renren.io',
          'mobile': '13612345678',
          'status': 1,
          'roleIdList': null,
          'createUserId': 1,
          'createTime': '2016-11-11 11:11:11'
        }
      }
    }
  }
  