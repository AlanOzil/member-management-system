// sql语句
var sqlMap = {
  dic: {
    getDicInfo: 'select dic_id as id, null as parentId, name, code, @r:=@r+1 as orderSort, description, status from sys_dictionaries as a, (select @r:=0) b where status = 1 and is_deleted = 0',
    add: 'insert into sys_dictionaries (dic_id, code, name, description, status, created_time, created_by, is_deleted) values (?,?,?,?,?,?,?,?)',
    update: `update sys_dictionaries set code = ?, name=?, description=?, updated_time = ?, updated_by = ? where dic_id = ?`,
    del: 'update sys_dictionaries set is_deleted = 1, updated_time = ?, updated_by = ? where dic_id = ?'
  },
  dicItem: {
    getItemList: 'select item_id as id, null as parent, text, code, seq as orderSort, b.name as createdBy, a.created_time as createdTime, description, status from sys_dictionaryitems as a left join sys_user as b on a.created_by = b.id where status = 1 and is_deleted = 0 and a.dictionary_id= ? order by a.seq asc limit ?,?;',
    total: 'select count(*) as total from sys_dictionaryitems where status = 1 and dictionary_id=?',
    add: 'insert into sys_dictionaryitems (item_id, code, text, description, status, dictionary_id, seq, created_time, created_by, is_deleted) values (?,?,?,?,?,?,?,?,?,?)',
    update: `update sys_dictionaryitems set code = ?, text=?, description=?, seq=?, updated_time = ?, updated_by = ? where item_id = ?`,
    del: 'update sys_dictionaryitems set is_deleted = 1, updated_time = ?, updated_by = ? where item_id = ?'
  }
}
module.exports = sqlMap;
