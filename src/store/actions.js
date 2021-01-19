import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-type'

export default {
    addCart(context, payload) {
        return new Promise((resolve,reject)=>{
            // 需求: 实现购物车功能，添加多个商品，并且相同的商品只是数量增加
        // 实现:将一件衣服添加到数组cartList(购物车)，商品信息加一，如果添加2件就比较先后添加的商品的iid是否相等，
        // 相等则让数组里面的商品iid相等的商品数量加一,不相等则将商品添加到数组
        // let oldProduct = null;
        // 遍历item，功能相等于比较数组里的商品的iid，相等就加入oldProduct里面
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 判断oldProduct是否有值，有则里面的商品数量加一，没有就新添加到数组里(payload)
        if (oldProduct) {
            // oldProduct.count += 1;
            context.commit(ADD_COUNTER,oldProduct)
            resolve('当前商品数量加一')
        } else {
            payload.count = 1;
            // payload.checked = true
            // state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)
            resolve('添加新商品成功')   
        }
        })
    }
}
