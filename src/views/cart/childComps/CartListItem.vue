<template>
  <div class="cart-info">
    <div class="btn">
      <div class="btnclick" @click="checkClick()">
        <check-button :isChecked="itemInfo.checked"></check-button>
      </div>

      <!-- <check-button></check-button> -->
    </div>
    <div class="img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="cart-title">
      <p class="cart-title-top">
        <span>{{ itemInfo.title }}</span>
      </p>
      <p class="cart-title-center">
        <span>{{ itemInfo.desc }}</span>
      </p>
      <p class="cart-title-bottom">
        <span class="price">￥{{ itemInfo.price }}</span>
        <span class="number">X{{ itemInfo.count }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>

<style scoped>
.cart-info {
  width: 100%;
  display: flex;
  height: 9 rem;
  padding: 0.5rem 0.5rem;
  overflow: hidden;
  border-bottom: 2px solid #eee;
  /* box-shadow: 0 0 3px #888; */
}
.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 2rem; */
}
.btnclick {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  flex: 2.5;
  padding: 0 0.5rem;
}
.img img {
  width: 5.5rem;
  height: 7rem;
  border-radius: 5px;
}
.cart-title {
  flex: 8;
  display: flex;
  padding: 0 0.5rem;
  flex-direction: column;
  justify-content: space-around;
  min-width: 0;
}
.cart-title-top {
  font-size: 16px;
}
.cart-title-center {
  color: #888;
}
/* 解决用flex和省略号冲突的问题 */
.cart-title-top,
.cart-title-center {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cart-title-top,
.cart-title-center span {
  white-space: nowrap;
}
.price {
  font-size: 18px;
  color: red;
  font-weight: bold;
  float: left;
}
.number {
  font-size: 16px;
  float: right;
}
</style>