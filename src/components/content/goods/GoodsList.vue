<template>
  <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item" />
    <!-- {{ goods }} -->
    
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  components: { GoodsListItem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
    .goods{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>