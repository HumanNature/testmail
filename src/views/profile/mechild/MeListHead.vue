<template>
  <div class="header">
      <div class="login">
        <img src="" alt="" />
        <span>登录/注册 ></span>
      </div>
      <div class="notice">
        <div class="notice-info notice-collect">
          <img class="notice-icon" src="" alt="" />
          <span>收藏夹</span>
        </div>
        <div class="notice-info notice-seller">
          <img class="notice-icon" src="" alt="" />
          <span>关注店家</span>
        </div>
        <div class="notice-info notice-record">
          <img class="notice-icon" src="" alt="" />
          <span>浏览记录</span>
        </div>
        <div class="notice-info notice-coupon">
          <img class="notice-icon" src="" alt="" />
          <span>优惠券</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'MeListHead'
}
</script>

<style scoped>
/* 头部 */
.header {
  height: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}
/* 登录 */
.login {
  flex: 1;
  height: 50%;
  display: flex;
  align-items: center;
  /* margin-left: 2rem; */
  padding-left: 1rem;
}
.login img {
  width: 3rem;
  height: 3rem;
  /* padding-right: 1rem; */
  margin-right: 1rem;
  border-radius: 5px;
}
/* 留意的内容 */
.notice {
  flex: 1;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notice-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notice-info span {
  font-size: 12px;
  color: #888;
}
.notice-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 5px;
}
</style>