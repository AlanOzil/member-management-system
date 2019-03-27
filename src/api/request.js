import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
    timeout: 1000 * 30,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// request 拦截器
service.interceptors.request.use(config => {
    config.headers['token'] = Vue.cookie.get('token');
    return config
}, error => {
    return Promise.reject(error);
})

// response 拦截器
service.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) {
        Vue.cookie.delete('token');
        router.push({ name: 'login' });
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default service
