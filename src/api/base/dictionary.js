import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取树形菜单数据
export function groupList (params) {
  return request({
    url: requestUrl('/basicdata/dictionary/getDictionariesInfo' + params),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 树形菜单添加节点
export function group (params) {
  return request({
    url: requestUrl('/basicdata/dictionary/saveDictionariesInfo'),
    method: 'post',
    data: requestParam(params)
  })
}

// 树形菜单添加节点
export function groupEdit (params) {
  return request({
    url: requestUrl('/basicdata/dictionary/saveDictionariesInfo'),
    method: 'post',
    data: requestParam(params)
  })
}

// 树形菜单删除节点
export function groupRemove (params) {
  return request({
    url: requestUrl(`/basicdata/dictionary/delete/${params}`),
    method: 'post'
  })
}

// 根据树形菜单的dicGpId获得详细数据
export function dictionaryList (params) {
  return request({
    url: requestUrl('/basicdata/dictionaryitems/pageDictionaryItems?' + params),
    method: 'get'
    // data: requestParam(params)
  })
}

// 字典添加数据
export function dictionaryAdd (params) {
  return request({
    url: requestUrl('/basicdata/dictionaryitems/saveDictionaryItemInfo'),
    method: 'post',
    data: requestParam(params)
  })
}

// 字典编辑数据
export function dictionaryEdit (params) {
  return request({
    url: requestUrl('/basicdata/dictionaryitems/saveDictionaryItemInfo'),
    method: 'post',
    data: requestParam(params)
  })
}

// 字典删除数据
export function dictionaryRemove (params) {
  return request({
    url: requestUrl(`/basicdata/dictionaryitems/deleteDictionaryItem/${params}`),
    method: 'post'
  })
}
