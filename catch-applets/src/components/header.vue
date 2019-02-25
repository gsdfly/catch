<template>
  <div class="header">
    <div >
      <div class="head-portrait">
        <img @longpress="clearToken" v-if="user.avatar" :src="user.avatar" alt="" style="border-radius: 50%" mode="widthFix">
        <img @longpress="clearToken" v-else="" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_portrait.png" alt="" mode="widthFix">
        <p>{{user.player_id}}</p>
      </div>
      <div class="header-main">
        <h4 :class="{'isHide':!isMachine_no}">当前机器号：<span>{{machine_no}}</span></h4>
        <div class="game game-coins">
          <div>
            <i class="icon-jinbi"></i><span class="coins-num">{{user.coins}}</span>
          </div>
        </div>
        <div class="game game-quan" v-show="user.game_ticket>0">
        <i class="iconfont icon-quan"></i>
          <span>免费券:</span><span class="coins-num">{{user.game_ticket}}</span>
        </div>
        <div class="kefu" @click="support">
          <p id="support"  @click="showKefu">
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_kefu.png" alt=""   mode="widthFix"><span>客服</span>
          </p>
          <!--<img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_kefu.png" alt=""-->
               <!--mode="widthFix"><span>客服</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name:'header',
    computed: mapState({
      user: state => state.user.user,
      machine_no: state => state.user.machine_no
    }),
    props:['isMachine_no'],
    methods:{
      test(){
        console.log('2222')
      },
      support() {
//        this.$emit('showKefu')
        wx.makePhoneCall({
          phoneNumber: '0755-32904117' //仅为示例，并非真实的电话号码
        })
        this.page.aldstat.sendEvent('点击客服');
      },
      clearToken(){
        console.log('clearToken')
        wx.removeStorage({key:'token_x'});
      }
    }
  }

</script>

<style>
  .isHide{
    visibility: hidden;
  }
  i{
    display: inline-block;
  }
  .header {
    width: 100%;
    height: 12%;
    min-height: 1.4rem;
    position: relative;
  }

  .header > div {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 0 0 0.22rem;
    height: 1.12rem;
  }

  .header .head-portrait {
    width: 1.02rem;
    height: 1.02rem;
    background: #feccbc;
    border-radius: 50%;
    position: relative;
    margin: -0.1rem 0 0 0;
    z-index: 999;
  }

  .header .head-portrait p {
    position: absolute;
    left: -0.05rem;
    bottom: -0.18rem;
    text-align: center;
    background: url("http://res.catchme.com.cn/imgs-2018-02-05/bg_id.png") no-repeat;
    background-size: 100% 100%;
    width: 1.12rem;
    height: 0.35rem;
    line-height: 0.35rem;
    font-size: 0.2rem;
    color: #a65a4e;
  }

  .header .head-portrait img {
    width: 0.98rem;
    height: 0.98rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .header .header-main {
    width: 100%;
    padding: 0 0.22rem 0 1.4rem;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header .header-main h4 {
    /*font-size: 0.24rem;*/
    font-size: 0.22rem;
    color: #ffe7e0;
    line-height: 0.44rem;
  }

  .header .header-main .game{
    height: 0.62rem;
    padding: 0 0.22rem;
    line-height: 0.62rem;
    border-radius: 0.31rem;
    background: #fff2ee;
    float: left;
    position: relative;
    text-align: center;
  }
  .header .header-main .game>div{
    min-width: 1.6rem;
    height: 0.62rem;
  }
  .header .header-main .game i {
    font-size: 0.4rem;
    color: #fe5f5b;
    font-weight: 500;
    text-align: center;
  }
  .header .header-main .game i.icon-jinbi {
    width: 0.32rem;
    height: 0.36rem;
    line-height: 0.62rem;
    display: inline-block;
    background: url(http://res.catchme.com.cn/imgs-2018-04-10/icon_portrait_bi.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0;
  }
  .header .header-main .game span {
    font-size: 0.28rem;
    color: #fe5f5b;
    display: inline-block;
  }
  .header .header-main .game span.coins-num {
    font-size: 0.36rem;
    color: #fe5f5b;
    font-weight: 600;
    margin: 0 0 0 0.1rem;
    position: relative;
  }

  .header .header-main .game-quan {
    margin: 0 0 0 0.2rem;
  }

  .header .header-main .kefu {
    height: 0.62rem;
    background: #fff2ee;
    position: absolute;
    right: 0;
    line-height: 0.62rem;
    padding: 0 0.22rem;
    border-radius: 0.15rem 0 0 0.15rem;
  }
  .header .header-main .kefu>p {
    width: 100%;
    height: 100%;
    line-height: 0.62rem;
  }
  .header .header-main .kefu p>img {
    width: 0.5rem;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .header .header-main .kefu>p>span {
    color: #fd643b;
    font-size: 0.28rem;
    height: 0.28rem;
    margin: 0 0 0 0.55rem;
    vertical-align: top;
  }
</style>
