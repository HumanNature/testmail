<template>
  <div class="bar">
    <div class="bar-left">
      <div class="btn" @click="CheckClick">
        <check-button :is-checked="isCheckedAll" ></check-button>
        <span>全选</span>
      </div>
      <span class="price">合计: {{ totalPrice }}</span>
    </div>
    <div class="bar-right" @click="calcClick">
      <div>去结算({{ checkLength }})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      // 返回存放商品的数组里的数据进行过滤
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            // 返回数组中checked为true的数，也就是选中的商品
            return item.checked;
            // preValue:前一个值  item:剩下的值
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      ); //toFixed(2) 保留2位小数点
    },
    checkLength() {
      // 返回数组中选中的商品的数组长度
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isCheckedAll() {
      // 要求:未添加商品时全选按钮显示未选中状态
      // 方案: 用if判断商品数组长度是否为空，空则返回false
      if(this.$store.state.cartList.length === 0) return false 
      // 要求:推算出只要有一个商品未选中则全选按钮为false，也就是全选按钮为不选中状态
      // 方案一:返回数组中不选中的商品的数组长度 {filter((item) => !item.checked).length;} 并且只要有不选中的商品就返回false { return !(this.....) }
      // PS:数组取反为false
      // return !(this.$store.state.cartList.filter((item) => !item.checked).length)
      // 方案二: 用find查找商品数组中只要有一个未选中的商品就返回false
      return !this.$store.state.cartList.find(item => !item.checked)
    },
  },
  methods: {
    CheckClick(){
      // 要求:点击全选按钮实现全选和全不选，并且，有部分商品选中全选按钮也显示全不选
      // 方案:使用上面的isCheckedAll计算属性，通过if判断全选和全不选
      if(this.isCheckedAll){ //商品一添加进来就是选中的状态，所以当前isCheckedAll为true 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)  //全不选
      }else{  //有部分或者全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isCheckedAll){
        this.$toast.show('请选择购买的商品',700)
      }
    }
  },
};
</script>

<style scoped>
.bar {
  position: absolute;
  bottom: 3.6rem;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: #eee;
  /* background-color: red; */
  box-shadow: 0 -2px 5px #bbb;
  display: flex;
}
.bar-left {
  flex: 5;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}
.bar-left span {
  padding-left: 5px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.price {
  margin-left: 1rem;
}
.bar-right {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: #fff;
}
.bar-right div {
}
</style>