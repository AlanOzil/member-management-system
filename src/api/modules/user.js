import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取用户列表
export function list (params) {
  return request({
    url: requestUrl(`/user/list?${params}`),
    method: 'get'
  })
}

// 获取用户信息
export function info (id) {
  return request({
    url: requestUrl('/sys/user/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取登陆用户
export function loginUser () {
  return request({
    url: requestUrl('/user/userInfo'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 修改密码
export function updatePassword (params) {
  return request({
    url: requestUrl('/sys/user/password'),
    method: 'post',
    data: requestParam(params)
  })
}

// 添加或编辑用户
export function save (params) {
  return request({
    url: requestUrl('/user/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 改变状态
export function setStatus (params) {
  return request({
    url: requestUrl('/user/setStatus'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除用户
export function del (params) {
  return request({
    url: requestUrl('/user/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
