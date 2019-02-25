<template>
    <div class="jo-index" :class="{'jo-version2':version2}">
      <div v-show="showHtml">
        <pageHeader></pageHeader>

        <div class="activitys">
          <quanprogress ref="quanprogress"   :showHtml="showHtml" :cinemaInfo="cinemaInfo" @openTip="openTip" @getVoucherLength="getVoucherLength"></quanprogress>
        </div>

        <pagemain ref="pagemain" :showHtml="showHtml" @getFallback="getFallback"></pagemain>

        <div class="footer">
          <joPay ref="joPay" :showHtml="showHtml" @alertTip="changeTip" @changeBgShow="changeBgShow" @handleScanQRCode="handleScanQRCode"
                 @closeBg="closeBg"></joPay>
        </div>
        <div class="bg" v-show="bgShow">
          <div class="bg-center2" v-show="contentShow == 'infinity'">
            <img  src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/infinity.png" alt="" mode="widthFix">
            <button class="btnTip bg-center-btn2" @click="closeBg" plain="true"></button>
          </div>

          <div class="bg-center4" v-show="contentShow == 'activityTip'">
            <div v-if="cinemaInfo.price === 30" class="bgTip1" @click="closeBg"></div>
            <div v-else="" class="bgTip2" @click="closeBg"></div>
          </div>

          <div class="bg-center5" v-show="contentShow == 'activityRule'">
            <img class="center-main" src="http://res.catchme.com.cn/imgs-2018-02-06/2/rule_bg.png" alt="" mode="widthFix">
            <ul>
              <li><span></span>
                <p>投币抓娃娃。</p></li>
              <li><span></span>
                <p>若抓中，即可立即获得一张观影小食兑换券，到服务台免费兑换{{cinemaInfo.goodsName}}。</p></li>
              <li><span></span>
                <p>若未抓中，获得一颗星星，连续未抓中，并攒够11颗，即可得1张同上的观影小食兑换券。兑换券颗累计使用。</p></li>
              <li><span></span>
                <p>每一次抓中后，该阶段集攒的星星会被清空。</p></li>
              <li><span></span>
                <p>该兑换券仅限在{{cinemaInfo.name}}内使用。</p></li>
              <li><span></span>
                <p>本活动最终解释权归深圳市我抓科技有限公司所有。</p></li>
            </ul>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
          </div>

          <div class="bg-center6" v-show="contentShow == 'notExchange'">
            <img class="center-main" src="http://res.catchme.com.cn/imgs-2018-02-06/2/quan_nothing.png" alt="" mode="widthFix">
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
            <p class="bg-center6-p">攒够星星即可获得一张<br/>价值{{cinemaInfo.price}}元的单人观影套餐小食兑换券</p>
          </div>

          <div class="bg-center7" v-show="contentShow == 'exchange'">
            <img class="center-main-img" src="http://res.catchme.com.cn/imgs-2018-02-06/2/quan_bg.png" alt="" mode="widthFix">
            <div class="center centeres"  @scroll="addEventScroll($event)" scroll-x=true :style="centeresStyle">
              <div class="center-main" :style="centerMainStyle">
                <div class="coupon" v-for="(item,index) in userProgress.voucher_list" :key="index">
                  <h3>{{item.title}}</h3>
                  <h4>{{item.content}}</h4>
                  <p>有效期至：{{item.expire}}</p>
                  <div class="exchange-code" v-if="item.type===1">
                    <p>兑换码</p>
                    <h2>{{item.code}}</h2>
                  </div>
                  <div class="exchange-code" v-else="">
                    <canvas :canvas-id="item.code"></canvas>
                    <p>{{item.code}}</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="page-num">{{pageIndex}}/<span>{{userProgress.voucher_list.length}}</span></p>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
          </div>
        </div>
      </div>
      <tip :tipContent="tipContent" @tipButton="tipButton"></tip>
    </div>
</template>

