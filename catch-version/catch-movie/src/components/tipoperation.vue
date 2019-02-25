<template>
  <div class="tipoperation" v-show="show_tip_operation.isShow"   @click="closeBg">
    <div class="tipoperation-center">
      <img @click.stop.prevent="tipAction" class="tipcontent"  :src="show_tip_operation.tipObj.image" alt=""/>
      <img src="./../assets/small/icon_close.png" alt="" class="close"/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Toast  from 'mint-ui/lib/Toast'

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
        console.log(this.show_tip_operation.tipObj)
          switch (this.show_tip_operation.tipObj.action){
            case "2":window.location.href = this.show_tip_operation.tipObj.url; localStorage.setItem('isLinkOut','true');break;
            case "3":Toast({message:this.show_tip_operation.tipObj.url,position:'bottom'});
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
    padding: 0 64px;
    z-index: 999;
  }
  .tipoperation-center{
    width: 100%;
    padding: 0 64px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
  }
  .close{
    width: 82px;
    height: 82px;
    display: block;
    margin: 40px auto 0 auto;
  }
  .tipcontent{
    width: 100%;
  }

</style>
