<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods-item-info">
      <p :title="goodsItem.title">{{ goodsItem.title }}</p>
      <div>
        <span class="goodItem-price">{{ goodsItem.price }}</span>
        <span class="goodItem-sale">已售:{{ goodsItem.sale }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 50%;
  margin: 5px 0;
  text-align: center;
}
.goods-item img {
  width: 90%;
  border-radius: 5px;
  margin-bottom: 5px;
}
.goods-item-info p {
  padding:0 0.8rem;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* width: 12rem; */
}
.goods-item-info div {
  display: flex;
  justify-content: space-evenly;
}
.goodItem-price {
  color: pink;
  text-decoration: underline;
}
/* .goodItem-sale{
    font-size: 13px;
} */
</style>