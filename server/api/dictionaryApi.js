const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('./sql/dictionary')
const nanoid = require('nanoid')
const crypto = require('crypto')
const redis = require('../redis')
const {
  handleSqlFunc,
  jsonWrite
} = require('./common');

const pool = mysql.createPool(models.mysql)

router.use('/getDictionariesInfo', (req, res) => {
  let sql = $sql.dic.getDicInfo
  handleSqlFunc(sql, [], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      jsonWrite(res, ret)
    }
  })
})

router.use('/pageDictionaryItems', (req, res) => {
  let getItemList = $sql.dicItem.getItemList
  let total = $sql.dicItem.total
  let params = req.query
  handleSqlFunc(getItemList, [params.dictionaryId, parseInt(params.currentPage) - 1, parseInt(params.pageSize)], (err, result, fields) => {
    if (err) {
      throw err
    } else {
      handleSqlFunc(total, [params.dictionaryId], (err, ret, fields) => {
        if (err) {
          throw err
        } else {
          jsonWrite(res, {
            list: result,
            total: ret.total
          })
        }
      })
    }
  })
})

// saveDictionariesInfo
router.use('/saveDictionariesInfo', (req, res) => {
  let params = req.body
  let token = req.headers.token
  let sql = params.id ? $sql.dic.update : $sql.dic.add
  // console.log(params)
  if (params.id) {
    redis.get(token, (err, red) => {
      red = JSON.parse(red)
      handleSqlFunc(sql, [params.code, params.name, params.description, new Date(), red.id, params.id], (err, ret, fields) => {
        if (err) {
          throw err
        } else {
          jsonWrite(res, true)
        }
      })
    })
  } else {
    redis.get(token, (err, red) => {
      red = JSON.parse(red)
      handleSqlFunc(sql, [nanoid(), params.code, params.name, params.description, 1, new Date(), red.id, 0], (err, ret, fields) => {
        if (err) {
          throw err
        } else {
          jsonWrite(res, true)
        }
      })
    })
  }
})

// deleteDictionaryItem
router.use('/delete', (req, res) => {
  let sql = $sql.dic.del
  let params = req.query
  let token = req.headers.token
  redis.get(token, (err, red) => {
    handleSqlFunc(sql, [new Date(), red.id, params.id], (err, ret, fields) => {
      if (err) {
        throw err
      } else {
        jsonWrite(res, true)
      }
    })
  })
})

// saveDictionaryItemInfo
router.use('/saveDictionaryItemInfo', (req, res) => {
  let params = req.body
  let token = req.headers.token
  let sql = params.id ? $sql.dicItem.update : $sql.dicItem.add
  if (params.id) {
    redis.get(token, (err, red) => {
      red = JSON.parse(red)
      handleSqlFunc(sql, [params.code, params.text, params.description, params.orderSort, new Date(), red.id, params.id], (err, ret, fields) => {
        if (err) {
          throw err
        } else {
          jsonWrite(res, true)
        }
      })
    })
  } else {
    redis.get(token, (err, red) => {
      red = JSON.parse(red)
      handleSqlFunc(sql, [nanoid(), params.code, params.text, params.description, 1, params.dictionaryId, params.orderSort, new Date(), red.id, 0], (err, ret, fields) => {
        if (err) {
          throw err
        } else {
          jsonWrite(res, true)
        }
      })
    })
  }
})
module.exports = router
