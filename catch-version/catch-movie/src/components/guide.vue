<template>
  <div class="guide" :class="{'guide-version2':version2}">
    <!--<div class="d1"></div>-->
    <!--<img class="guideImg1" src="./../assets/guide/lingbi.png" alt=""/>-->
    <!--<img class="guideImg2" src="./../assets/guide/wawa.png" alt=""/>-->
    <div class="bg1"></div>
    <!--<img class="guideImg1" src="./../assets/guide/guideImg1.png" alt="">-->
    <img v-if="(gzh_operation.coupon && gzh_operation.coupon.status !=2) || (gzh_operation_other.task_count < gzh_operation_other.num) && guideNum != 2" class="guideImg1" :src="img1" alt="">
    <div v-else="" class="guideDiv1"></div>
    <div class="bg2"></div>
    <img v-if="activity_bounty.length>0 && activity_bounty[activity_bounty.length-1].voucher_batch.category === 0 && (!((gzh_operation.coupon && gzh_operation.coupon.status !=2) || (gzh_operation_other.task_count < gzh_operation_other.num)) || guideNum == 2)" class="guideImg2" src="./../assets/guide/wawa2.png" alt="">
    <img v-if="activity_bounty.length>0 && activity_bounty[activity_bounty.length-1].voucher_batch.category === 1 && (!((gzh_operation.coupon && gzh_operation.coupon.status !=2) || (gzh_operation_other.task_count < gzh_operation_other.num)) || guideNum == 2)" class="guideImg2" src="./../assets/guide/guideImg2.png" alt=""/>
    <div class="bg3"></div>
    <img @click="closeGuide" class="guideImg3" src="./../assets/guide/press_known.png" alt=""/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'guide',
    data(){
      return {
        img1:require('./../assets/guide/bg1-2.png'),
        img2:require('./../assets/guide/bg1-1.png'),
        guideNum:1
      }
    },
    mounted(){
      if(this.version2){
        this.img1 = this.img2;
      }
      this.guideNum = localStorage.getItem('guideNum') || 1
    },
    computed: mapState({
      gzh_operation: state => state.user.gzh_operation,
      activity_bounty:state => state.user.activity_bounty,
      gzh_operation_other:state => state.user.gzh_operation_other,
    }),
    methods:{
      closeGuide(){
        this.$store.commit('changeIsGuide',false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guide{
    width: 100%;
    height: 100%;
    /*background: url("./../assets/guide/yindao.png");*/
    /*background-size: 100% 100%;*/
    /*background: rgba(0,0,0,0.72);*/
    position: fixed;
    left: 0;
    top:0;
    z-index: 999;
    /*clip-path: polygon(0 0,0 100vh,100vw 100vh,100vw 53.8vh,71vw 53.8vh,71vw 47vh,83vw 47vh,83vw 53.8vh,100vw 53.8vh,100vw 0);*/
    /*clip-path: polygon(0 0,0 100vh,100vw 100vh,100vw 53.8vh,71vw 53.8vh,71vw 47vh,83vw 47vh,83vw 53.8vh,100vw 53.8vh,100vw 0);*/
    .bg1{
      width: 100%;
      /*height: 13%;*/
      height: calc(26.4% - 168px);
      min-height: 134px;
      background: url("./../assets/guide/bg.png");
      /*background: rgba(0,0,0,0.72);*/
    }
    .bg2{
      width: 100%;
      /*height: 22%;*/
      height: 19%;
      background: url("./../assets/guide/bg.png");
      /*background: rgba(0,0,0,0.72);*/
    }
    .guideDiv1{
      width: 100%;
      height: 168px;
      background: url("./../assets/guide/bg.png");
    }
    .bg3{
      width: 100%;
      height: 60%;
      /*height: calc(54.5% - 136px);*/
      background: url("./../assets/guide/bg.png");
      /*background: rgba(0,0,0,0.72);*/
    }
    .guideImg1{
      width: 750px;
      display: block;
      /*position: absolute;*/
      /*bottom:73%;*/
      /*left: 0;*/
      /*margin: 0 0 44px 0;*/
    }
    .guideImg2{
      width: 750px;
      display: block;
      /*position: absolute;*/
      /*left: 0;*/
      /*top:46%;*/
    }
    .guideImg3{
      width: 300px;
      position: absolute;
      bottom: 132px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .guide-version2{
    .bg1{
      height: calc(26.5% - 184px);
    }
    .guideDiv1{
      height: 184px;
    }
    }
</style>
