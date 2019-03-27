import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

const url = '/dictionary/list/group/';

// 基础配置-状态

// 基础配置-结算方式

// 基础配置-产品分类
export function invType () {
    return request({
        url: requestUrl(url + 'invType'),
        method: 'get',
        params: requestParam({}, 'get')
    })
}

// 基础配置-货币名称
export function currency () {
    return request({
        url: requestUrl(url + 'currency'),
        method: 'get',
        params: requestParam({}, 'get')
    })
}