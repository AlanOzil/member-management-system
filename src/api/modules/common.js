import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

// 获取验证码
export function captcha (uuid) {
  return requestUrl(`/captcha.jpg?uuid=${uuid}`)
  // return requestUrl(`/mes/pl/user/captcha?num=${uuid}`)
}

// 登录
export function login (params) {
  return request({
    url: requestUrl('/sys/login'),
    method: 'post',
    data: requestParam(params)
  })
}

// 退出
export function logout () {
  return request({
    url: requestUrl('/logout'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取变更类型
export function getChangeType (params) {
  return request({
    url: requestUrl(`/common/getChangeTypeInfo?isAll=${params ? params : ''}`),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取系统时间
export function getSystemTime () {
  return request({
    url: requestUrl(`/planmanage/forecast/getSystemTime`),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 处理待办
export function finishWorklistItem (params) {
  return request({
    url: requestUrl(`/workflow/workflowcommon/finishWorklistItem`),
    method: 'post',
    data: requestParam(params)
  })
}

// 获取币种信息
export function getCurrencyInfo () {
  return request({
    url: requestUrl(`/common/getCurrencyInfo`),
    method: 'get'
  })
}

// 转交待办
export function redirectWorklistItem (params) {
  return request({
    url: requestUrl(`/workflow/workflowcommon/redirectWorklistItem`),
    method: 'post',
    data: requestParam(params)
  })
}

// 加载流程图片
export function loadByProcessInsance (params) {
  return request({
    url: requestUrl(`/workflow/workflowcommon/loadByProcessInsance?processInstanceId=${params}`),
    method: 'get'
  })
}

// 获取组织架构信息
export function getOrganizationInfo () {
  return request({
    url: requestUrl(`/user/getOrganizationInfo`),
    method: 'get'
  })
}

// 根据组织架构编号获取用户信息
export function getUserInfoByOrgId (params) {
  return request({
    url: requestUrl(`/user/getUserInfoByOrgId?${params}`),
    method: 'get'
  })
}

// 根据编号获取BOM列表详情信息
export function getBomlistDetailInfoByCode (params) {
  return request({
    url: requestUrl(`/common/getBomlistDetailInfoByCode?${params}`),
    method: 'get'
  })
}

// 获取标签类型
export function getTagTypeInfo () {
  return request({
    url: requestUrl(`/common/getTagTypeInfo?`),
    method: 'get'
  })
}
