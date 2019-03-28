let handleSqlFunc = (sql, params, callback) => {
  pool.query(sql, [...params], (err, ret, fields) => {
    if (err) {
      throw err
    } else {
      callback && callback()
    }
  })
}

module.exports = {
  handleSqlFunc
}
