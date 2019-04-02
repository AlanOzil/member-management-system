const models = require('../db')
const mysql = require('mysql')
const pool = mysql.createPool(models.mysql)

const handleSqlFunc = (sql, params, callback) => {
  pool.query(sql, [...params], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      callback && callback(err, ret, fields)
    }
  })
}

const jsonWrite = function(res, ret) {
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

module.exports = {
  handleSqlFunc,
  jsonWrite
}
