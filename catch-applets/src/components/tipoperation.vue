<template>
  <div class="tipoperation" v-show="show_tip_operation.isShow"  @click="closeBg">
    <div class="tipoperation-center">
      <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" mode="widthFix">
      <img @click.stop="tipAction" class="tipcontent"  :src="show_tip_operation.tipObj.image" alt="" mode="widthFix">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'tipoperation',
    computed: mapState({
      show_tip_operation: state => state.user.show_tip_operation,
    }),
    methods:{
      closeBg(){
        this.$store.commit('changeShowTipOperation',{isShow:false,tipObj:{}});
      },
      tipAction(){
        switch (this.show_tip_operation.tipObj.action){
          case "1": wx.navigateToMiniProgram({
            appId:this.show_tip_operation.tipObj.url,
            fail:function (err) {
              console.log(err);
            }
          });break;
          case "2": wx.navigateTo({
            url:"../web/web?url="+this.show_tip_operation.tipObj.url
          });this.$store.commit('changePayBack',true); this.$store.commit('changeShowTipOperation',{isShow:false,tipObj:{}});break;
          case "3":wx.showToast({title:this.show_tip_operation.tipObj.url,icon:'none'});break;
        }
      }
    }
  }
</script>

<style scoped>
  .tipoperation{
    width: 100%;
    height: 100%;
    position: fixed;
    left:0;
    top:0;
    background: rgba(0, 0, 0, 0.72);
    padding: 0 0.64rem;
    z-index: 999;
  }
  .close{
    position: absolute;
    top:-1.4rem;
    right: 0.64rem;
    width: 0.82rem;
    height: 0.82rem;
  }
  .tipoperation-center{
    width: 100%;
    padding: 0 0.64rem;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
  }
  .tipcontent{
    width: 100%;
    /*width: calc(100% - 1.28rem);*/
    /*padding: 0 0.64rem;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*top:50%;*/
    /*transform: translate(-50%,-50%);*/
    /*border-radius: 5px;*/
  }
</style>