<script>
  import wxbarcode from 'wxbarcode'
  import {mapState} from 'vuex'
  import {getParamByName} from './../../utils/index'
  import tip from '@/components/tip'
  import joPay from '@/components/wxpay2'
  import CONFIG from './../../config/index'
  import pageHeader from '@/components/header'
  import pagemain from '@/components/main'
  import quanprogress from '@/components/quanprogress'

  export default {
    name:'baodi',
    data(){
      return {
        showHtml: false,
        pageIndex: 1,
        bgShow: false,
        contentShow: '',
        cinemaInfo: {
          name: '北京耀莱影城马连道店',
          price: 30,
          goodsName: '46oz爆米花+16oz可乐'
        },
        version2:this.version2,
        centerMainStyle:"",
        centeresStyle:'',
      }
    },
    components: {
      tip,
      joPay,
      pageHeader,
      pagemain,
      quanprogress
    },
    beforeMount(){
      console.log('baodi beforeMount')
      wx.showLoading({"title": '加载中'});
    },
//    onShow() {
//        console.log('baodi onShow')
//        var url = unescape(this.$root.$mp.query.q);
//      url = 'http://www.5zhua.cn/catch/?machine=CATCH_100024'
//      if (url.indexOf('catchme') !== -1) {
//        CONFIG.url = 'http://front.catchme.com.cn/'
//      }
//      var machine_no = getParamByName('machine', url);
//      CONFIG.machine_no = machine_no;
//      this.$store.commit('setMachineNo');
//    },
    onPullDownRefresh:async function(){
      await this.init();
      wx.stopPullDownRefresh();
      console.log('下拉刷新');
    },
    mounted() {
      console.log('baodi mounted')
      if (this.isLogin) {
        this.init();
      }
    },
    computed: {
      ...mapState({
        tipContent: state => state.user.tipContent,
        isLogin: state => state.user.isLogin,
        userProgress: state => state.user.user_progress,
      })
    },
    methods:{
      changeTip() {
        this.bgShow = true;
        this.contentShow = 'infinity';
        this.$refs.pagemain.infinityState();
      },
      getFallback(gameNum){
        this.$refs.quanprogress.getFallback(gameNum);
      },
      closeBg() {
        this.bgShow = false;
      },
      addEventScroll(event){
        var query = wx.createSelectorQuery();
        query.select('.coupon').boundingClientRect()
        query.exec(function (res) {
          //res就是 所有标签为mjltest的元素的信息 的数组
//          console.log(res);
          //取高度
//          console.log(typeof res[0].width);
          this.pageIndex = Math.round(event.target.scrollLeft/res[0].width)+1;
        }.bind(this))
      },
      init() {
        return new Promise((success,err)=>{
          Promise.all([
            this.$store.dispatch('judgeMachine'),
            this.$store.dispatch('getUser'),
            this.$store.dispatch('getCoinList'),
            this.$store.dispatch('getUserProgress')
          ]).then((results)=>{
            console.log('保底抓请求成功')
            this.showHtml = true
            wx.hideLoading()
            this.$refs.quanprogress.setVoucher(results[3].voucher_list.length);
            this.getVoucherLength(results[3].voucher_list.length);
            switch (results[0].site_id) {
              case 50 :
                this.cinemaInfo.name = '北京耀莱影城马连道店';
                break;
              case 5 :
                this.cinemaInfo.name = 'Jackie Chan北京耀莱';
                break;
              case 196 :
                this.cinemaInfo.name = '北京耀莱成龙国际影城西红门店';
                break;
              case 91 :
                this.cinemaInfo = {name: '完美世界影城', price: 18, goodsName: '32oz爆米花+12oz可乐'};
                break;
            }
            success()
          }).catch((error)=>{
            console.log(error);
            wx.hideLoading()
            err()
          })
        })

      },
      tipButton() {
        if (this.tipContent.button === '扫码换机') {
          this.$refs.pagemain.handleScanQRCode();
        } else {
          this.$store.commit('changeTipContent', {isShow: false});
        }
      },
      openTip(value) {
        this.bgShow = true;
        this.contentShow = value;
      },
      getVoucherLength(value){
        if(value>1){
          this.centerMainStyle =  'width:'+594*value+'rpx;';
          this.centeresStyle = 'width:615rpx';
        }
      },
    },
    watch: {
      userProgress() {
        for(var item of this.userProgress.voucher_list){
          if(item.type === 2){
           wxbarcode.barcode(item.code, item.code, 400, 80);
          }
        }
      },
//      isLogin() {
//        this.init();
//      }
    }
  }
</script>

