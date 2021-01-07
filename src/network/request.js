import axios from 'axios';

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    return instance(config)

}
// http://123.207.32.32:8000
// baseURL = "http://152.136.185.210:7878/api/m5" 
// https://api.ixiaowai.cn/tgrj/index.php  笑话api

// export function request2(config) {
//     // 1.创建axios实例
//     const instance1 = axios.create({
//         baseURL: 'https://api.ixiaowai.cn',
//         timeout: 5000
//     })

//     return instance1(config)

// }
