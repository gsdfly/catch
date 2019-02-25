<template>
  <div class="recharge-lists clearfix" :class="{'version2':version2}">
    <div v-for="v in coin" :data-id="v.coin_price_id"
         @click="handlePayBefore(v)" :class="{'active':v.status==0,'infinity':v.type==1}">
      <div class="recharge-item-t"><span :class="{'twoCoin':v.coin_num==2}"></span><i v-if="v.type==1">无限币</i><i v-else>{{v.coin_num}}币</i>
      </div>
      <div class="recharge-item-b">{{v.coin_price}}元<span
        v-if="v.sale_state == 1 && v.original_price">({{v.original_price}}元)</span></div>
      <div class="recharge-hot hot-limit" v-if="v.coin_buy_state==1 && v.status != 0">限购<br/>{{v.coin_buy_num}}次</div>
      <div class="recharge-hot hot-top" v-if="v.remarks != null && v.remarks != '' && v.status != 0">
        {{v.remarks.substr(0, 4)}}
      </div>
      <div class="recharge-has" v-if="v.status == 0">已领取</div>
    </div>
  </div>
</template>

<script>
  import {instance} from '../config/common'
  import {mapState} from 'vuex'
  import CONFIG from '../config'
  import {SetCookie, getErrMsg, changeTipOperation, payment} from '../util'

  export default {
    data() {
      return {
        isActive: false,
        isRequest: false
      }
    },
    computed: mapState({
      user: state => state.user.user,
      coin: state => state.user.coin,
      machine_no: state => state.user.machine_no,
      info: state => state.user.info,
      hide_coupons: state => state.user.hide_coupons,
      tip_operation: state => state.user.tip_operation,
      isLogin:state => state.user.isLogin
    }),
    mounted() {
//      this.getCoinList()
      if(this.isLogin){
        this.$store.dispatch('getCoinList');
      }
    },
    methods: {
      handlePayBefore(pay) {
        if (pay.status === 0) {
          return false;
        }
        var hideArr = JSON.parse(localStorage.getItem('hide_coupons')) || [];
        var date = new Date();
        var time = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
        if (hideArr.length > 0 && hideArr.indexOf(JSON.stringify({time: time, id: pay.coin_price_id})) !== -1) {
          this.handlePay(pay.coin_price_id, pay.coin_num, pay.status, pay.coin_price, pay.type);
        } else {
          if (hideArr.length > 0) {
            for (var j = 0; j < hideArr.length; j++) {
              if (JSON.parse(hideArr[j]).id === pay.coin_price_id) {
                hideArr.splice(j, 1);
                break;
              }
            }
          }
          hideArr.push(JSON.stringify({time: time, id: pay.coin_price_id}));
          localStorage.setItem('hide_coupons', JSON.stringify(hideArr));
          //在这里得到充值项的优惠券
          var currentCouponPay;
          var len = this.hide_coupons.length;
          for (var i = 0; i < len; i++) {
            if (this.hide_coupons[i].after_coin_price_id) {
              if (this.hide_coupons[i].after_coin_price_id.indexOf(pay.coin_price_id) !== -1) {
                currentCouponPay = this.hide_coupons[i].coin_price;
                break;
              }
            }
          }
          if (currentCouponPay) {
            if (pay.coin_price === "2.00") {
              _hmt.push(['_trackEvent', '弹出2元下面优惠券', '点击', '', '']);
            } else if (pay.coin_price === "10.00") {
              _hmt.push(['_trackEvent', '弹出10元下面优惠券', '点击', '', '']);
            }
            this.$emit('changeBgShow', {
              bgShow: true,
              contentShow: 'hideCoupon',
              pay: pay,
              currentCouponPay: currentCouponPay
            });
          } else {
            this.handlePay(pay.coin_price_id, pay.coin_num, pay.status, pay.coin_price, pay.type);
          }
        }
      },
      handlePay(id, coin, status, price, type) {
        if (!this.isRequest) {
          this.isRequest = true;
          if (this.info.online === 0) {
            this.$store.commit('changeTipContent', getErrMsg(1001));
            this.isRequest = false;
            return
          }
          let self = this
          //status为0不可购买
          if (status === 0) {
            return false;
          }
          if (price == '0.00') {
            //免费请求
            this.$store.dispatch('getFreeCoin', {coin_price_id: id}).then((data) => {
              if (data.status_code == 200) {
                this.$store.dispatch('getCoinList').then(() => {
                  this.isRequest = false;
                  this.$store.dispatch('getUser');
                }).catch(() => {
                  this.isRequest = false;
                });
              } else {
                this.isRequest = false;
              }
            }).catch(() => {
              this.isRequest = false;
            });
          } else if (type == 1 && this.user.coin_infinite > 0) {
            this.$store.dispatch('InfiniteGame').then(() => {
              this.$emit('alertTip');
              this.isRequest = false;
            }).catch(() => {
              this.isRequest = false;
            });
          } else {
            payment(CONFIG, {coin_price_id: id}, self, function () {
              self.isRequest = false;
              try {
                if (self.tip_operation.recharged) {
                  changeTipOperation(self.tip_operation.recharged, 'alreadyTipRecharged', self.$store);
                }
              } catch (err) {
              }
              if (type !== 1) {
                self.$store.commit('setCoins', coin)
                self.$emit('closeBg');
              } else {
                self.$store.dispatch('InfiniteGame').then(() => {
                  self.$emit('changeTip');
                })
              }
              setTimeout(() => {
                self.$store.dispatch('getUser')
                self.$store.dispatch('getCoinList');
              }, 1000)
            })
          }
        }
      }
    },
    watch:{
      isLogin(){
        this.$store.dispatch('getCoinList');
      }
    }
  }
