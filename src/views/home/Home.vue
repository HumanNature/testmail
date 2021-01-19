<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
      >
      </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperItemLoad="swiperItemLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-individuality></home-individuality>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </tab-control>
      <!-- 这下面通过v-bind绑定goods把网络请求的数据list遍历在goodslist上，在自定义点击事件上绑定当前焦点下所调用的状态 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
ustbhuangyi.github.is/better-scroll/doc/zh-hans/#起步
<script>
import HomeSwiper from "./homechild/HomeSwiper";
import RecommendView from "./homechild/RecommendView.vue";
import HomeIndividuality from "./homechild/HomeIndividuality.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

import { debounce } from "../../commom/utils";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    HomeIndividuality,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 定义一个变量保存网络请求来的数据
      // resuit:null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 默认当前类型为pop
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 618,  //iphone6/7/8
      isTabFixed:false,
      saveY:0,
    };
  },
  //计算属性
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log(111);
  },
  activated() {  //activated: 是在被包裹组建被激活的状态下使用的生命周期钩子
    //滚动完后做一次刷新
    this.$refs.scroll.refresh()
    // 保存之前滚动的位置信息
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
  deactivated() { //deactivated：在被包裹组件停止使用时调用
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);  //测试滚动距离
  },
  // 组件创建完后调用生命周期
  created() {
    //created里面尽量写简单的代码,一般在系统级别的接口里面只表达做了什么，不写具体细节，这就是封装逻辑
    // 1.从接口请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      // console.log("------");
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  methods: {
    //因为我封装了方法，所以我可以调用这个方法三次，也就是请求到pop,new,sell

    // 下面是事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    contentscroll(position) {
      // 1.判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶(position：Fixed)
      this.isTabFixed = (-position.y) >this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperItemLoad() {
      // 获取TabControl的OffsetTop
      // 所以的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    //下面是网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.resuit =res
        (this.banners = res.data.data.banner.list),
          (this.recommends = res.data.data.recommend.list),
          (this.dKeywords = res.data.data.dKeyword.list),
          (this.keywords = res.data.data.keywords.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list); //在goods对象下type中的list拼接(push) ...意思是把数据一个个解析到list里面
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishedPullUp();
        // 注释:
        // 问题:使用better-scroll会有一个设计bug，就是你异步操作加载更多数据的时候，页面会卡住，明明下面有内容，但你滚不下去;
        // 原因:因为使用better-scroll要先定义一个高度，当你的网络环境不良的时候，加载的数据没第一时间渲染出来，它的滚动条只能加载
        // 未渲染出来数据之前的高度,因为渲染出数据会把原来的高度撑开，而bs只能给你你之前定义的高度，所以会出现上面的bug
        // 解决办法: refresh()   该方法可以重新计算bs的高度
        // 所以: 第一:监听图片加载完成时    第二调用refresh()方法
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: pink;
  font-weight: bold;
  position: relative;
  color: #fff;
  z-index: 9;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  /* height: 300px; */
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 3rem;
}
</style>