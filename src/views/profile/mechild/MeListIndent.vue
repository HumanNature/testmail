<template>
  <div class="indent">
    <div class="indent-all">
        <span>全部订单</span>
        <i>->></i>
    </div>
    <div class="indent-list">
      <div class="indent-list-info">
        <img src="" alt="" />
        <span>待付款</span>
      </div>
      <div class="indent-list-info">
        <img src="" alt="" />
        <span>待发货</span>
      </div>
      <div class="indent-list-info">
        <img src="" alt="" />
        <span>退还/售后</span>
      </div>
      <div class="indent-list-info">
        <img src="" alt="" />
        <span>评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeListIndent",
};
</script>

<style scoped>
.indent {
  height: 8rem;
  width: 100%;
  padding: 1rem 0.5rem;
}
.indent-list {
    height: 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* margin: 2rem 1rem; */
}
.indent-all {
  font-size: 12px;
  color: #888;
  padding: 0 1rem;
}
.indent-all i{
    float: right;
}
.indent-list-info {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.indent-list-info img {
  width: 2rem;
  height: 2rem;
}
</style>