<template>
  <div class="tab-control">
    <!-- 因为该组件的自定义值基本都是相同，都是传入span，所以没必要使用插槽 -->
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 把数据传出去使用$emit
      this.$emit('tabClick',index)
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
  height: 2.5rem;
  line-height: 2rem;
}
.tab-control-item {
  flex: 1;
  

}
.tab-control-item span {
  padding: 2px;
}
.active {
  color: pink;
}
.active span {
  border-bottom: 3px solid pink;
}




</style>