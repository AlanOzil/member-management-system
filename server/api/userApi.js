const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('./sql/user')
const nanoid = require('nanoid')
const crypto = require('crypto')
const redis = require('../redis')
const {
  handleSqlFunc,
  jsonWrite
} = require('./common');
let {
  userLogin,
  authMenu
} = require('../model/user');

//使用连接池链接数据库

const pool = mysql.createPool(models.mysql)

let addTokenFunc = (res, sql, token, userId) => {
  pool.query(sql, [token, userId, new Date(), new Date(new Date().getTime() + 10 * 60 * 60 * 1000), true], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      jsonWrite(res, {
        token: token
      })
    }
  })
}

let getMenuFunc = (res, sql) => {
  handleSqlFunc(sql, [], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      if (ret.length) {
        let menuList = recursionMenu(ret, 'root')
        jsonWrite(res, menuList)
      }
    }
  })
}

// 对菜单进行递归处理
let recursionMenu = (data, id) => {
  data.forEach((el, i) => {
    el.leaf = false
    el.menuInfo = []
  })
  let parentList = data.filter((el) => {
    return el.parentId === id
  })
  parentList.forEach((el) => {
    let menuList = recursionMenu(data, el.menuId)
    if (menuList.length) {
      el.leaf = true
      el.menuInfo = menuList
    }
  })
  return parentList
}

// 用户登录信息
router.use('/userInfo', (req, res) => {
  let sql = $sql.user.checkByToken
  let token = req.headers.token
  if (token === 'null' || !token || token === 'undefined') {
    // res.statusCode = 401
    res.json({
      success: false,
      message: '未登录',
      code: 401
    })
  } else {
    pool.query(sql, [token], (err, result, fields) => {
      if (err) {
        throw err
      } else {
        if (result.length) {
          redis.set(result[0].token, JSON.stringify(result[0]), 10 * 60 * 60 * 1000)
        }
        jsonWrite(res, result[0])
      }
    })
  }
})

// 登录
router.use('/login', (req, res) => {
  let login = $sql.user.login
  let checkById = $sql.user.checkById
  let addToken = $sql.user.addToken
  let deleteToken = $sql.user.deleteToken
  let params = req.body
  // let password = crypto.createHash('md5').update(params.password).digest('hex')
  let token = nanoid()
  pool.query(login, [params.tel, params.password], (err, result, fields) => {
    if (err) {
      throw err
    } else if (result.length === 1) {
      // 查询到用户
      userLogin = result[0]
      pool.query(checkById, [userLogin.id], (err, ret, fields) => {
        if (err) {
          throw err
        } else if (!ret.length) {
          // 若未登录，添加新的token
          addTokenFunc(res, addToken, token, userLogin.id)
        } else if (ret[0].expiration_time > new Date()) {
          // 查询到token，且登录未过期未登录过
          jsonWrite(res, {
            token: ret[0].token
          })
        } else if (ret[0].expiration_time <= new Date()) {
          ret.forEach((el) => {
            handleSqlFunc(deleteToken, el.token)
          })
          addTokenFunc(res, addToken, token, userLogin.id)
        }
      })
    } else if (result.length > 1) {
      throw '用户账号重复'
    } else if (result.length === 0){
      res.json({
        success: false,
        message: '用户名或密码错误',
        code: 1
      })
    }
  })
})

// 获取菜单
router.use('/getAuthMenu', (req, res) => {
  let getMenuById = $sql.menu.getMenuById
  getMenuFunc(res, getMenuById)
  // jsonWrite(res, menu)
})

// 获取用户列表
router.use('/list', (req, res) => {
  let sql = $sql.user.userList
  let params = req.query
  handleSqlFunc(sql, [`%${params.name}%`, `%${params.tel}%`, `%${params.email}%`, `%${params.gender}%`, `%${params.status}%`, parseInt(params.page) - 1, parseInt(params.rows)], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      jsonWrite(res, ret)
    }
  })
  // jsonWrite(res, menu)
})

module.exports = router
