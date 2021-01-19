<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script scoped>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  height: 3rem;
  line-height: 3rem;
  /* 这里不要在公共样式里设置背景颜色，你一设置其他组件里用的导航栏样式就固定了 */
  /* background-color: pink; */
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,.right{
    width: 4rem;
    /* background-color: lime; */
}
.center{
    flex: 1;
    text-align: center;
}
</style>