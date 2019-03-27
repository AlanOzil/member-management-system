import API from '@/api'
/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (
      c === 'x'
      ? (Math.random() * 16 | 0)
      : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  // let val = /.*\/(.*)\.html/.exec(url)
  let val = /[a-zA-Z]+$/.exec(url) // 获取路由名称

  return val && val.length >= 1
    ? val[0]
    : ''
}

/**
 * 格式化时间
 *
 * @export
 * @param {any} fmt 时间格式
 * @param {any} date 时间戳数据
 * @returns
 */
export function dateFtt(fmt, date) { //dateFtt('yyyy-MM-dd hh:mm:ss',a)
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length == 1)
        ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 获取产品大系列信息
 *
 * @export
 */
export function getInvData() {
  var a = [];
  API.inventory.treeList().then(({data}) => {

    if (data && data.success) {

      data.data.forEach(item => {
        if (item.code == 'A' || item.code == 'B' || item.code == 'C') {
          item.children.forEach(i => {
            a.push(i)
          })
        }
      })
    }
  })

  return a;
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 数字数据转换
 * @param {*} num
 */
export function formatNum(num) {
  if (num === null) {
    return '-'
  }
  let res = parseInt(num)
  if (res < 0) {
    // res = res * -1
    res = (res || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return `<span style="color: red">${res}</span>`
  }
  res = (res || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return res
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return ''
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return ''
  }
  let newClass = el.className.split(' ')
  let i = newClass.indexOf(className)
  newClass.splice(i, 1)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 表格内数组类数据根据返回值与对应数组对比筛选展示
 * value 返回值
 * prop 显示值
 */
export function tableArrayDataFormatter (value, array, prop = "code", label = "name") {
  let data = array.filter(item => item[prop] == value)[0];

  if (data) {
    return data[label];
  }
  else {
    return value;
  }
}
