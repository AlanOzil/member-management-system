// sql语句
var sqlMap = {
  user: {
    checkByToken: 'select a.token as token, a.user_id as id, b.name as name from access_token as a inner join sys_user as b on a.user_id = b.id where token = ?',
    initUser: 'insert into sys_user(id, name, pwd, tel, gender, created_time, created_by) values (?,?,?,?,?,?,?)',
    login: 'select * from sys_user where (tel=? or email=?) and pwd=?',
    checkById: 'select * from access_token where user_id = ? order by created_time desc',
    addToken: 'insert into access_token(token, user_id, created_time, expiration_time, is_login) values (?,?,?,?,?)',
    deleteToken: 'delete from access_token where token = ?',
    userList: `select id, name, tel, email, gender, status, created_by, created_time from sys_user where is_deleted=0 and name like ? and tel like ? and email like ? and gender like ? and status like ? order by status, created_by, name asc limit ?,?`,
    updateStatus: 'update sys_user set status = ?, updated_by = ?, updated_time = ? where id = ?',
    delete: 'update sys_user set is_deleted=1, updated_by = ?, updated_time = ? where id = ?',
    add: `insert into sys_user (id, name, pwd, gender, tel, email, status, is_deleted, created_by, created_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    update: 'update sys_user set name = ?, gender = ?, tel = ?, email = ?, status = ?, updated_by = ?, updated_time = ? where id = ?',
    info: 'select id, name, tel, email, gender, status from sys_user where is_deleted=0 and id=?'
  },
  menu: {
    getMenuById: 'select menu_id as menuId, level, name, seq, url, parent_id as parentId from sys_menu as a order by seq asc;'
  }
}
module.exports = sqlMap;
