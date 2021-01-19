<template>
  <div class="melist">
    <me-list-head />
    <me-list-indent />
  </div>
</template>

<script>
import MeListHead from './MeListHead.vue';
import MeListIndent from './MeListIndent.vue';
export default {
  components: { MeListHead, MeListIndent },
  name: "MeList",
};
</script>

<style scoped>
/* 页面 */
.melist {
  height: 18rem;
  width: 100%;
  border: 1px solid lime;
}
</style>