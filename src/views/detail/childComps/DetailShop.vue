<template>
  <div class="shop-info">
    <!-- 店铺名 -->
    <div class="shop-name">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <!-- 店铺信息 -->
    <div class="shop-sales">
      <div class="shop-sales-left">
        <div class="shop-sales-num">
          <span>{{ shop.sells | sellCountFilter }}</span>
          <span>总销量</span>
        </div>
        <div class="shop-goods-num">
          <span>{{ shop.goods }}</span>
          <span>宝贝</span>
        </div>
      </div>
      <div class="shop-sales-right">
        <table>
          <tr v-for="(item, index) in shop.core" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 店铺里面 -->
    <div class="enter-info">
      进店逛逛
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
/* 商家 */
.shop-info {
  width: 100%;
  /* height: 15rem; */
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-bottom: 4px solid #eee;
}
/* 商家名 */
.shop-name img {
  width: 4rem;
  height: 4rem;
  border: 1px solid #eee;
  border-radius: 2rem;
}
.shop-name span {
  margin-left: 0.5rem;
  color: #666;
  font-size: 16px;
}
/* 商家信息 */
.shop-sales {
  display: flex;
  margin-top: 20px;
}
/* 左 */
  .shop-sales-left {
    flex: 1;
    display: flex;
    align-items: center;
    border-right: 1px solid #eee;
  }
  .shop-sales-left div {
    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 1;
  }
  .shop-sales-num span:nth-child(1){
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .shop-goods-num span:nth-child(1){
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  /* 右 */
  .shop-sales-right {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 13px;
  }
  .shop-sales-right table tr{
    margin-bottom: 8px;
  }
  .shop-sales-right td {
    padding: 3px 5px;
    margin-bottom: 8px;
  }
  /* 绿红高低 */
  .shop-sales-right .score {
    color: #5ea732;
  }

  .shop-sales-right .score-better {
    color: #f13e3a;
  }

  .shop-sales-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-sales-right .better-more span {
    background-color: #f13e3a;
  }
  /* 进店逛逛 */
.enter-info {
  width: 10rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 16px;
  text-align: center;
  background-color: #eee;
  margin:  0 auto;
  margin-top: 25px;
  border-radius: 8px;
}
</style>