<template>
  <div class="jo-index" :class="{'jo-version2':version2}">
    <div class="jo-index-div" v-show="showHtml" @click="hideKefu">
      <!--<div v-show="false">-->
      <!--<img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/infinity.png" alt="">-->
      <!--<img src="http://res.catchme.com.cn/imgs-2018-02-05/recharge.png" alt="">-->
      <!--<img src="http://res.catchme.com.cn/imgs-2018-02-05/image_red_no2.png" alt="">-->
      <!--<img src="http://res.catchme.com.cn/imgs-2018-02-05/image_red_zhong2.png" alt="">-->
      <!--</div>-->
      <div class="header">
        <div>
          <div class="head-portrait">
            <img v-if="user.avatar" :src="user.avatar" alt="" style="border-radius: 50%">
            <!--<img v-else="" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_portrait.png" alt="">-->
            <img v-else="" src="./../assets/small/icon_portrait.png" alt="">
            <!--<img src="http://res.catchme.com.cn/imgs-2018-02-05/portrait.png" alt="">-->
            <p>{{user.player_id}}</p>
          </div>
          <div class="header-main">
            <h4>{{user.nick_name}}<span>{{'机器号：' + machine_no}}</span></h4>
            <div class="game game-coins">
              <div>
                <i class="icon-jinbi"></i><span class="coins-num">{{user.coins}}</span>
              </div>
            </div>
            <!--<div class="game game-quan" v-show="user.game_ticket>0">-->
            <!--<i class="iconfont icon-quan"></i>-->
            <!--<span>免费券:</span><span class="coins-num">{{user.game_ticket}}</span>-->
            <!--</div>-->
            <div class="kefu" @click.stop="">
              <p id="support" @click="showKefu">
                <!--<img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_kefu.png" alt=""><span>客服</span>-->
                <img src="./../assets/small/icon_kefu.png" alt=""><span>客服</span>
              </p>
              <div class="kefu2" :style="isKefuStyle">
                <div class="kefu2-right">
                  <div class="kefu2-img">
                    <!--<img src="http://res.catchme.com.cn/imgs-2018-04-10/qrcode2.jpg" alt="">-->
                    <img :src="kefuImg" alt="">
                  </div>
                  <h3>长按关注<br/>联系客服</h3>
                  <p><span></span><a href="tel:0755-32904117">0755-32904117</a></p>
                </div>
                <div class="kefu2-left" @click="hideKefu">
                  <!--<img src="http://res.catchme.com.cn/imgs-2018-04-10/icon_close1.png" alt="">-->
                  <img src="./../assets/small/icon_close1.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="activitys">
        <operations ref="operations" @changeBgShow="changeBgShow" @closeBg="closeBg"
                    @changeTip="changeTip"></operations>
      </div>

      <div class="main">
        <div>
          <div class="centerout">
            <div class="center">
              <h3 @click="handleScanQRCode" id="change_device">扫码换机<i class="iconfont icon-go"></i></h3>
              <button class="startgame" :class="{'hasclick':start_desc == '投币中'}" id="coin-operated"
                      @click="handleStartingDevice">{{start_desc ? start_desc : '投币启动'}}
              </button>
              <div class="game-num norecharge" v-if="user.coins<=0">您还没有游戏币，请先充值<span></span>
              </div>
              <div class="game-num" v-else>
                <i id="coin_reduce" class="iconfont icon-jianhao" @click="handlerGameNum('-')" :class="{
                     'active': gameNum === 1
                 }"></i>
                <div>
                  <h3>{{gameNum * info.coin_num}}币</h3>
                  <p>可玩{{gameNum}}次游戏</p>
                </div>
                <i id="coin_add" class="iconfont icon-jiahao" @click="handlerGameNum('+')" :class="{
                     'active': ((gameNum + 1) * info.coin_num) > user.coins
                 }"></i>
              </div>
              <img @click.prevent="" v-if="start_desc=='投币中'" class="tbz" src="../assets/small/tbz.gif" alt="">
              <img @click.prevent="" v-if="is_lamp_after && start_desc=='投币启动'" class="tbz"
                   src="http://res.catchme.com.cn/imgs-2018-02-05/btcg.gif" alt="">
              <div class="tip">
                <p v-show="user.coins<=0  && !is_lamp_after">充值后点击“投币启动”按钮开始游戏</p>
                <p v-show="is_lamp_after && start_desc=='投币启动'">投币成功，<span>“摇动游戏杆”</span>即可开始游戏</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <joPay ref="joPay" @changeTip="changeTip" @changeBgShow="changeBgShow" @handleScanQRCode="handleScanQRCode"
               @closeBg="closeBg"></joPay>
      </div>
      <div class="bg" v-show="bgShow && !tipContent.button" @click="closeBg">
        <div class="bg-center1" v-if="contentShow == 'infinityTip'" @click.stop="">
          <img class="bg-center1-img" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/infinity-after.png"
               alt="">
          <button class="btnTip bg-center-btn3"
                  @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type)"></button>
          <img src="./../assets/small/icon_close.png" alt="" class="close"
               @click="closeBg">
          <span v-if="currentCoupon.coin_price.type == 1"
                class="cost-price-bg">{{currentCoupon.coin_price.coin_price}}</span>
          <span style="pointer-events: none;" class="infinity-tip-bg"
                v-if="currentCoupon.coin_price.type == 1 && currentCoupon.coupon.type==1">{{(currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce).toFixed(2) | handleNum}}元无限抓</span>
          <span style="pointer-events: none;" class="infinity-tip-bg"
                v-if="currentCoupon.coin_price.type == 1 && currentCoupon.coupon.type==0">{{(currentCoupon.coin_price.coin_price * currentCoupon.coupon.reduce / 100).toFixed(2) | handleNum}}元无限抓</span>
        </div>

        <div class="bg-center2" v-if="contentShow == 'infinity'" @click.stop="">
          <div style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 100%">
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/infinity.png" alt=""
                 style="width: 100%;">
            <button class="bg-center-btn2" @click="closeBg"></button>
          </div>
        </div>

        <div class="bg-center3" v-if="contentShow == 'newUser'" @click.stop="">
          <img class="bg-center3-img" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/newUser.png" alt="">
          <button class="btnTip bg-center-btn4"
                  @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type)"></button>
          <img src="./../assets/small/icon_close.png" alt="" class="close"
               @click="closeBg">
          <span class="cost-price-bg">{{currentCoupon.coin_price.coin_price}}元</span>
          <span v-if="currentCoupon.coin_price.type == 0 && currentCoupon.coupon.type==1"
                class="put-tip-bg">{{(currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce).toFixed(2) | handleNum}}元</span>
          <span v-if="currentCoupon.coin_price.type == 0 && currentCoupon.coupon.type==0 "
                class="put-tip-bg">{{(currentCoupon.coin_price.coin_price * currentCoupon.coupon.reduce / 100).toFixed(2) | handleNum}}元</span>
          <span v-if="currentCoupon.coupon.type != 2 && currentCoupon.coin_price.type != 1"
                class="newUser-tip-bg">{{currentCoupon.coupon.title}}</span>
        </div>

        <div class="bg-center4" v-if="contentShow == 'hideCoupon'" @click.stop="">
          <div class="bg-center-center">
            <img class="bg-center4-img" @click.prevent=""
                 src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/recharge.png"
                 alt="">
            <h3 class="coupon-num" :class="{'coupon-infinity':currentCouponPay.type===1}">
              {{Number(currentCouponPay.coin_price).toFixed(2) | handleNum}}元<span
              v-if="currentCouponPay.type===0">{{currentCouponPay.coin_num}}币</span><span v-else="">无限玩</span></h3>
            <p class="bg-center4-p" v-show="(currentCouponPay.original_price - currentCouponPay.coin_price)>0">
              (立省{{(currentCouponPay.original_price - currentCouponPay.coin_price).toFixed(2) | handleNum}}元)</p>
            <button class="bg-center4-btn1" @click="useCouponPay" id="use_hide_coupon">立即使用</button>
            <button class="bg-center4-btn2 btn2" @click="continueRecharge" id="continue_recharge">
              继续充{{pay.coin_price | handleNum}}元
            </button>
            <img src="./../assets/small/icon_close.png" alt="" class="close"
                 @click="closeBg('hide')" id="close_hide_coupon">
          </div>
        </div>

        <div class="bg-center5" v-if="contentShow == 'unRedCoupon'" @click.stop="">
          <div class="bg-center-center">
            <img class="bg-center5-img" @click.prevent=""
                 src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/image_red_no2.png" alt=""/>
            <button @click="closeBg">我知道啦</button>
            <img src="./../assets/small/icon_close.png" alt="" class="close"
                 @click="closeBg()">
          </div>
        </div>

        <div class="bg-center6" v-if="contentShow == 'redCoupon'" @click.stop="">
          <div class="bg-center-center">
            <img class="bg-center6-img" @click.prevent=""
                 src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/image_red_zhong2.png" alt=""/>
            <p class="coupon-num bg-center6-p"><span
              v-if="currentCoupon.coupon.type===3">{{(currentCoupon.coin_price.coin_price - currentCoupon.coupon.reduce).toFixed(2) | handleNum}}</span><span
              v-if="currentCoupon.coupon.type===4">{(item.coin_price.coin_price * item.coupon.reduce / 100).toFixed(2) | handleNum}}</span>元{{currentCoupon.coin_price.coin_num}}币
            </p>
            <button
              @click="useCoupons(currentCoupon.coupon.id,currentCoupon.coin_price.coin_price_id,currentCoupon.coupon.type,currentCoupon.coin_price.coin_num,currentCoupon.coin_price.type,currentCoupon.coin_price.coin_price,currentCoupon.coupon.reduce)"
              id="use_coupon">
              立即使用
            </button>
            <img src="./../assets/small/icon_close.png" alt="" class="close"
                 @click="closeBg()">
          </div>
        </div>

        <div class="bg-center7" v-if="contentShow == 'operationTip'" @click.stop="">
          <div class="bg-center7-center">
            <pre>{{operationTipContent}}</pre>
          </div>
        </div>

        <div class="bg-center10" v-if="contentShow == 'coin'" @click.stop="">
          <div>
            <div>
              <img class="imgBg" src="http://res.catchme.com.cn/imgs-2018-02-05/tip/image_much.png" alt="">
              <p>一次投币太多容易造成浪费<br/>确定继续投币吗？</p>
              <button class="btn1" @click="reloadCoin">重新选择</button>
              <button class="btn2" @click="continueCoin">继续投币</button>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="closeBg"/>
          </div>
        </div>

      </div>

      <tipOperation></tipOperation>
    </div>
    <tip :tipContent="tipContent" @tipButton="tipButton"></tip>

  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import joPay from './wxpay'
  import operations from './operations.vue'
  import tip from './tip.vue'
  import tipOperation from './tipoperation.vue'
  import {getErrMsg} from './../util/index'
  import Toast from 'mint-ui/lib/Toast'

  export default {
    data() {
      return {
        start_desc: '投币启动',
        gameNum: 1,
        is_start: false,
        is_lamp_after: false,
        is_recharge: false,
        loading_art: '加载更多~',
        load: false,
        max_page: false,
        maskShow: false,
        isShow: '',
        showHtml: true,
        bgShow: false,
        contentShow: '',
        currentCoupon: {},
        pay: {},
        currentCouponPay: {},
        operationTipContent: '',
        isKefuStyle: '',
        kefuImg: ''
      }
    },
    created() {
      this.Indicator.open()
    },
    computed: mapState({
      user: state => state.user.user,
      consume: state => state.user.consume,
      machine_no: state => state.user.machine_no,
      info: state => state.user.info,
      hide_coupons: state => state.user.hide_coupons,
      tipContent: state => state.user.tipContent,
      tip_operation: state => state.user.tip_operation,
//      isLogin:state => state.user.isLogin
    }),
    components: {
      joPay,
      operations,
      tip,
      tipOperation
    },
    mounted() {
//      if (CONFIG.isWx) {
//        document.addEventListener('visibilitychange', function () {
//          if (!document.hidden) {
//            this.$store.dispatch('getUser')
//          }
//        }.bind(this));
//      } else if (CONFIG.isAlipay) {
//        document.addEventListener('resume', function () {
//          this.$store.dispatch('getUser');
//        }.bind(this));
//      }
      this.$store.dispatch('judgeMachine').then(() => {
        //用户可以操作时间
        localStorage.setItem('userTime', (Date.now() - (localStorage.getItem('startTime2') ? localStorage.getItem('startTime2') : performance.timing.navigationStart)))
        this.Indicator.close();
        this.showHtml = true;
      })
//      if(this.isLogin){
//              this.$store.dispatch('getUser')
//      }
    },
    methods: {
      tipButton() {
        if (this.tipContent.button === '扫码换机') {
          this.handleScanQRCode();
        } else {
          this.$store.commit('changeTipContent', {isShow: false});
        }
      },
      useCouponPay() {
        _hmt.push(['_trackEvent', '使用' + this.currentCouponPay.coin_price + '元' + this.currentCouponPay.coin_num + '币隐藏优惠券', '点击', '', '']);
        this.$refs.joPay.handlePay(this.currentCouponPay.coin_price_id, this.currentCouponPay.coin_num, this.currentCouponPay.status, this.currentCouponPay.coin_price, this.currentCouponPay.type);
      },
      continueRecharge() {
        _hmt.push(['_trackEvent', '继续充值' + this.pay.coin_price + '元', '点击', '', '']);
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
        this.is_lamp_after = true
        setTimeout(() => {
          this.is_lamp_after = false
        }, 60000)
      },
      closeBg(value) {
        if (value === 'red') {
          _hmt.push(['_trackEvent', '关闭红包弹窗', '点击', '', '']);
        } else if (value === 'hide') {
          _hmt.push(['_trackEvent', '关闭' + this.pay.coin_price + '元弹窗优惠券', '点击', '', '']);
        }
        this.bgShow = false;
      },
      useCoupons(coupon_id, coin_price_id, coupon_type, coin, type, coin_price, reduce) {
        _hmt.push(['_trackEvent', '弹窗按钮使用红包', '点击', '红包价格为' + (coin_price - reduce) + '元', '']);
        this.$refs.operations.useCoupons(coupon_id, coin_price_id, coupon_type, coin, type, coin_price, reduce);
      },
      handlerGameNum(x) {
        if (x === '-') {
          if (this.gameNum === 1) return false;
          this.gameNum--;
          _hmt.push(['_trackEvent', '减币', '点击', '', '']);
        } else {
          if (((this.gameNum + 1) * this.info.coin_num) > this.user.coins) {
            return false
          }
          this.gameNum++;
          _hmt.push(['_trackEvent', '加币', '点击', '', '']);
        }
      },
      reloadCoin() {
        this.gameNum = 1;
        this.bgShow = false;
      },
      continueCoin() {
        this.startingDevice();
        this.bgShow = false;
      },
      //投币，开始游戏
      handleStartingDevice() {
        this.closeBg();
        if (this.info.online === 0) {
          this.$store.commit('changeTipContent', getErrMsg(1001));
          return
        }
        if (this.is_start) {
          return
        } else {
          if (this.gameNum * this.info.coin_num < 50) {
            this.startingDevice();
          } else if (this.gameNum * this.info.coin_num >= 99) {
            Toast({
              message: '投币数量太多，请重新选择',
              position: 'middle',
              duration: 1000
            })
            this.gameNum = 1;
            return;
          } else {
            this.bgShow = true;
            this.contentShow = 'coin';
            return;
          }
        }
      },
      startingDevice() {
        this.is_start = true
        this.is_lamp_after = false
        this.start_desc = '投币中'
        if (this.user.coins < this.info.coin_num) {
          this.start_desc = '';
          this.is_start = false
          this.$store.commit('changeTipContent', getErrMsg(1005));
          return false
        }
        //添加百度统计
        _hmt.push(['_trackEvent', '主按钮投币', '点击', '投币-游戏次数-' + this.gameNum, '']);
        this.$store.dispatch('startingDevice', this.gameNum * this.info.coin_num)
          .then(() => {
            this.is_lamp_after = true
            this.is_start = false
            this.start_desc = '投币启动'
            this.gameNum = 1;
            setTimeout(() => {
              this.is_lamp_after = false
            }, 12000 * this.gameNum)
          })
          .catch(() => {
            this.is_start = false
            this.start_desc = '投币启动'
          })
      },
      handleScanQRCode() {
        _hmt.push(['_trackEvent', '扫码更换机器', '点击', '', '']);//添加百度统计
        if (CONFIG.isAlipay) {
          ap.scan(function (res) {
            if (res.code) {
              window.location.href = res.code
            }
          })
        } else {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              window.location.href = result
            },
            error: function () {
              alert('扫码失败')
            }
          })
        }
      },
      showKefu() {
        _hmt.push(['_trackEvent', '客服', '点击', '', '']);
        this.kefuImg = 'http://res.catchme.com.cn/imgs-2018-04-10/qrcode2.jpg';
        this.isKefuStyle = ' transform: translate3d(0,0,0);';
      },
      hideKefu() {
        this.isKefuStyle = ' transform: translate3d(100%,0,0);';
      }
    },
