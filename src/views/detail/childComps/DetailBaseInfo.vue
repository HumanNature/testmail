<template>
  <div class="baseInfo" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <!-- 商品信息 -->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <del class="o-price">{{ goods.oldPrice }}</del>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <!-- 运送 -->
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div>
      <div class="services">
        <span v-for="index in goods.services.length - 1" :key="index">
          <img :src="goods.services[index - 1].icon" alt="" />
          <span>{{ goods.services[index - 1].name }}</span>
        </span>
      </div>
    </div>
    <!-- <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div> -->
    <!-- <div class="services">
      <span>退货补运费</span>
      <span>全国包邮</span>
      <span>7天无理由退货</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  components: {},
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
/* 商品信息 */
.baseInfo {
  margin-top: 0.5rem;
  padding: 0 1rem;
  border-bottom: 4px solid #eee;
}
.info-title {
  font-size: 15px;
  font-weight: bold;
}
.info-price {
  margin-top: 1rem;
}
.n-price {
  color: pink;
  font-size: 18px;
}
.o-price {
  color: #888;
  font-size: 10px;
  margin-left: 3px;
}
.discount {
  text-align: center;
  background-color: pink;
  color: #fff;
  border-radius: 8px;
  font-size: 12px;
  padding: 2px 5px;
  margin-left: 5px;
  position: relative;
  top: -8px;
}
.info-other {
  margin-top: 1.5rem;
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  border-bottom: 1px solid #eee;
}

.services {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  font-size: 12px;
}
.services img {
  width: 1rem;
  height: 1rem;
}
</style>