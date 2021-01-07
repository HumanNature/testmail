<template>
  <div class="recommend">
      <div class="recommend-box" v-for="(item,index) in recommends" :key="index">
          <a :href="item.link">
              <img :src="item.image" alt="">
          </a>
          <p>{{item.title}}</p>

      </div>    
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display: flex;
    font-size: 12px;
    padding: 1rem 0 2rem;
    border-bottom: 8px solid #eee;
}
.recommend-box{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.recommend-box img{
    width: 5.5rem;
    height: 5.5rem;
    margin-bottom: 0.5rem;
}
</style>