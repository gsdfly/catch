<template>
  <div class="guide2" :class="{'guide2-version2':version2}">
    <div class="top"></div>
    <img v-if="activity_bounty[activity_bounty.length-1].voucher_batch.category === 0" class="tip" src="http://res.catchme.com.cn/activity/guide/tip2.png" alt="">
    <img v-else class="tip" src="http://res.catchme.com.cn/activity/guide/tip1.png" alt="">
    <div class="bottom"></div>
    <img @click="closeGuide2" class="btn" src="./../assets/guide/press_iknown.png" alt="">
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'guide2',
    computed: mapState({
      activity_bounty:state => state.user.activity_bounty,
    }),
    methods:{
      closeGuide2(){
        this.$emit('closeGuide2')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guide2{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    z-index: 999;
    .tip{
      width: 100%;
      display: block;
    }
    .btn{
      width: 300px;
      height: 80px;
      position: absolute;
      left: 50%;
      bottom: 132px;
      transform: translateX(-50%);
    }
    .top{
      width: 100%;
      height: 39%;
      background: url("./../assets/guide/bg2.png");
    }
    .bottom{
      width: 100%;
      height: 60%;
      background: url("./../assets/guide/bg2.png");
    }
  }
  .guide2-version2{
    .top{
      height: 39.5%;
    }
  }
</style>