<style scoped>
  canvas{
    width: 4rem;
    height: 0.8rem;
    display: inline-block;
  }
  .bg-center6 .bg-center6-p{
    position: absolute;top:68%;width: 100%;font-size: 0.3rem;color: #6b6b6b;line-height: 0.5rem
  }
  .bg-center6 .center-main{
    position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);width: 90%;padding: 0 0 0 0.4rem;
  }
  .bg-center2>img{
    width: 100%;margin: 0.34rem 0 0 0
  }
  .center{
    overflow: auto;
    /*width: 82%;*/
    width: 5.76rem;
    /*padding: 0 0 0 0.15rem;*/
  }
  .center-main{
    width: 5.76rem;
    height: 100%
  }
  .center-main>div:last-of-type{
    margin: 0!important;
  }
  .exchange-code{
    padding: 0.25rem 0
  }
  .exchange-code>div {
    width: 100%;
    height: 100%;
  }
  .exchange-code>div svg{
    height: 100% !important;
  }
  .bg-center4 {
    width: 100%;
    height: 100%;
  }

  .bg-center4 > div {
    width: 100%;
    height: 100%;
  }

  .bg-center4 .bgTip1 {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/tip1.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center4 .bgTip2 {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/tip2.png") no-repeat;
    background-size: 100% 100%;
  }

  .close {
    right: 0.6rem;
    top: 4%;
    position: absolute
  }

  .coupon {
    width: 5.86rem;
    height: 100%;;
    background: url('http://res.catchme.com.cn/imgs-2018-02-06/2/quan.png') no-repeat;
    background-size: 100% 100%;
    padding: 0.24rem 0 0 0;
  }

  .exchange-code {
    width: 100%;
    height: 1.58rem;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
  }

  .exchange-code img {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .bg-center7 .center-main-img{
    position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);width: 90%;padding: 0 0 0 0.5rem
  }
  .bg-center7  .page-num {
    font-size: 0.3rem;
    color: #494949;
    position: absolute;
    right: 1rem;
    bottom: 18%;
  }

  .bg-center7  .page-num span {
    font-size: 0.24rem;
  }

  .bg-center7 .center {
    width: 5.76rem;
    height: 5.49rem;
    position: absolute;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
  }

  .bg-center7 .center h3 {
    font-size: 0.34rem;
    color: #494949;
    line-height: 0.34rem;
  }

  .bg-center7 .center h4 {
    font-size: 0.28rem;
    color: #494949;
    margin: 2.26rem 0 0.16rem 0;
    line-height: 0.28rem;
  }

  .bg-center7 .center  p {
    font-size: 0.22rem;
    color: #666666;
    line-height: 0.22rem;
  }
  .bg-center7 .coupon{
    float: left;margin: 0 0.15rem 0 0;width: 5.76rem;position: relative
  }
  .bg-center7 .coupon:first-of-type{
    margin: 0 0.15rem 0 0.1rem;
  }

  .bg-center7 .center .exchange-code p {
    font-size: 0.32rem;
    line-height: 0.32rem;
    color: #494949;
  }

  .bg-center7 .center .exchange-code h2 {
    font-size: 0.44rem;
    color: #494949;
    line-height: 0.44rem;
    /*letter-spacing: 0.05rem;*/
    margin: 0.2rem 0 0 0;
  }

  .bg-center5 {
    width: 100%;
  }
.bg-center5 .center-main{
  width: 90%;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
}
  .bg-center5 ul {
    position: absolute;
    width: 76%;
    list-style: none;
    font-size: 0.32rem;
    color: #494949;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
  }

  .bg-center5 ul li {
    line-height: 0.48rem;
    margin: 0.12rem 0 0 0;
    text-align: left;
  }

  .bg-center5 ul li span {
    width: 0.48rem;
    height: 0.48rem;
    float: left;
    margin: -0.06rem 0 0 0;
  }

  .bg-center5 ul li p {
    margin: 0 0 0 0.68rem;
  }

  .bg-center5 ul li:first-child span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/1.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 ul li:nth-child(2) span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/2.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 ul li:nth-child(3) span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/3.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 ul li:nth-child(4) span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/4.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 ul li:nth-child(5) span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/5.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 ul li:nth-child(6) span {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/6.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .close {
    width: 0.82rem;
    height: 0.82rem;
  }

  .btnTip {
    width: 5rem;
    height: 1.04rem;
    border: none;
    outline: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-center-btn2 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_know.png') no-repeat;
    background-size: 100% 100%;
    top: 10rem;
  }

  i {
    display: inline;
  }

  .jo-index {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .jo-index > div {
    width: 100%;
    height: 100%;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/bg.png");
    background-size: 100% 100%;
    overflow: auto;
  }
  .activitys {
    width: 100%;
    overflow: hidden;
    height: 15%;
    min-height: 1.78rem;
    position: relative;
    padding: 0 0.22rem;
  }

  .footer {
    width: 100%;
    height: 27%;
    min-height: 3.1rem;
    position: relative;
    overflow: hidden;
  }

  .jo-version2 .header {
    height: 13%;
  }

  .jo-version2 .main {
    height: 44%;
  }

  .jo-version2 .main .center .game-num {
    width: 4.3rem;
    height: 0.96rem;
    margin: -0.86rem auto 0 auto;
  }

  .jo-version2 .main .center .game-num > div h3 {
    line-height: 0.6rem;
    margin: 0;
  }

  .jo-version2 .main .center .tip > p {
    line-height: 0.72rem;
  }

  .jo-version2 .main .center .startgame {
    width: 3.36rem;
    height: 3.36rem;
  }

  .jo-version2 .main .centerout {
    /*margin: 0.1rem 0 0 0;*/
  }

  .jo-version2 .main .centerout .center {
    padding: 0.9rem 0.2rem 0 0.2rem;
  }

  .jo-version2 .header > div {
    top: 55%;
  }

  .jo-version2 .main .center .tip {
    height: 1rem;
  }

  .jo-version2 .footer {
    height: 28%;
  }

  .jo-version2 .main > div {
    top: 49%;
  }
  .jo-version2 .bg-center7  .page-num{
    bottom: 20%;
  }

</style>