//    watch: {
//          tip_operation:{
//            handler(val,oldVal) {
//              console.log(val)
//              console.log(oldVal);
////            console.log(this.tip_operation.enter)
//            console.log('111')
//            if(this.tip_operation.enter){
//              this.$store.commit('changeShowTipOperation',{isShow:true,tipObj:this.tip_operation.enter});
//            }
//          },deep:true},
//    }
    watch: {
      user(newUser, oldUser) {
        if (oldUser.coins === 0) {
          return;
        }
        if (newUser.coins !== oldUser.coins) {
          setTimeout(() => {
            this.$store.dispatch('getUser')
          }, 2000)
        }
      },
//      isLogin(newValue,oldValue){
//        console.log('newValue-----'+newValue);
//        console.log('oldValue-----'+oldValue);
////        this.$store.dispatch('getUser')
//      }
    }
  }
</script>

<style lang="scss" scoped>
  .kefu2 {
    width: 292px;
    position: absolute;
    z-index: 999;
    /*top:calc(6% - 0.12px);*/
    top: 0;
    right: 0;
    transform: translate3d(100%, 0, 0);
    transition: all 0.4s;
  }

  .kefu2 .kefu2-left {
    float: right;
    width: 58px;
    height: 62px;
    background: #fff2ee;
    border-radius: 18px 0 0 18px;
    line-height: 62px;
    text-align: center;
  }

  .kefu2 .kefu2-left img {
    width: 30px;
    height: 29px;
    vertical-align: middle;
  }

  .kefu2 .kefu2-right {
    width: 234px;
    height: 352px;
    padding: 30px 0 0 0;
    float: right;
    background: #fff2ee;
    border-radius: 0 0 0 18px;
  }

  .kefu2 .kefu2-right .kefu2-img {
    width: 158px;
    height: 158px;
    padding: 9px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
  }

  .kefu2 .kefu2-right .kefu2-img img {
    width: 140px;
    height: 140px;
  }

  .kefu2 .kefu2-right h3 {
    font-size: 22px;
    line-height: 24px;
    color: #353535;
    margin: 12px 0 38px 0;
    text-align: center;
  }

  .kefu2 .kefu2-right p {
    font-size: 22px;
    text-align: center;
  }

  .kefu2 .kefu2-right p a {
    color: #576b95;
  }

  .kefu2 .kefu2-right p span {
    display: inline-block;
    width: 27px;
    height: 26px;
    /*background: url("http://res.catchme.com.cn/imgs-2018-04-10/icon_phone.png") no-repeat;*/
    background: url("./../assets/small/icon_phone.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: top;
    margin: 0 8px 0 0;
  }

  .bg-center10{
    >div{
      width: 622px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      >div{
        width: 100%;
        height: 840px;
        background: #fff;
        /*margin: 0 0 122px 0;*/
        p{
          font-size: 40px;
          color: #000;
          width: 622px;
          text-align: center;
          line-height: 62px;
          margin: 0 0 34px 0;
        }
        button{
          width: 556px;
          height: 100px;
          border: none;
          outline: none;
          /*font-size: 0;*/
          color: #fff;
          &.btn1{
            background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
            background-size: 100% 100%;
            bottom: 204px;
            font-size: 36px;
            margin: 0 0 26px 0;
          }
          &.btn2{
            background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_recharge_default.png") no-repeat;
            background-size: 100% 100%;
            bottom:62px;
            color: #f16319;
            /*text-shadow:0 0 10px #fff,
            4px 4px 6px blue,-4x -4px 6px blue;*/
          }
        }
        .imgBg{
          width: 556px;
          margin: 45px 0;
        }
        /*.close {
          position: absolute;
          right: 0;
          top: -140px;
        }*/
      }
    }

  }

  .bg-center7 {
    width: 80%;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    line-height: 50px;
    font-size: 28px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }

  .price {
    position: absolute;
    width: 298px;
    top: 23%;
    left: 50%;
    transform: translateX(-50%);
  }

  .coupon-num {
    font-size: 80px;
    text-shadow: 3px 3px 5px #d93401;
    color: #fff;
    position: absolute;
    top: 350px;
    width: 100%;
    line-height: 80px;
  }

  .bg-center6-p {
    top: 376px;
    line-height: 246px
  }

  /*.coupon-infinity{*/
  /*font-size: 0.9px;*/
  /*}*/
  .bg-center-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .bg-center4 button, .bg-center5 button, .bg-center6 button {
    width: 556px;
    height: 100px;
    outline: none;
    border: none;
    font-size: 36px;
    color: #fff;
    text-shadow: 2px 2px 3px #cd1d00;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/press_default.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-center4 button.btn2 {
    color: #fc6612;
    text-shadow: none;
    background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_recharge_default.png") no-repeat;
    background-size: 100% 100%;
  }

  .bg-center5 button {
    top: 680px;
  }

  .bg-center6 button {
    top: 740px;
  }

  .bg-center h3 {
    font-size: 60px;
    color: #ff4848;
    position: absolute;
    top: 530px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 600
  }

  .bg-center4 p, .bg-center p {
    font-size: 36px;
    color: #ff4848;
    position: absolute;
    top: 630px;
    left: 50%;
    transform: translateX(-50%)
  }

  /*.bg-center4 .close, .bg-center5 .close, .bg-center6 .close {
    position: absolute;
    right: 40px;
    top: -140px;
  }*/

  .hide-coupon {
    position: absolute;
    top: 580px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .infinity-tip-bg {
    position: absolute;
    font-size: 50px;
    color: #fff;
    left: 300px;
    top: 520px;
  }

  .newUser-tip-bg {
    position: absolute;
    font-size: 50px;
    color: #fff;
    left: 300px;
    top: 520px;
  }

  .cost-price-bg {
    position: absolute;
    left: 480px;
    top: 440px;
    color: #fff;
    font-size: 50px;
    text-decoration: line-through;
  }

  .put-tip-bg {
    position: absolute;
    left: 300px;
    top: 440px;
    color: #fff;
    font-size: 50px;
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
    width: 82px;
    height: 82px;
    margin: 40px 0 0 0;
  }

  .btnTip {
    width: 500px;
    height: 104px;
    border: none;
    outline: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-center-btn1 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 720px;
  }

  .bg-center-btn3 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 810px;
  }

  .bg-center-btn4 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_useit.png') no-repeat;
    background-size: 100% 100%;
    top: 810px;
  }

  .bg-center-btn2 {
    background: url('http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_know.png') no-repeat;
    background-size: 100% 100%;
    top: 1000px;
    width: 500px;
    height: 104px;
    border: none;
    outline: none;
  }

  .bg-center1, .bg-center3 {
    padding: 0 24px
  }

  .bg-center1 .bg-center1-img, .bg-center3 .bg-center3-img {
    width: 100%;
    margin: 62px 0 0 0;
  }

  .bg-center4-img {
    width: 90%;
    padding: 0 20px 0 10px;
  }

  .bg-center4 .bg-center4-p {
    font-size: 36px;
    color: #fff;
    position: absolute;
    top: 448px;
    line-height: 36px
  }

  .bg-center4-btn1 {
    bottom: 352px;
  }

  .bg-center4-btn2 {
    bottom: 220px;
  }

  .bg-center5-img {
    width: 85%;
    margin: 0 60px 0 60px
  }

  .bg-center6-img {
    width: 90%;
    padding: 0 22.5px 0 0;
  }

  .jo-index {
    position: relative;
    width: 100%;
    height: 100%;
    /*height: calc(100% - 1.25px);*/
    /*padding: 0 0.22px;*/
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/bg.png");*/
    /*background: url("http://res.catchme.com.cn/imgs-2018-02-05/bg.png") no-repeat;*/
    /*background-size: 100% 100%;*/
    /*overflow: auto;*/
  }

  .jo-index .jo-index-div {
    width: 100%;
    height: 100%;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/bg2.png");
    background-size: 100% 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  .header {
    width: 100%;
    height: 12%;
    min-height: 140px;
    /*background: red;*/
    position: relative;
    z-index: 666;
    /*overflow-x: hidden;*/
  }

  .header > div {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 0 0 22px;
    height: 112px;
  }

  .header .head-portrait {
    width: 102px;
    height: 102px;
    background: #feccbc;
    border-radius: 50%;
    position: relative;
    margin: -10px 0 0 0;
  }

  .header .head-portrait p {
    position: absolute;
    left: -5px;
    bottom: -18px;
    text-align: center;
    background: url("./../assets/imgs/bg_id.png") no-repeat;
    background-size: 100% 100%;
    width: 112px;
    height: 35px;
    /*line-height: 0.35px;*/
    line-height: 40px;
    font-size: 18px;
    color: #a65a4e;
  }

  .header .head-portrait img {
    /*width: 70%;*/
    width: 98px;
    /*max-height: 80%;*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .header .header-main {
    width: 100%;
    padding: 0 22px 0 140px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header .header-main h4 {
    /*font-size: 0.24px;*/
    font-size: 26px;
    color: #ffe7e0;
    /*line-height: 44px;*/
    margin: 0 0 12px 0;
    line-height: 26px;
    height: 26px;
    /*margin: 0.04px 0 0 0;*/
    /*text-indent: 0.15px;*/
  }

  .header .header-main h4 span {
    float: right;
    font-size: 20px;
  }

  .header .header-main .game {
    height: 62px;
    padding: 0 22px;
    line-height: 62px;
    border-radius: 31px;
    background: #fff2ee;
    float: left;
    /*min-width: 2px;*/
    position: relative;
    text-align: center;
  }

  .header .header-main .game > div {
    min-width: 160px;
    height: 62px;
  }

  /*position: absolute;*/
  /*left: 50%;*/
  /*top:50%;*/
  /*transform: translate(-50%,-50%);*/
  /*height: 0.62px;*/
  /*}*/

  .header .header-main .game i {
    font-size: 40px;
    color: #fe5f5b;
    font-weight: 500;
    text-align: center;
  }

  .header .header-main .game i.icon-jinbi {
    width: 32px;
    height: 36px;
    line-height: 66px;
    display: inline-block;
    /*background: url("http://res.catchme.com.cn/imgs-2018-04-10/icon_portrait_bi.png") no-repeat;*/
    background: url("./../assets/small/icon_portrait_bi.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0;
  }

  .header .header-main .game span {
    font-size: 28px;
    color: #fe5f5b;
    display: inline-block;
  }

  .header .header-main .game span.coins-num {
    font-size: 36px;
    color: #fe5f5b;
    font-weight: 600;
    margin: 0 0 0 10px;
    line-height: 70px;
    position: relative;
  }

  .header .header-main .game-quan {
    margin: 0 0 0 20px;
  }

  .header .header-main .kefu {
    /*width: 0.62px;*/
    height: 62px;
    background: #fff2ee;
    /*border-radius: 50%;*/
    /*float: right;*/
    /*position: relative;*/
    position: absolute;
    right: 0;
    padding: 0 22px;
    border-radius: 15px 0 0 15px;
  }

  .header .header-main .kefu > p {
    width: 100%;
    height: 100%;
    line-height: 62px;
  }

  .header .header-main .kefu p > img {
    width: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .header .header-main .kefu > p > span {
    /*display: inline-block;*/
    color: #fd643b;
    font-size: 28px;
    height: 28px;
    line-height: 70px;
    margin: 0 0 0 55px;
    /*vertical-align: middle;*/
  }

  .main {
    width: 100%;
    height: 46%;
    min-height: 542px;
    /*height: calc(100% - 4.98px);*/
    position: relative;
  }

  .activitys {
    width: 100%;
    overflow: hidden;
    /*padding: 0 0.22px;*/
    /*height: 2.04px;*/
    height: 15%;
    min-height: 178px;
    position: relative;
  }

  .main > div {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*padding: 0 0.22px;*/
  }

  .main .centerout {
    /*background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/bg_begin.png") no-repeat;*/
    background: url("./../assets/small/bg_begin.png") no-repeat;
    background-size: 100% 100%;
    /*padding: 0.22px;*/
    padding: 20px;
    /*margin: 0.05px 0 0 0;*/
  }

  .main .centerout .center {
    width: 100%;
    /*height: 5px;*/
    /*background: #fff;*/
    /*margin: 0.32px 0 0 0;*/
    /*padding: 0.28px 0.2px 0 0.2px;*/
    padding: 70px 20px 0 20px;
    /*border-radius: 10px;*/
    position: relative;
    background: #fff;

  }

  .main .center .tbz {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px;
  }

  .main .center > h3 {
    width: 226px;
    height: 90px;
    /*font-size: 0.32px;*/
    font-size: 34px;
    color: #fd643b;
    /*margin: 0 0 0.1px 0;*/
    /*height: 0.64px;*/
    background: #feedd7;
    line-height: 90px;
    position: absolute;
    right: 0;
    top: 0;
    /*top:-0.28px;*/
    text-align: center;
    /*padding: 0.2px 0.3px;*/
  }

  .main .center > h3 > i {
    font-size: 30px;
  }

  .main .center .startgame {
    width: 306px;
    height: 306px;
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_begin.png");*/
    background: url("./../assets/small/press_begin.png");
    background-size: 100% 100%;
    border: none;
    outline: none;
    /*font-size: 0.5px;*/
    font-size: 40px;
    color: #fff;
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 6;
  }

  .main .center .hasclick {
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_ing.png");*/
    background: url("./../assets/small/press_ing.png");
    background-size: 100% 100%;
  }

  .main .center .game-num {
    width: 418px;
    height: 93px;
    border: 1px solid #ff784e;
    border-radius: 18px;
    font-size: 24px;
    line-height: 91px;
    margin: -63px auto 0 auto;
    background: #fff;
    color: #7e7e7e;
    text-align: center;
    position: relative;
    z-index: 6;
  }

  .main .center .game-num.norecharge {
    border: 1px solid #afafaf;
  }

  .main .center .game-num i.active {
    color: #c8c8c8;
  }

  .main .center .game-num i {
    /*width: 0.81px;*/
    width: 20%;
    float: left;
    font-size: 50px;
    color: #ff784e;
    text-align: center;
    height: 67px;
    line-height: 67px;
    border-right: 1px solid #ff784e;
    margin: 10px 0;
  }

  .main .center .game-num i:last-of-type {
    border-right: none;
    border-left: 1px solid #ff784e;
    float: right;
  }

  .main .center .game-num > div {
    /*width: calc(100% - 1.62px);*/
    width: 60%;
    float: left;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*margin: 0.05px 0 0 0;*/
  }

  .main .center .game-num > div h3 {
    /*font-size: 0.42px;*/
    font-size: 40px;
    color: #ff784e;
    font-weight: 600;
    /*line-height: 0.42px;*/
    line-height: 40px;
    margin: 0 0 8px 0;
  }

  .main .center .game-num > div p {
    /*font-size: 0.24px;*/
    /*line-height: 0.24px;*/
    font-size: 22px;
    color: #888888;
    line-height: 22px;
  }

  .main .center .tip {
    height: 84px;
  }

  .main .center .tip > p {
    font-size: 24px;
    color: #7e7e7e;
    line-height: 64px;
    text-align: center;
  }

  .main .center .tip > p > span {
    font-weight: 600;
    color: black;
  }

  .footer {
    width: 100%;
    /*height: 3.4px;*/
    /*height: 28%;*/
    height: 27%;
    min-height: 310px;
    position: relative;
    /*padding: 0.36px 0.22px 0 0.22px;*/
    overflow: hidden;
  }

  /*@media only screen and (min-device-aspect-ratio: 3/5) {*/
  /*.main{*/
  /*height: 60%;*/
  /*}*/
  /*.main .center .game-num{*/
  /*width: 4.3px;*/
  /*height: 0.96px;*/
  /*margin: -0.86px auto 0 auto;*/
  /*}*/
  /*.main .center .game-num > div h3{*/
  /*line-height: 0.6px;*/
  /*margin: 0;*/
  /*}*/
  /*.main .center .tip > p{*/
  /*line-height: 0.72px;*/
  /*}*/
  /*.main .center .startgame{*/
  /*width: 3.36px;*/
  /*height: 3.36px;*/
  /*}*/
  /*.main .centerout{*/
  /*margin: 0.1px 0 0 0;*/
  /*}*/
  /*.main .centerout .center{*/
  /*padding: 0.9px 0.2px 0 0.2px;*/
  /*}*/
  /*.header > div{*/
  /*top:55%;*/
  /*}*/
  /*.main .center .tip{*/
  /*height: 1px;*/
  /*}*/
  /*.footer {*/
  /*height: 28%;*/
  /*}*/
  /*}*/

  .jo-version2 .main {
    /*height: 60%;*/
    height: 45%;
  }

  .jo-version2 .main .center .game-num {
    width: 430px;
    height: 96px;
    margin: -86px auto 0 auto;
  }

  /*.jo-version2 .main .center .game-num > div h3 {*/
  /*line-height: 0.6px;*/
  /*margin: 0;*/
  /*}*/

  .jo-version2 .main .center .tip > p {
    line-height: 72px;
  }

  .jo-version2 .main .center .startgame {
    width: 336px;
    height: 336px;
  }

  .jo-version2 .main .centerout {
    /*margin: 0.1px 0 0 0;*/
  }

  .jo-version2 .main .centerout .center {
    padding: 90px 20px 0 20px;
  }

  .jo-version2 .header > div {
    top: 55%;
  }

  .jo-version2 .main .center .tip {
    height: 100px;
  }

  .jo-version2 .footer {
    height: 28%;
  }

  .jo-version2 .header .header-main h4 {
    font-size: 28px;
    line-height: 28px;
    height: 28px;
  }

  .jo-version2 .header .header-main h4 span {
    font-size: 22px;
  }

  /*.jo-version2 .activitys{*/
  /*height: 15%;*/
  /*}*/
</style>
