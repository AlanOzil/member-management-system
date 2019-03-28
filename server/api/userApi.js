const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('./sql/user')
const nanoid = require('nanoid')
const crypto = require('crypto')
const {
  handleSqlFunc
} = require('./common');
let {
  userToken,
  userLogin
} = require('../model/user');

//使用连接池链接数据库

const pool = mysql.createPool(models.mysql)

let jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: 1,
      message: '操作失败',
      success: false
    });
  } else {
    res.json({
      code: 0,
      message: '',
      success: true,
      data: ret
    })
  }
}

let addTokenFunc = (sql, token, userId) => {
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

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

router.use('/userInfo', (req, res) => {
  let sql = $sql.user.checkByToken
  let token = req.headers.token
  if (token === 'null') {
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
        userToken = result
        console.log(userToken)
      }
    })
  }
})

router.use('/login', (req, res) => {
  let login = $sql.user.login
  let checkById = $sql.user.checkById
  let addToken = $sql.user.addToken
  let deleteToken = $sql.user.deleteToken
  let params = req.body
  let password = crypto.createHash('md5').update(params.password).digest('hex')
  let token = nanoid()
  pool.query(login, [params.tel, password], (err, result, fields) => {
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
          addTokenFunc(addToken, token, userLogin.id)
        } else if (ret[0].expiration_time > new Date()) {
          // 查询到token，且登录未过期未登录过
          jsonWrite(res, {
            token: ret[0].token
          })
        } else if (ret[0].expiration_time <= new Date()) {
          ret.forEach((el) => {
            handleSqlFunc(deleteToken, el.token)
          })
          addTokenFunc(addToken, token, userLogin.id)
        }
      })
    } else if (result.length === 1) {
      throw '用户账号重复'
    }
  })
})
module.exports = router
