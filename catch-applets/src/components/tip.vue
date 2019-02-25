<template>
  <div class="tip" v-if="tipContent.isShow">
    <div class="bg" :class="{'twoContent':tipContent.content.length>1}">
      <div class="tipmain">
        <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="close" mode="widthFix">
        <img :src="tipContent.imgSrc" alt="" mode="widthFix">
        <div class="content">
          <p v-for="(item,index) in tipContent.content" :key="index">{{item}}</p>
        </div>
        <button @click="tipButton" plain="true">{{tipContent.button}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"tip",
    props:['tipContent'],
    methods:{
      close(){
        this.$store.commit('changeTipContent',{isShow:false});
        this.page.aldstat.sendEvent('关闭错误提示弹窗');
      },
      tipButton(){
        this.$emit('tipButton');
      }
    }
  }
</script>


<style scoped>
  .tip{
    width: 100%;
    height: 100%;
  }
  .tip .bg{
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.72);
    z-index: 999;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .tip .bg .tipmain{
    width: 6.22rem;
    padding: 0.76rem 0.33rem;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    margin: 0.4rem 0 0 0;
  }
  .tip .bg .tipmain img{
    width: 100%;
  }
  .tip .bg .tipmain .content{
    margin: 0.47rem 0 0.49rem 0;
  }
  .tip .bg .tipmain p{
    font-size: 0.4rem;
    color: #353535;
    text-align: center;
    line-height: 0.64rem;
  }
  .tip .bg .tipmain button{
    width: 100%;
    height: 1rem;
    border: none;
    outline: none;
    font-size: 0.36rem;
    color: #fff;
    text-shadow: 2px 2px 3px #cd1d00;
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
    background-size: 100% 100%;
  }
  .tip .bg .tipmain img.close{
    width: 0.84rem;
    height: 0.84rem;
    float: right;
    margin: -2rem -0.33rem 0 0;
  }

  .tip .twoContent .tipmain{
    padding: 0.76rem 0.33rem 0.82rem 0.33rem;
  }
  .tip .twoContent .tipmain .content{
    margin: 0.45rem 0 ;
  }



</style>

