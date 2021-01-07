<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <home-individuality></home-individuality>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick">
    </tab-control>
    <!-- 这下面通过v-bind绑定goods把网络请求的数据list遍历在goodslist上，在自定义点击事件上绑定当前焦点下所调用的状态 -->
    <goods-list :goods="showGoods" />
  </div>
</template>
ustbhuangyi.github.is/better-scroll/doc/zh-hans/#起步
<script>
import HomeSwiper from "./homechild/HomeSwiper";
import RecommendView from "./homechild/RecommendView.vue";
import HomeIndividuality from "./homechild/HomeIndividuality.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from 'components/content/goods/GoodsList.vue';

import { getHomeMultidata, getHomeGoods } from "../../network/home";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    HomeIndividuality,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      // 定义一个变量保存网络请求来的数据
      // resuit:null
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      // 默认当前类型为pop
      currentType:'pop'
    };
  },
  //计算属性
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  // 组件创建完后调用生命周期
  created() {
    //created里面尽量写简单的代码,一般在系统级别的接口里面只表达做了什么，不写具体细节，这就是封装逻辑
    // 1.从接口请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {  //因为我封装了方法，所以我可以调用这个方法三次，也就是请求到pop,new,sell

    // 下面是事件监听相关的方法
    tabClick(index){
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop' 
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
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
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then((res) => {
        // console.log(res);
        console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list) //在goods对象下type中的list拼接(push) ...意思是把数据一个个解析到list里面
        this.goods[type].page += 1
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 2.5rem;
}
.home-nav {
  /* height: 2.5rem; */
  background-color: pink;
  font-weight: bold;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 2.5rem;
  z-index: 9;  

}
</style>