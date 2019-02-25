<template>
  <div class="tencent">
    <img src="https://effect.emailcar.net/zhuanke104-72-6/index.png" alt="">
    <!--<img :src="codeImg" alt="">-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'tencent',
    data(){
      return {
        codeImg:''
      }
    },
    mounted(){
      var userId = this.user.reality_id;
      userId = userId.toString(36);
      this.codeImg = 'http://api.datasuv.net/wesure/insure?m=MjRxN2J4c2F0&type=qrcode&user='+userId
      console.log(this.codeImg)
    },
    computed: mapState({
      user: state => state.user.user,
    })
  }
</script>

<style lang="scss" scoped="">
  .tencent{
    width: 100%;
    height: 100%;
    background: #efefef;
    img{
      height: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
