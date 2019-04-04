import request from '@/api/request'
import requestUrl from '@/api/requestUrl'
import requestParam from '@/api/requestParam'

const url = '/dictionary/list/group?code=';


// 状态 => status
// 性别 => gender

/**
 * 获取字典数据
 * example =>  获取客户等级数据     getDicData('custLevel).then(data => custData = data)
 * @export
 * @param {any} dicName 参数为上述类型
 * @returns
 */
export function getDicData (dicName) {
  return new Promise((resolve, reject) => {
    request({
      url: requestUrl(url + dicName),
      method: 'get',
      params: requestParam({}, 'get')
    }).then( ({data}) => {
      resolve(data.data);
    })
  })
}
