import axios from 'axios'
import {
    Message
} from 'element-ui'
const service = axios.create({
    // 设置超时时间
    timeout: 60000
})

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
    return config
}, (error) => {
    return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
    const responseCode = response.status
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status
    switch (responseCode) {
        // 404请求不存在
        case 404:
            Message({
                message: '网络请求不存在',
                type: 'error'
            })
            break
            // 其他错误，直接抛出错误提示
        default:
            Message({
                message: error.response.data.message,
                type: 'error'
            })
    }
    return Promise.reject(error)
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export default service