import Mock from 'mockjs'
import requestUrl from '@/api/requestUrl'
import merge from 'lodash/merge'

export default function(mods, isOpen = true) {
    if (isOpen) {
        for (var key in mods) {
            var mod = mods[key]() || {};
            if (mod.isOpen !== false) {
                mod.data = merge({ 'mock': true }, mod.data);

                console.log('\n');
                console.log('url: ', mod.url);
                console.log('type: ', mod.type);
                console.log('data: ', mod.data);
                console.log('\n');

                Mock.mock(requestUrl(mod.url), mod.type, mod.data);
                Mock.mock(new RegExp(mod.url, 'g'), mod.type, mod.data);
            }
        }
    }
}

// {
//     "code": 200,
//     "message": "操作成功",
//     "data": [{
//         "departmentId": 1,
//         "pDepartmentId": 0,
//         "departmentName": "总公司",
//         "status": 1,
//         "description": "",
//         "children": [{
//                 "departmentId": 2,
//                 "pDepartmentId": 1,
//                 "departmentName": "办公室",
//                 "status": 1,
//                 "description": "",
//                 "children": [{
//                     "departmentId": 36,
//                     "pDepartmentId": 2,
//                     "departmentName": "后勤部",
//                     "status": 1,
//                     "description": "",
//                     "children": []
//                 }]
//             },
//             {
//                 "departmentId": 3,
//                 "pDepartmentId": 1,
//                 "departmentName": "财务部",
//                 "status": 1,
//                 "description": "",
//                 "children": []
//             },
//             {
//                 "departmentId": 24,
//                 "pDepartmentId": 1,
//                 "departmentName": "组织部",
//                 "status": 1,
//                 "description": "管理部门",
//                 "children": []
//             },
//             {
//                 "departmentId": 37,
//                 "pDepartmentId": 1,
//                 "departmentName": "研发部",
//                 "status": 1,
//                 "description": "",
//                 "children": [{
//                         "departmentId": 39,
//                         "pDepartmentId": 37,
//                         "departmentName": "测试部",
//                         "status": 1,
//                         "description": "",
//                         "children": []
//                     },
//                     {
//                         "departmentId": 40,
//                         "pDepartmentId": 37,
//                         "departmentName": "运维部",
//                         "status": 1,
//                         "description": "",
//                         "children": []
//                     },
//                     {
//                         "departmentId": 41,
//                         "pDepartmentId": 37,
//                         "departmentName": "开发部",
//                         "status": 1,
//                         "description": "",
//                         "children": []
//                     }
//                 ]
//             }
//         ]
//     }]
// }