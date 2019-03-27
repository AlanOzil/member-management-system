import create from './create'
import * as common from './common'
import * as user from './user'
import * as menu from './menu'

console.log('\n%c!<-------------------- 接口拦截, mock模拟数据 start -------------------->', 'color:red')

// tips
// 1. 关闭[业务模块集]拦截, create方法[第2个参数]设置. (默认开启)
// 2. 关闭[业务模块对象]拦截, 通过模块返回对象中的[isOpen属性, 默认开启]设置. (默认开启)
create(common)      // 公共
create(user)
create(menu)

console.log('%c!<-------------------- 接口拦截, mock模拟数据  end  -------------------->\n', 'color:red')