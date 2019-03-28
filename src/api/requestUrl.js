/**
 * 请求地址统一处理 / 组装
 */


export default function(actionName) {
    // 非生产环境 && 开启代理， 接口前缀统一使用[/proxyApi/]前缀做代理拦截！http://10.201.76.151:8084 http://10.200.199.251:7003 http://10.201.78.181:8085 http://10.200.42.222:8084'
    return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? 'http://localhost:3000/api' : '') + actionName
}
