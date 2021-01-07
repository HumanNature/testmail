import {request} from './request';

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){ //通过网络请求获取type和page的数据，
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}