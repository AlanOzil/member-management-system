// sql语句
var sqlMap = {
  user: {
    checkByToken: 'select a.token as token, a.user_id as id, b.name as name from access_token as a inner join sys_user as b on a.user_id = b.id where token = ?',
    initUser: 'insert into sys_user(id, name, pwd, tel, gender, created_time, created_by) values (?,?,?,?,?,?,?)',
    login: 'select * from sys_user where tel=? and pwd=?',
    checkById: 'select * from access_token where user_id = ? order by created_time desc',
    addToken: 'insert into access_token(token, user_id, created_time, expiration_time, is_login) values (?,?,?,?,?)',
    deleteToken: 'delete from access_token where token = ?'
  },
  menu: {
    getMenuById: 'select menu_id as menuId, level, name, seq, url, parent_id as parentId from sys_menu as a order by seq asc;'
  }
}
module.exports = sqlMap;
