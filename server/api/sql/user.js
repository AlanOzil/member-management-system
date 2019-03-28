// sql语句
var sqlMap = {
  user: {
    checkByToken: 'select * from access_token where token = ?',
    initUser: 'insert into sys_user(id, name, pwd, tel, gender, created_time, created_by) values (?,?,?,?,?,?,?)',
    login: 'select * from sys_user where tel=? and pwd=?',
    checkById: 'select * from access_token where user_id = ? order by created_time desc',
    addToken: 'insert into access_token(token, user_id, created_time, expiration_time, is_login) values (?,?,?,?,?)',
    deleteToken: 'delete from access_token where token = ?'
  }
}
module.exports = sqlMap;
