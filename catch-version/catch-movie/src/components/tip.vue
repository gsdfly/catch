<template>
  <div class="tip" v-if="tipContent.isShow">
    <div class="bg" :class="{'twoContent':tipContent.content.length>1}" @click="close">
      <div class="main" @click.stop="">
        <div>
          <img :src="tipContent.imgSrc" alt="">
          <div class="content">
            <p v-for="item in tipContent.content">{{item}}</p>
          </div>
          <button @click="tipButton">{{tipContent.button}}</button>
        </div>
        <img src="./../assets/small/icon_close.png" alt="" class="close" @click="close">
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
      },
      tipButton(){
        this.$emit('tipButton');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tip{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .tip .bg{
    /*position: fixed;*/
    background: rgba(0, 0, 0, 0.72);
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .tip .bg .main{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    >div{
      width: 622px;
      /*width: 100%;*/
      padding: 76px 33px;
      background: #fff;
      border-radius: 5px;
      /*margin: 40px 0 0 0;*/
    }

  }
  .tip .bg .main img{
    width: 100%;
  }
  .tip .bg .main .content{
    margin: 47px 0 49px 0;
  }
  .tip .bg .main p{
    font-size: 40px;
    color: #353535;
    text-align: center;
    line-height: 64px;
  }
  .tip .bg .main button{
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    font-size: 36px;
    color: #fff;
    text-shadow: 2px 2px 3px #cd1d00;
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
    background-size: 100% 100%;
  }
  .tip .bg .main img.close{
    width: 84px;
    height: 84px;
    margin: 40px 0 0 0;
    /*float: right;*/
    /*margin: -200px -33px 0 0;*/
  }

  .tip .twoContent .main>div{
    padding: 76px 33px 82px 33px;
  }
  .tip .twoContent .main .content{
    margin: 45px 0 ;
  }



</style>
