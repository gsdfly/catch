<template>
  <div class="jo-index" :class="{'jo-version2':version2}">
    <div v-show="showHtml">
      <pageHeader @showKefu="showKefu" :isMachine_no="isMachine_no"></pageHeader>
      <div class="no_machine_no" v-if="!isMachine_no">
        <img src="http://res.catchme.com.cn/imgs-2018-04-10/body2.png" alt="" mode="widthFix">
        <button plain="true" @click="scanCode">扫 码</button>
      </div>

      <div class="activitys" v-if="isMachine_no">
        <operations ref="operations" @changeBgShow="changeBgShow" @closeBg="closeBg"
                    @changeTip="changeTip"></operations>
      </div>

      <pagemain ref="pagemain" v-if="isMachine_no" :showHtml="showHtml" @scanCode="scanCode"></pagemain>

      <div class="footer" v-if="isMachine_no">
        <joPay ref="joPay" :showHtml="showHtml" @changeTip="changeTip" @changeBgShow="changeBgShow"
               @handleScanQRCode="handleScanQRCode"
               @closeBg="closeBg"></joPay>
      </div>

      <div class="bg" v-show="bgShow && !tipContent.isShow" @click="closeBg">

        <div class="bg-center1" v-if="contentShow == 'infinityTip'">
          <img class="center-after" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/infinity-after.png" alt=""
               mode="widthFix" @click.stop="">
          <button class="btnTip bg-center-btn3"
                  @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type,currentCoupon.coin_price.coin_price,currentCoupon.coupon.reduce,currentCoupon.coupon.title)"
                  plain="true"></button>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg">
          <span v-if="currentCoupon.coin_price.type == 1"
                class="cost-price-bg">{{currentCoupon.coin_price.coin_price}}</span>
          <span style="pointer-events: none;" class="infinity-tip-bg"
                v-if="currentCoupon.coin_price.type == 1 && currentCoupon.coupon.type==1">{{currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce}}元无限抓</span>
          <span style="pointer-events: none;" class="infinity-tip-bg"
                v-if="currentCoupon.coin_price.type == 1 && currentCoupon.coupon.type==0">{{currentCoupon.coin_price.coin_price * currentCoupon.coupon.reduce / 100}}元无限抓</span>
        </div>

        <div class="bg-center2" v-if="contentShow == 'infinity'">
          <div style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 100%">
            <img class="center-after" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/infinity.png" alt=""
                 mode="widthFix" @click.stop="">
            <button class="bg-center-btn2" @click="closeBg" plain="true" @click.stop=""></button>
          </div>
        </div>

        <div class="bg-center3" v-if="contentShow == 'newUser'">
          <img class="center-after" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/newUser.png" alt=""
               mode="widthFix" @click.stop="">
          <button class="btnTip bg-center-btn4"
                  @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type,currentCoupon.coin_price.coin_price,currentCoupon.coupon.reduce,currentCoupon.coupon.title)"
                  plain="true"></button>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg">
          <span class="cost-price-bg">{{currentCoupon.coin_price.coin_price}}元</span>
          <span v-if="currentCoupon.coin_price.type == 0 && currentCoupon.coupon.type==1"
                class="put-tip-bg">{{currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce}}元</span>
          <span v-if="currentCoupon.coin_price.type == 0 && currentCoupon.coupon.type==0 "
                class="put-tip-bg">{{currentCoupon.coin_price.coin_price * currentCoupon.coupon.reduce / 100}}元</span>
          <span v-if="currentCoupon.coupon.type != 2 && currentCoupon.coin_price.type != 1"
                class="newUser-tip-bg">{{currentCoupon.coupon.title}}</span>
        </div>

        <div class="bg-center4" v-if="contentShow == 'hideCoupon'">
          <div class="bg-center-center">
            <img class="center-after" src="http://res.catchme.com.cn/imgs-2018-02-05/recharge.png"
                 alt="" mode="widthFix" @click.stop="">
            <h3 class="coupon-num" :class="{'coupon-infinity':currentCouponPay.type===1}">
              <span>{{currentCouponPay.coin_price}}元</span><span
              v-if="currentCouponPay.type===0">{{currentCouponPay.coin_num}}币</span><span v-else="">无限玩</span></h3>
            <p class="savemoney" v-show="(currentCouponPay.original_price - currentCouponPay.coin_price)>0">
              (立省{{currentCouponPay.original_price - currentCouponPay.coin_price}}元)</p>
            <button class="button1" @click="useCouponPay" id="use_hide_coupon" plain="true">立即使用</button>
            <button class="button2" @click="continueRecharge" id="continue_recharge" plain="true">继续充{{pay.coin_price
              }}元
            </button>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg('hide')" id="close_hide_coupon">
          </div>
        </div>

        <div class="bg-center5" v-if="contentShow == 'unRedCoupon'">
          <div class="bg-center-center">
            <img class="center-after"
                 src="http://res.catchme.com.cn/imgs-2018-02-05/image_red_no2.png" alt="" mode="widthFix"
                 @click.stop="">
            <button @click="closeBg" plain="true">我知道啦</button>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
          </div>
        </div>

        <div class="bg-center6" v-if="contentShow == 'redCoupon'">
          <div class="bg-center-center">
            <img class="center-after"
                 src="http://res.catchme.com.cn/imgs-2018-02-05/image_red_zhong2.png" alt="" mode="widthFix"
                 @click.stop=""/>
            <p class="coupon-num"><span
              v-if="currentCoupon.coupon.type===3">{{currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce}}</span><span
              v-if="currentCoupon.coupon.type===4">{{item.coin_price.coin_price * item.coupon.reduce / 100}}</span>元{{currentCoupon.coin_price.coin_num}}币
            </p>
            <button
              @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type,currentCoupon.coin_price.coin_price,currentCoupon.coupon.reduce,currentCoupon.coupon.title)"
              id="use_coupon" plain="true">
              立即使用
            </button>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg('red')">
          </div>
        </div>

        <div class="bg-center7" v-if="contentShow == 'operationTip'" @click.stop="">
          <div class="bg-center7-center">
            <text space="ensp">{{operationTipContent}}</text>
          </div>
        </div>

      </div>

      <tipOperation></tipOperation>
    </div>
    <tip :tipContent="tipContent" @tipButton="tipButton"></tip>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getParamByName, locationHref,changeTipOperation} from './../../utils/index'
  import tip from '@/components/tip'
  import joPay from '@/components/wxpay'
  import CONFIG from './../../config/index'
  import operations from '@/components/operations'
  import pageHeader from '@/components/header'
  import pagemain from '@/components/main'
  import api from './../../api/index'
  import tipOperation from '@/components/tipoperation.vue'

  export default {
    data() {
      return {
        showHtml: false,
        bgShow: false,
        contentShow: '',
        currentCoupon: {},
        pay: {},
        currentCouponPay: {},
        userInfo: {},
        version2: this.version2,
//        isRedirect: false,
        operationTipContent:'',
        isMachine_no:false,    //是否有机器号
        isKefuStyle:''
      }
    },
    onHide(){
      console.log('hide----'+this.isPayBack);
      if(!this.isPayBack){
        this.isMachine_no = false;
      }
    },
    onShow(){
      this.$store.commit('changePayBack',false);
      console.log('show----'+this.isPayBack);
    },
   async beforeMount() {
      console.log(this.$root.$mp.appOptions);

      console.log('index beforeMount')

      console.log(this.$root.$mp.query.q)
      //只能在默认版本这里获取版本，然后根据版本跳转
      var url = unescape(this.$root.$mp.query.q);
//      url = 'http://www.5zhua.cn/catch/?machine=CATCH_100024'

     var scene = this.$root.$mp.appOptions.scene;
     var sceneArr = [1011,1012,1013];
     console.log(sceneArr.includes(scene))
     if(!sceneArr.includes(scene)){
        url = 'undefined';
     }
      this.handleUrl(url);
    },
    onPullDownRefresh: async function () {
      await this.init();
      wx.stopPullDownRefresh();
      console.log('下拉刷新');
    },
    components: {
      operations,
      tip,
      joPay,
      pageHeader,
      pagemain,
      tipOperation
    },
    computed: {
      ...mapState({
        tipContent: state => state.user.tipContent,
        isLogin: state => state.user.isLogin,
        isPayBack: state => state.user.isPayBack,
        tip_operation:state => state.user.tip_operation
      })
    },
    methods: {
      versionRedirect(){
        console.log(CONFIG.machine_no)
        api.getVersion({machine_no: CONFIG.machine_no}).then((res) => {
            if (res.data.data.id === 1) {
              if (this.isLogin) {
                this.init();
              }
            } else {
              wx.redirectTo({
                url: locationHref(res.data.data.id),
                fail: function () {
                  if (this.isLogin) {
                    this.init();
                  }
                }.bind(this)
              })
            }
          }
        )
      },
      login() {
       return new Promise((resolve, reject)=>{
         var self = this;
         var time = new Date().getTime();
         try {
           var token_x = JSON.parse(wx.getStorageSync('token_x'));
         } catch (err) {
           token_x = {};
         }
         if (JSON.stringify('token_x') !== '{}' && (time - token_x.time < 3600000)) {
           CONFIG.token = token_x.token;
           self.$store.commit('changeIsLogin');
           resolve();
         } else {
           console.log('登录');
           wx.login({
             success: (res) => {
               console.log(res)
               wx.getUserInfo({
                 lang: "zh_CN",
                 success: function (res2) {
                   console.table(res2)
                   api.onLogin({"js_code": res.code, raw: res2}).then((res3) => {
                     console.log(res3)
                     CONFIG.token = res3.data.data.token;
                     wx.setStorageSync('token_x', JSON.stringify({'token': res3.data.data.token, 'time': time}))
                     self.$store.commit('changeIsLogin');
                     resolve();
                   }).catch(() => {
                     wx.hideLoading();
                   })
                 }
               })
             }
           });
         }
       });
      },

      //初始化数据
      init() {
        this.$store.dispatch('getUser').then((res) => {
          this.showHtml = true
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
        this.$store.dispatch('judgeMachine')
        this.$store.dispatch('getCoinList')
        this.$store.dispatch('getOperations').then((res)=>{
          if (this.tip_operation.enter) {
            changeTipOperation(this.tip_operation.enter, 'alreadyTipEnter', this.$store);
          }
          this.$refs.operations.handleOperations(res);
        })
//        return new Promise((success, err) => {
//          Promise.all([
//            this.$store.dispatch('judgeMachine'),
//            this.$store.dispatch('getUser'),
//            this.$store.dispatch('getCoinList'),
//            this.$store.dispatch('getOperations')
//          ]).then((results) => {
//            this.showHtml = true
//            wx.hideLoading()
//            this.$refs.operations.handleOperations(results[3]);
//            if(this.tip_operation.enter){
//              this.$store.commit('changeShowTipOperation',{isShow:true,tipObj:this.tip_operation.enter});
//            }
//            success()
//          }).catch((error) => {
//            console.log(err);
//            wx.hideLoading()
//            err()
//          })
//        })
      },
      tipButton() {
        if (this.tipContent.button === '扫码换机') {
          this.$refs.pagemain.handleScanQRCode();
//          this.page.aldstat.sendEvent('点击错误提示弹窗,扫码换机');
        } else {
          this.$store.commit('changeTipContent', {isShow: false});
//          this.page.aldstat.sendEvent('点击错误提示弹窗,按钮');
        }
      },
      useCouponPay() {
        this.page.aldstat.sendEvent('点击使用隐藏优惠券', this.currentCouponPay.coin_price + '元' + this.currentCouponPay.coin_num + '币'
        );
        this.$refs.joPay.handlePay(this.currentCouponPay.coin_price_id, this.currentCouponPay.coin_num, this.currentCouponPay.status, this.currentCouponPay.coin_price, this.currentCouponPay.type);
      },
      continueRecharge() {
        this.page.aldstat.sendEvent('点击原有的充值', this.pay.coin_price + '元' + this.pay.coin_num + '币');
        this.$refs.joPay.handlePay(this.pay.coin_price_id, this.pay.coin_num, this.pay.status, this.pay.coin_price, this.pay.type);
      },
      changeBgShow(obj) {
        this.bgShow = obj.bgShow;
        this.contentShow = obj.contentShow;
        this.currentCoupon = obj.currentCoupon;
        this.pay = obj.pay;
        this.currentCouponPay = obj.currentCouponPay;
        this.operationTipContent = obj.operationTipContent;
      },
      changeTip() {
        this.bgShow = true;
        this.contentShow = 'infinity';
        this.$refs.pagemain.infinityState();
//        this.is_lamp_after = true
//        setTimeout(() => {
//          this.is_lamp_after = false
//        }, 60000)
      },
      closeBg(value) {
        if (value === 'red') {
          this.page.aldstat.sendEvent('关闭红包弹窗');
        } else if (value === 'hide') {
          this.page.aldstat.sendEvent('关闭隐藏优惠券弹窗');
        }
        this.bgShow = false;
      },
      useCoupons(coupon_id, coin_price_id, coupon_type, coin, type, coin_price, reduce, title) {
        this.page.aldstat.sendEvent('弹窗使用优惠券', title);
        this.$refs.operations.useCoupons(coupon_id, coin_price_id, coupon_type, coin, type, coin_price, reduce);
      },
      scanCode(){
        wx.scanCode({
          success: (res) => {
            console.log('调用扫码成功')
            console.log(res);
            var url = res.result;
            this.handleUrl(url);
          }
        })
      },
      async handleUrl(url){
//        var url = 'http://www.5zhua.cn/catch/?machine=CATCH_100024';
        var machine_no = getParamByName('machine', url);

        if (url.indexOf('5zhua') !== -1) {
          CONFIG.url = 'https://front.5zhua.cn/';
          wx.removeStorageSync('token_x');
          console.log('清除成功')
        }
        //重新登录
        await this.login();
        if (machine_no) {
          wx.showLoading({"title": '加载中'});
          this.showHtml = false
          this.isMachine_no = true;
          CONFIG.machine_no = machine_no;
          this.$store.commit('setMachineNo');
          this.versionRedirect();
        }else {
          //没有机器号的情况
          //获取用户信息
          this.$store.dispatch('getUser').then((res)=>{
            console.log(res)
          })
          wx.hideLoading()
          this.showHtml = true;
        }
      }
    },
//    watch: {
////      isLogin() {
////        console.log('watch')
////        console.log(this.isRedirect)
////        if (this.isRedirect) {
////          this.init();
////        }},
//        tip_operation() {
//          if(this.tip_operation.enter){
//            this.$store.commit('changeShowTipOperation',{isShow:true,tipObj:this.tip_operation.enter});
//          }
//        }
//      }
  }
</script>

<style scoped>
  .no_machine_no{
    width: 100%;
  }
  .no_machine_no img{
    width: 100%;
  }
  .no_machine_no button{
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png");
    background-size: 100% 100%;
    border: none;
    outline: none;
    width: 5.56rem;
    height: 1rem;
    color: #fff;
    font-size: 0.36rem;
    margin:10% auto 0 auto;
  }

  .bg-center7{
    width: 80%;
    background: #fff;
    border-radius: 5px;
    padding: 0.3rem;
    line-height: 0.5rem;
    font-size: 0.28rem;
    position: absolute;
    text-align: left;
    left: 50%;
    top:45%;
    transform: translate(-50%,-50%);
  }
  .bg-center7 textarea{
    width: 100%;
    background: red;
  }
  .bg-center5 .center-after {
    width: 85%;
    margin: 0 0.6rem 0 0.6rem;
  }



  .bg-center4 .center-after {
    width: 90%;
    padding: 0 0.2rem 0 0.1rem;
  }

  .bg-center6 .center-after {
    width: 90%;
    padding: 0 0.225rem 0 0;
  }

  .bg-center1, .bg-center3 {
    width: 100%;
    padding: 0 0.24rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .center-after {
    width: 100%;
  }

  .price {
    position: absolute;
    width: 2.98rem;
    top: 23%;
    left: 50%;
    transform: translateX(-50%);
  }

  .coupon-num {
    font-size: 0.8rem;
    text-shadow: 3px 3px 5px #d93401;
    color: #fff;
    position: absolute;
    top: 3.7rem;
    line-height: 0.8rem;
    width: 100%
  }

  .bg-center6 .coupon-num {
    /*top: 4.5rem;*/
    top:3.96rem;line-height: 2.46rem

  }


  .bg-center-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .bg-center4 button, .bg-center5 button, .bg-center6 button {
    width: 5.56rem;
    height: 1rem;
    outline: none;
    border: none;
    font-size: 0.36rem;
    color: #fff;
    text-shadow: 2px 2px 3px #cd1d00;
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .bg-center4 .button1 {
    bottom: 2.32rem;
  }

  .bg-center4 .button2 {
    bottom: 1rem;
    color: #fc6612;
    text-shadow: none;
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_recharge_default.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 button {
    top: 6.8rem;
  }

  .bg-center6 button {
    top: 7.8rem;
  }

  .bg-center h3 {
    font-size: 0.6rem;
    color: #ff4848;
    position: absolute;
    top: 5.3rem;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600
  }

  .bg-center4 p, .bg-center p {
    font-size: 0.36rem;
    color: #ff4848;
    position: absolute;
    top: 6.3rem;
    left: 50%;
    transform: translateX(-50%)
  }

  .bg-center4 .savemoney {
    font-size: 0.36rem;
    color: #fff;
    position: absolute;
    top: 4.68rem;
    line-height: 0.36rem;
  }

  .bg-center4 .close, .bg-center5 .close, .bg-center6 .close {
    position: absolute;
    right: 0.4rem;
    /*top: -1.4rem;*/
    top: -1rem;
  }

  .hide-coupon {
    position: absolute;
    top: 5.8rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .infinity-tip-bg {
    position: absolute;
    font-size: 0.5rem;
    color: #fff;
    left: 3rem;
    top: 4.58rem;
  }

  .newUser-tip-bg {
    position: absolute;
    font-size: 0.5rem;
    color: #fff;
    left: 3rem;
    top: 4.58rem;
  }

  .cost-price-bg {
    position: absolute;
    left: 4.8rem;
    top: 3.78rem;
    color: #fff;
    font-size: 0.5rem;
    text-decoration: line-through;
  }

  .put-tip-bg {
    position: absolute;
    left: 3rem;
    top: 3.78rem;
    color: #fff;
    font-size: 0.5rem;
  }

  .bg {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.72);
    z-index: 999;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .close {
    width: 0.82rem;
    height: 0.82rem;
    margin: 0.4rem 0 0 0;
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

  .bg-center-btn1 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 7.2rem;
  }

  .bg-center-btn3 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 7.42rem;
  }

  .bg-center-btn4 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 7.42rem;
  }

  .bg-center-btn2 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_know.png') no-repeat;
    background-size: 100% 100%;
    width: 5rem;
    height: 1.04rem;
    border: none;
    outline: none;
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

  /*.header {*/
  /*width: 100%;*/
  /*height: 12%;*/
  /*min-height: 1.4rem;*/
  /*position: relative;*/
  /*}*/

  /*.header > div {*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*top: 50%;*/
  /*transform: translateY(-50%);*/
  /*padding: 0 0 0 0.22rem;*/
  /*height: 1.12rem;*/
  /*}*/

  /*.header .head-portrait {*/
  /*width: 1.02rem;*/
  /*height: 1.02rem;*/
  /*background: #feccbc;*/
  /*border-radius: 50%;*/
  /*position: relative;*/
  /*margin: -0.1rem 0 0 0;*/
  /*}*/

  /*.header .head-portrait p {*/
  /*position: absolute;*/
  /*left: -0.05rem;*/
  /*bottom: -0.18rem;*/
  /*text-align: center;*/
  /*background: url("http://res.catchme.com.cn/imgs-2018-02-05/bg_id.png") no-repeat;*/
  /*background-size: 100% 100%;*/
  /*width: 1.12rem;*/
  /*height: 0.35rem;*/
  /*line-height: 0.4rem;*/
  /*font-size: 0.18rem;*/
  /*color: #a65a4e;*/
  /*}*/

  /*.header .head-portrait img {*/
  /*width: 70%;*/
  /*height: 70%;*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%);*/
  /*}*/

  /*.header .header-main {*/
  /*width: 100%;*/
  /*padding: 0 0.22rem 0 1.4rem;*/
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  /*}*/

  /*.header .header-main h4 {*/
  /*font-size: 0.24rem;*/
  /*color: #ffe7e0;*/
  /*line-height: 0.44rem;*/
  /*}*/

  /*.header .header-main .game {*/
  /*height: 0.62rem;*/
  /*padding: 0 0.24rem 0 0.14rem;*/
  /*line-height: 0.66rem;*/
  /*border-radius: 0.31rem;*/
  /*background: #fff;*/
  /*float: left;*/
  /*}*/

  /*.header .header-main .game i {*/
  /*font-size: 0.4rem;*/
  /*color: #fe5f5b;*/
  /*font-weight: 500;*/
  /*text-align: center;*/
  /*}*/

  /*.header .header-main .game span {*/
  /*font-size: 0.28rem;*/
  /*color: #fe5f5b;*/
  /*display: inline-block;*/
  /*vertical-align: top;*/
  /*}*/

  /*.header .header-main .game span.coins-num {*/
  /*font-size: 0.36rem;*/
  /*color: #fe5f5b;*/
  /*font-weight: 600;*/
  /*margin: 0 0 0 0.1rem;*/
  /*}*/

  /*.header .header-main .game-quan {*/
  /*margin: 0 0 0 0.2rem;*/
  /*}*/

  /*.header .header-main .kefu {*/
  /*height: 0.62rem;*/
  /*background: #fff;*/
  /*position: absolute;*/
  /*right: 0;*/
  /*line-height: 0.62rem;*/
  /*padding: 0 0.22rem;*/
  /*border-radius: 0.15rem 0 0 0.15rem;*/
  /*}*/

  /*.header .header-main .kefu a {*/
  /*display: block;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/

  /*.header .header-main .kefu img {*/
  /*width: 0.5rem;*/
  /*vertical-align: middle;*/
  /*margin: 0 0.05rem 0 0;*/
  /*}*/

  /*.header .header-main .kefu span {*/
  /*display: inline-block;*/
  /*color: #fd643b;*/
  /*font-size: 0.28rem;*/
  /*vertical-align: middle;*/
  /*}*/

  .activitys {
    width: 100%;
    overflow: hidden;
    height: 15%;
    min-height: 1.78rem;
    position: relative;
  }

  /*.main {*/
  /*width: 100%;*/
  /*height: 46%;*/
  /*min-height: 5.42rem;*/
  /*position: relative;*/
  /*}*/

  /*.main > div {*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%);*/
  /*}*/

  /*.main .centerout {*/
  /*background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/bg_begin.png") no-repeat;*/
  /*background-size: 100% 100%;*/
  /*padding: 0.22rem;*/
  /*}*/

  /*.main .centerout .center {*/
  /*width: 100%;*/
  /*padding: 0.7rem 0.2rem 0 0.2rem;*/
  /*position: relative;*/

  /*}*/

  /*.main .center .tbz {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  /*}*/

  /*.main .center > h3 {*/
  /*width: 2.26rem;*/
  /*height: 0.9rem;*/
  /*font-size: 0.32rem;*/
  /*color: #fd643b;*/
  /*background: #feedd7;*/
  /*line-height: 0.9rem;*/
  /*position: absolute;*/
  /*right: 0;*/
  /*top: 0;*/
  /*text-align: center;*/
  /*!*padding: 0.2rem 0.3rem;*!*/
  /*}*/

  /*.main .center > h3 > i {*/
  /*font-size: 0.3rem;*/
  /*}*/

  /*.main .center .startgame {*/
  /*width: 3.06rem;*/
  /*height: 3.06rem;*/
  /*line-height: 3.06rem;*/
  /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_begin.png");*/
  /*background-size: 100% 100%;*/
  /*border: none;*/
  /*outline: none;*/
  /*font-size: 0.5rem;*/
  /*color: #fff;*/
  /*display: block;*/
  /*margin: 0 auto;*/
  /*position: relative;*/
  /*z-index: 6;*/
  /*}*/

  /*.main .center .hasclick {*/
  /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_ing.png");*/
  /*background-size: 100% 100%;*/
  /*}*/

  /*.main .center .game-num {*/
  /*width: 4.18rem;*/
  /*height: 0.93rem;*/
  /*border: 1px solid #ff784e;*/
  /*border-radius: 0.18rem;*/
  /*font-size: 0.24rem;*/
  /*line-height: 0.91rem;*/
  /*margin: -0.63rem auto 0 auto;*/
  /*background: #fff;*/
  /*color: #7e7e7e;*/
  /*text-align: center;*/
  /*position: relative;*/
  /*z-index: 6;*/
  /*}*/

  /*.main .center .game-num.norecharge {*/
  /*border: 1px solid #afafaf;*/
  /*}*/

  /*.main .center .game-num i.active {*/
  /*color: #c8c8c8;*/
  /*}*/

  /*.main .center .game-num i {*/
  /*!*width: 0.81rem;*!*/
  /*width: 20%;*/
  /*float: left;*/
  /*font-size: 0.5rem;*/
  /*color: #ff784e;*/
  /*text-align: center;*/
  /*height: 0.67rem;*/
  /*line-height: 0.67rem;*/
  /*border-right: 1px solid #ff784e;*/
  /*margin: 0.1rem 0;*/
  /*}*/

  /*.main .center .game-num i:last-of-type {*/
  /*border-right: none;*/
  /*border-left: 1px solid #ff784e;*/
  /*}*/

  /*.main .center .game-num > div {*/
  /*!*width: calc(100% - 1.62rem);*!*/
  /*width: 60%;*/
  /*float: left;*/
  /*text-align: center;*/
  /*}*/

  /*.main .center .game-num > div h3 {*/
  /*font-size: 0.42rem;*/
  /*color: #ff784e;*/
  /*font-weight: 600;*/
  /*line-height: 0.42rem;*/
  /*margin: 0.06rem 0 0.08rem 0;*/
  /*}*/

  /*.main .center .game-num > div p {*/
  /*font-size: 0.24rem;*/
  /*color: #7e7e7e;*/
  /*line-height: 0.24rem;*/
  /*}*/

  /*.main .center .tip {*/
  /*height: 0.84rem;*/
  /*}*/

  /*.main .center .tip > p {*/
  /*font-size: 0.24rem;*/
  /*color: #7e7e7e;*/
  /*line-height: 0.64rem;*/
  /*text-align: center;*/
  /*}*/

  /*.main .center .tip > p > span {*/
  /*font-weight: 600;*/
  /*color: black;*/
  /*}*/

  .footer {
    width: 100%;
    height: 27%;
    min-height: 3.1rem;
    position: relative;
    overflow: hidden;
  }

  .jo-version2 .main {
    /*height: 60%;*/
    height: 45%;
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
</style>
