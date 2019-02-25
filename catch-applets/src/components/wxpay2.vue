<template>
  <div class="wxpay clearfix" :class="{'version2':version2}">
    <div v-for="(v,index) in coin" :key="index"
         @click="handlePay(v.coin_price_id, v.coin_num,v.status,v.coin_price,v.type)" :class="{'active':v.status==0,'infinity':v.type==1}">
      <div class="recharge-item-t" ><span :class="{'twoCoin':v.coin_num==2}"></span><i v-if="v.type==1">无限币</i><i v-else>{{v.coin_num}}币</i></div>
      <div class="recharge-item-b">{{v.coin_price}}元<span v-if="v.sale_state == 1 && v.original_price">({{v.original_price}}元)</span></div>
      <div class="recharge-hot hot-limit" v-if="v.coin_buy_state==1 && v.status != 0">限购{{v.coin_buy_num}}次</div>
      <div class="recharge-hot hot-top" v-if="v.remarks != null && v.remarks != '' && v.status != 0">{{v.remarks}}</div>
      <div class="recharge-has" v-show="v.status==0">领取过啦</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import CONFIG from '../config'
  import {getErrMsg} from './../utils/index'

  export default {
    data() {
      return {
        isActive: false,
        isRequest:false,
        version2:this.version2
      }
    },
    computed: mapState({
      user: state => state.user.user,
      coin: state => state.user.coin,
      info: state => state.user.info,
    }),
    methods: {
      getCoinList() {
        this.$store.dispatch('getCoinList')
      },
      handlePay(id, coin, status, price,type) {
        if(!this.isRequest){
          this.isRequest = true;
          if (this.info.online === 0) {
            this.$store.commit('changeTipContent', getErrMsg(1001));
            this.isRequest = false;
            return
          }
          let self = this
          //status为0不可购买
          if(status === 0){
            return false;
          }
          if (price === '0.00') {
            //免费请求
            this.$store.dispatch('getFreeCoin',{coin_price_id:id}).then((data) => {
              this.isRequest = false;
              if(data.status_code === 200){
                this.$store.dispatch('getCoinList').then(() => {
                  this.$store.dispatch('getUser');
                });
              }
            }).catch(()=>{
              this.isRequest = false;
            });
          } else if(type===1 && this.user.coin_infinite > 0){
            this.$store.dispatch('InfiniteGame').then(()=>{
              this.$emit('alertTip');
              this.isRequest = false;
            }).catch(()=>{
              this.isRequest = false;
            });
          }else  {
              this.$store.dispatch('getPayJssdk', {coin_price_id:id})
                .then((data) => {
                  self.isRequest = false;
                  if (data.status_code === 200) {
                    const d = data.data
                    wx.requestPayment({
                      timeStamp: d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: d.nonceStr, // 支付签名随机串，不长于 32 位
                      package: d.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                      signType: d.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: d.paySign, // 支付签名
                      success: function (res) {
                        if(type !==1){
                          self.$store.commit('setCoins', coin)
                        }else {
                          self.$store.dispatch('InfiniteGame').then(()=>{
                            self.$emit('alertTip');
                          })
                        }
                        self.getCoinList()
                      }
                    })
                  }
                }).catch(()=>{
                self.isRequest = false;
              })
            }
          }
        }
      }
    }
</script>

<style>
  .wxpay {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 0.22rem;
  }

  .wxpay > div {
    margin: 0 0 0.22rem 0;
    font-size: 0.36rem;
    float: right;
    width: 3.42rem;
    /*height: 1.28rem;*/
    height: 37.87%;
    border: 1px solid #fd643b;
    /*border-radius: 0.15rem;*/
    color: #494949;
    position: relative;
  }

  .wxpay .active {
    color: #666;
    border: 1px solid #999;
  }

  .wxpay .active .recharge-item-t {
    color: #666;
  }

  .wxpay .active .recharge-item-t span {
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_2bi.png") no-repeat;
    background-size: 100% 100%;
  }

  .wxpay .infinity .recharge-item-t span {
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_charge_nbi.png") no-repeat;
    background-size: 100% 100%;
  }

  .wxpay .active .recharge-item-b {
    color: #fff;
    background: #999;
  }

  .wxpay .active .recharge-item-b span {
    color: #fff;
  }

  .wxpay > div:nth-child(odd) {
    float: left;
  }

  .recharge-item-b {
    height: 0.61rem;
    line-height: 0.61rem;
    /*font-size: 0.32rem;*/
    font-size: 0.34rem;
    background: #fb643b;
    color: #fff;
    /*border-radius: 0 0 0.15rem 0.15rem;*/
    text-align: center;
  }

  .recharge-item-b span {
    /*font-size: 0.24rem;*/
    font-size: 0.22rem;
    text-decoration: line-through;
    /*margin: 0 0 0 0.1rem;*/
  }

  .recharge-item-t {
    height: 0.68rem;
    font-size: 0.36rem;
    color: #353535;
    line-height: 0.68rem;
    text-align: center;
    background: #fff;
    /*border-radius: 0.15rem 0.15rem 0 0;*/
  }

  .recharge-item-t span {
    width: 0.39rem;
    height: 0.42rem;
    display: inline-block;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_bi.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 0.1rem 0 0;
    vertical-align: middle;
  }

  .recharge-item-t i {
    display: inline;
    vertical-align: middle;
  }

  .recharge-item-t span.twoCoin {
    width: 0.32rem;
    height: 0.38rem;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_recharge_2bi.png") no-repeat;
    background-size: 100% 100%;
  }

  /*.hot-limit{*/
  /*width: 1.3rem;*/
  /*}*/
  .recharge-hot {
    width: 0.63rem;
    height: 0.65rem;
    position: absolute;
    left: 0.1rem;
    top: -0.06rem;
    color: #fff;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/image_limite.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.28rem;
  }

  .recharge-has {
    width: 0.63rem;
    height: 0.68rem;
    position: absolute;
    left: 0.1rem;
    top: -0.06rem;
    padding: 0.04rem 0 0 0;
    color: #fff;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/bg_ed.png") no-repeat;
    background-size: 100% 100%;
    /*font-size: 0.2rem;*/
    font-size: 0.22rem;
    line-height: 0.26rem;
    z-index: 3;
    text-align: center;
  }

  .hot-top {
    /*padding: 0 0.26rem 0 0.1rem;*/
    /*min-width: 1.3rem;*/
    z-index: 2;
  }

  .version2 .wxpay {
    padding: 0 0.18rem;
  }

  .version2 .wxpay > div {
    width: 3.48rem;
  }

  .version2 .recharge-item-t {
    height: 0.84rem;
    font-size: 0.38rem;
    line-height: 0.84rem;
  }

  .version2 .recharge-item-b {
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.34rem;
  }

  .version2 .recharge-item-t span {
    width: 0.44rem;
    height: 0.48rem;
  }

  .version2 .recharge-item-t span.twoCoin {
    width: 0.35rem;
    height: 0.42rem;
  }

  .version2 .recharge-item-t span.infinite {
    width: 0.56rem;
    height: 0.58rem;
  }
  .version2 .wxpay > div {
    margin: 0 0 0.18rem 0;
  }
  .version2 .recharge-has,.version2 .recharge-hot{
    width: 0.68rem;
    height: 0.76rem;
    font-size: 0.26rem;
    line-height: 0.32rem;
  }

</style>
