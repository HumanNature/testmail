<template>
  <div class="profile">
    <nav-bar class="navbar">
      <div slot="center">我 的</div>
    </nav-bar>
    <me-list />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import MeList from './mechild/MeList'
export default {
  name: "Profile",
  components: {
    NavBar,
    MeList,

  },
};
</script>

<style scoped>
.navbar {
  background-color: pink;
  color: #fff;
  font-weight: bold;
}
</style>