<template>
  <div id="J_page" class="am-bg">
    <div class="errorImg">
      <img src="https://i.alipayobjects.com/i/ecmng/png/201411/3t2rgekI8D.png" width="105">
    </div>
    <p class="tipText">请使用天猫APP扫码打开</p>
  </div>
</template>

<script>
import CONFIG from './../config'
import {getParamByName} from './../util/index'
export default {
  name:'tmalltip',
  mounted(){
    if(CONFIG.isWx){
      setTimeout(()=>{
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tmall.wireless'
      },1500)
    }else {
      setTimeout(()=>{
        window.location.href = 'https://pages.tmall.com/wow/portal/act/app-download'
      },1500)
    }
  }
}
</script>

<style scoped>
  .am-bg{background: #efeff4;height: 100%;padding-bottom: 0px!important;}
  .errorImg{padding:120px 0px 70px;text-align: center;}
  .tipText{font-size: 34px;color: #333;text-align: center;}
</style>
