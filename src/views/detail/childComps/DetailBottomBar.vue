<template>
  <div class="bottom-bar">
    <div class="commonLayout">
      <div>
        <i class="icon"></i>
        <span>收藏</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
    </div>
    <div class="commonLayout">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(event) {
      this.$emit("addCart");
      // console.log('点击添加购物车');
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  width: 100%;
  height: 4rem;
  background-color: #fff;

  display: flex;
  color: #888;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: lime;
  margin-bottom: 3px;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat;
  background-position: 0 0;
  background-size: 100%;
}
.shop {
  background-position: 0 -95px;
}
.service {
  background-position: 0 -50px;
}
.cart {
  font-size: 16px;
  background-color: #ffe339;
  color: #000;
}
.buy {
  background-color: pink;
  color: #fff;
  font-size: 16px;
}
.commonLayout {
  flex: 1;
  display: flex;
}
.commonLayout div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>