</script>

<style>
  .recharge-lists {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px 22px 0 22px;
  }

  .recharge-lists > div {
    margin: 0 0 22px 0;
    font-size: 36px;
    float: right;
    width: 342px;
    /*height: 1.28px;*/
    height: 37.87%;
    border: 1px solid #fd643b;
    /*border-radius: 0.15px;*/
    color: #494949;
    position: relative;
  }

  .recharge-lists .active {
    color: #666;
    border: 1px solid #999;
  }

  .recharge-lists .active .recharge-item-t {
    color: #666;
  }

  .recharge-lists .active .recharge-item-t span {
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_2bi.png") no-repeat;*/
    background: url("./../assets/small/icon_recharge_2bi.png") no-repeat;
    background-size: 100% 100%;
  }

  .recharge-lists .infinity .recharge-item-t span {
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_charge_nbi.png") no-repeat;*/
    background: url("./../assets/small/icon_charge_nbi.png") no-repeat;
    background-size: 100% 100%;
  }

  .recharge-lists .active .recharge-item-b {
    color: #fff;
    background: #999;
  }

  .recharge-lists .active .recharge-item-b span {
    color: #fff;
  }

  .recharge-lists > div:nth-child(odd) {
    float: left;
  }

  .recharge-item-b {
    height: 61px;
    line-height: 61px;
    /*font-size: 0.32px;*/
    font-size: 34px;
    background: #fb643b;
    color: #fff;
    /*border-radius: 0 0 0.15px 0.15px;*/
    text-align: center;
  }

  .recharge-item-b span {
    /*font-size: 0.24px;*/
    font-size: 22px;
    text-decoration: line-through;
    /*margin: 0 0 0 0.1px;*/
  }

  .recharge-item-t {
    height: 68px;
    font-size: 36px;
    color: #353535;
    line-height: 68px;
    text-align: center;
    background: #fff;
    /*border-radius: 0.15px 0.15px 0 0;*/
  }

  .recharge-item-t span {
    width: 39px;
    height: 42px;
    display: inline-block;
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_bi.png") no-repeat;*/
    background: url("./../assets/small/icon_recharge_bi.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 10px 0 0;
    vertical-align: middle;
  }

  .recharge-item-t i {
    display: inline-block;
    vertical-align: middle;
  }

  .recharge-item-t span.twoCoin {
    width: 32px;
    height: 38px;
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_2bi.png") no-repeat;*/
    background: url("./../assets/small/icon_recharge_2bi.png") no-repeat;
    background-size: 100% 100%;
  }

  /*.hot-limit{*/
  /*width: 1.3px;*/
  /*}*/

  .recharge-hot {
    width: 114px;
    height: 46px;
    /*line-height: 24px;*/
    position: absolute;
    left: -12px;
    top: -10px;
    color: #fff;
    /*background: url("./../assets/jiewu/bg_limit.png") no-repeat;*/
    background: url("./../assets/small/recharge_tab2.png") no-repeat;
    background-size: 100% 100%;
    font-size: 24px;
    /*text-align: center;*/
    /*line-height: 28px;*/
    /*padding: 2px 3px 10px 3px;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .recharge-has {
    width: 114px;
    height: 46px;
    /*line-height: 24px;*/
    position: absolute;
    left: -12px;
    top: -10px;
    color: #fff;
    /*background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/bg_ed.png") no-repeat;*/
    background: url("./../assets/small/recharge_tab_use.png") no-repeat;
    background-size: 100% 100%;
    /*font-size: 0.2px;*/
    font-size: 24px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hot-top {
    /*padding: 0 0.26px 0 0.1px;*/
    /*min-width: 1.3px;*/
    z-index: 2;
  }

  .version2 .recharge-lists {
    padding: 0 18px;
  }

  .version2 .recharge-lists > div {
    width: 348px;
  }

  .version2 .recharge-item-t {
    height: 84px;
    font-size: 38px;
    line-height: 84px;
  }

  .version2 .recharge-item-b {
    height: 75px;
    line-height: 75px;
    font-size: 34px;
  }

  .version2 .recharge-item-t span {
    width: 44px;
    height: 48px;
  }

  .version2 .recharge-item-t span.twoCoin {
    width: 35px;
    height: 42px;
  }

  .version2 .recharge-item-t span.infinite {
    width: 56px;
    height: 58px;
  }

  .version2 .recharge-lists > div {
    margin: 0 0 18px 0;
  }

  /*.version2 .recharge-has, .version2 .recharge-hot {*/
  /*width: 68px;*/
  /*height: 76px;*/
  /*font-size: 26px;*/
  /*line-height: 32px;*/
  /*}*/

</style>
