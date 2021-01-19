<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentsScroll"
    >
      <!-- <div>{{$store.state.cartList.length}}</div> -->
      <!-- <div>{{ $store.state.cartList.length}}</div> -->
      <!-- <li v-for="(item, index) in $store.state.cartList" :key="index">
        {{ item }}
      </li> -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommends" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="message" :show="show" />
    <detail-bottom-bar @addCart="addToCart()" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";
import Toast from "../../components/common/toast/Toast.vue";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      show: false,
      message:'',
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // console.log("----");
      // 在图片渲染完之后才给themeTopYs添加数据(意思是图片渲染完后才能点击跳转)
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    // 获取点击导航栏的index
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    contentsScroll(position) {
      // 1.获取Y值
      const positionY = -position.y;
      // 2.把positionY值和themeTopYs值对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   // console.log(i);
      //   if (this.currentIndex !== i &&((i<length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     // console.log(i);
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.backTop是否回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    addToCart() {
      // console.log('11');
      // 1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品信息添加到Store中
      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product)  //在mutations里面调用
      this.$store.dispatch("addCart", product).then((res) => { //在actions里面调用
    // toast普通封装使用方式
       // this.show = true;
        // this.message = res;
        // // console.log(res);
        // setTimeout(()=>{
        //   this.show = false;
        //   // this.message = '';
        // },700)
    // toast插件封装方式
        this.$toast.show(res,700)
        // console.log(this.$toast);
      });
    },
  },
  created() {
    //   1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求响应数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取商店信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => { //DOM渲染出来后使用这个函数  //已废弃，建议使用imageLoad()的调用
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* .detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;rem
} */
.content {
  height: calc(100% - 7rem); /*上3rem  下3.5rem*/
}
</style>
