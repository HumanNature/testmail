<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品列表 -->
      <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,

  },
  computed: {
    // 加入购物车的商品存放的数组
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    // ...mapGetters(['cartLength','cartList',])//用数组直接打印
    ...mapGetters({
      //用对象也可以直接打印，但可以自主命名
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: pink;
  color: #fff;
}

</style>