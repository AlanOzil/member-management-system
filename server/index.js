const userApi = require('./api/userApi')
const dictionaryApi = require('./api/dictionaryApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// 后端api路由
app.all('*', (req, res, next) => {
  let token = req.headers.token
  if ((token === 'null' || !token || token === 'undefined') && req.path !== '/api/user/login') {
    // res.statusCode = 401
    res.json({
      success: false,
      message: '未登录',
      code: 401
    })
  } else {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  }
})
app.use('/api/user', userApi)
app.use('/api/dictionary', dictionaryApi)

// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
