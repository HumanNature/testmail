<template>
    <swiper class="image">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img class="img" :src="item" alt="" />
      </swiper-item>
    </swiper>
</template>
<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.image {
  height: 25rem;
  overflow: hidden;
}
/* .img {
  height: 25rem;
  object-fit: fill;
  object-fit: contain;
  object-fit: scale-down;
} */
</style>