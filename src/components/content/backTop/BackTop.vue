<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      
    },
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    bottom: 5rem;
    right: 1.5rem;

    z-index: 9;

    width: 3.5rem;
    height: 3.5rem;
  }

  .back-top img {
    width: 100%;
  }
</style>