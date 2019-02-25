<template>
  <div class="operations" v-if="operations.length>0 && imgscurrent.length>0" :class="{'operations-version2':version2}">

    <div v-for="(item,index) in operations.slice(0,1)">
      <!--运营位类别:优惠券-->
      <div v-if="item.type === 1 || item.type === 7">
        <!--优惠券样式类型、优惠券状态-->
        <img @click.prevent="" v-if="item.coupon.status === 0" :src="imgscurrent[index].img_receive"
             @click="consumer(index,item.coupon.id,item.coin_price.coin_price_id,item.coupon.type,item.coin_price.coin_num,item.coin_price.type,item.type,item.mp_url)"
             id="free_doll"/>
        <img @click.prevent="" v-else-if="item.coupon.status === 1 && item.coupon.type !==2"
             :src="imgscurrent[index].img_use"
             @click="useCoupons(item.coupon.id,item.coin_price.coin_price_id,item.coupon.type,item.coin_price.coin_num,item.coin_price.type)"/>
        <img @click.prevent="" v-else="" :src="imgscurrent[index].img_already_use"
             @click="useInfinite(item.coin_price.type)">

        <!--优惠券最左边文字-->
        <span v-cloak v-if="item.coupon.type === 2 && item.coin_price.type === 0"
              class="quan_game_num quan_coin_num" :class="{'quan_coin_num_use':item.coupon.status===2}">{{item.coin_price.coin_num}}<b>币</b></span>
        <span v-if="item.coupon.type !== 2 && item.coin_price.type === 0" class="quan_game_num">优惠</span>
        <span v-if="item.coin_price.type === 1" class="quan_game_num">无限</span>
        <!--优惠券最左边文字-->

        <!--优惠券类型不是免费玩的打折前的价格-->
        <span style="pointer-events: none;" v-if="item.coupon.type !== 2"
              class="cost-price">{{item.coin_price.coin_price}}元</span>
        <!--优惠券类型不是免费玩的打折前的价格-->

        <!--打折后的价格根据优惠券类型计算价格：普通模式-->
        <span style="pointer-events: none;" v-if="item.coin_price.type === 0 && item.coupon.type===1"
              class="put-tip">{{(item.coin_price.coin_price - item.coupon.reduce).toFixed(2) | handleNum}}元</span>
        <span style="pointer-events: none;" v-if="item.coin_price.type === 0 && item.coupon.type===0 " class="put-tip">{{(item.coin_price.coin_price * item.coupon.reduce / 100).toFixed(2) | handleNum}}元</span>
        <!--打折后的价格根据优惠券类型计算价格：普通模式-->

        <!--中间的提示：若优惠券绑定的充值项为无限玩就会显示价格-->
        <p class="infinity-tip" style="pointer-events: none;" :class="{'already-use':item.coupon.status===2}">
          <span
            v-if="item.coin_price.type === 1 && item.coupon.type===1">{{(item.coin_price.coin_price - item.coupon.reduce).toFixed(2) | handleNum}}元</span>
          <!--<span-->
          <!--v-if="item.coin_price.type === 1 && item.coupon.type===0">{{(item.coin_price.coin_price * item.coupon.reduce / 100).toFixed(2) | handleNum}}元</span><span>{{item.coupon.title}}</span>-->
        </p>
        <!--中间的提示：若优惠券绑定的充值项为无限玩就会显示价格-->

        <!--优惠券如果是已经使用的状态的章子图片-->
        <img @click.prevent="" v-if="item.coupon.status === 2 && item.coupon.type !== 2" class="used"
             src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/used.png" alt="">
        <!--优惠券如果是已经使用的状态的章子图片-->
      </div>
      <!--运营位类别:红包-->
      <div v-if="item.type === 4" @click="consumerRed(item)" id="luck_draw">
        <!--<span class="quan_game_num">抽奖</span>-->
        <span style="pointer-events: none;" class="put-tip high-money"
              :class="{'already-use':item.coupon.status===2}">最高88元</span>
        <p class="infinity-tip" style="pointer-events: none;" :class="{'already-use':item.coupon.status===2}">
          <span v-if="item.timeType === 'unreceived' || item.timeType === 'notPrize'">幸运抽大奖</span><span
          v-if="item.timeType !== 'unreceived' && item.coupon.type===3">{{(item.coin_price.coin_price - item.coupon.reduce).toFixed(2) | handleNum}}元{{item.coin_price.coin_num}}币</span>
          <span v-if="item.timeType !== 'unreceived' && item.coupon.type===4">{(item.coin_price.coin_price * item.coupon.reduce / 100).toFixed(2) | handleNum}}元{{item.coin_price.coin_num}}币</span>
        </p>
        <img @click.prevent="" v-if="item.timeType === 'unreceived'" :src="time.unreceived" alt="">
        <img @click.prevent="" v-if="item.timeType === 'received'" :src="time.received" alt="">
        <img @click.prevent="" v-if="item.timeType === 'notPrize'" :src="time.notPrize" alt="">
        <img @click.prevent="" v-if="item.timeType === 'used'" :src="time.used" alt="">
        <img @click.prevent="" v-if="item.coupon.status === 2 && item.coupon.type !== 2" class="used"
             src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/used.png" alt="">
      </div>

      <div v-if="item.type===2" @click="openXcx(item.url,item.action)">
        <img v-if="version2" :src="item.image_big" alt="">
        <img v-else="" :src="item.image_small" alt="">
        <span v-if="item.remark" class="more" @click.stop="openDetails(item.remark)"></span>
      </div>

      <!--<div v-if="item.type === 7" @click="openFree">-->
        <!--<img :src="gzhImg1" alt="">-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import {getErrMsg, changeTipOperation, payment} from './../util/index'
  import api from './../api/index'
  export default {
    name: 'operations',
    mounted() {
      if (this.version2) {
        this.imgs = this.imgs2;
        this.time = this.time2;
        this.gzhImg1 = this.gzhImg2;
      }
//      需要根据优惠券的样式类型判断
        this.mountedStart();
    },
    data() {
      return {
        isRequest: false,
        isRequestFree: false,
        gzhImg1:require('./../assets/catch2/free_one.png'),
        gzhImg2: require('./../assets/catch2/free_one2.png'),
        imgs: {
          free: {
            img_receive: require('./../assets/ring/free_one.png'),
            img_use: require('./../assets/ring/free_two.png'),
            img_already_use: require('./../assets/catch2/free_used.png')
          },
          infinity: {
            img_receive: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_201.png',
            img_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_201_use1.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_card_20_used1.png'
          },
          newUser: {
            img_receive: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_un1.png',
            img_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_use1.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_used1.png'
          }
        },
        time: {
          'unreceived': 'http://res.catchme.com.cn/imgs-2018-04-10/draw1.png',
          'received': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_use.png',
          'used': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_used.png',
          'notPrize': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_no.png',
        },
        imgs2: {
          free: {
            img_receive: require('./../assets/ring/free_long_one.png'),
            img_use: require('./../assets/ring/free_long_two.png'),
            img_already_use: require('./../assets/catch2/free_used2.png')
          },
          infinity: {
            img_receive: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_202.png',
            img_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_20_use2.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_20_used2.png'
          },
          newUser: {
            img_receive: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_un2.png',
            img_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_use2.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/quan_new_used2.png'
          }
        },
        time2: {
          'unreceived': 'http://res.catchme.com.cn/imgs-2018-04-10/draw2.png',
          'received': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_use2.png',
          'used': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_used2.png',
          'notPrize': 'http://res.catchme.com.cn/imgs-2018-04-10/draw_no2.png',
        },
        imgscurrent: []
      }
    },
    computed: mapState({
      user: state => state.user.user,
      info: state => state.user.info,
      operations: state => state.user.operations,
      tip_operation: state => state.user.tip_operation,
    }),
    methods: {
      mountedStart(){
        this.$store.dispatch('getOperations').then((res) => {
          //运营位获取完成时间
          var coupon_time = Date.now() - (localStorage.getItem('startTime2') ? localStorage.getItem('startTime2') : performance.timing.navigationStart);
          localStorage.removeItem('startTime2')
          if(localStorage.getItem('userTime') && localStorage.getItem('domTime')){
            this.sendTimeOthers(coupon_time);
          }else {
            var inter = setInterval(()=>{
              if(localStorage.getItem('userTime') && localStorage.getItem('domTime')){
                this.sendTimeOthers(coupon_time);
                clearInterval(inter);
              }
            },500)
          }

          var isLinkOut = localStorage.getItem('isLinkOut');
          if (isLinkOut === 'true') {
            localStorage.setItem('isLinkOut', 'false');
          } else {
            if (this.tip_operation.enter) {
              changeTipOperation(this.tip_operation.enter, 'alreadyTipEnter', this.$store);
            }
          }
          //还会有一个类型的运营位，作用如果该运营位包含该充值项的话，当点击充值项时，直接使用优惠券去付款
          for (var i = 0; i < res.length; i++) {
            if (res[i].type === 1 || res[i].type === 7) {
              //根据优惠券样式来获取背景图片
              //充值项类型为无限玩单独处理
              if (res[i].coupon.type === 2 && res[i].coupon.status === 1) {
                var coin = res[i].coin_price.coin_num;
                this.$store.dispatch('getFreeCoin', {
                  coin_price_id: res[i].coin_price.coin_price_id,
                  coupon_id: res[i].coupon.id
                }).then(() => {
                  this.$store.commit('setCoins', coin);
                  this.$store.dispatch('getOperations')
                });
              }
              if (res[i].coin_price.type === 1) {
                this.imgscurrent.push(this.imgs.infinity);
              } else {
                switch (res[i].coupon.style) {
                  case 1:
                    this.imgscurrent.push(this.imgs.newUser);
                    break; //首单立减
                  case 2:
                    this.imgscurrent.push(this.imgs.free);
                    break; //免费玩一次
                  case 3:
                    this.imgscurrent.push(this.imgs.infinity);
                    break; //无限玩
                  default:
                    this.imgscurrent.push(this.imgs.newUser);
                    break; //默认
                }
              }
            } else {
              this.imgscurrent.push({});
            }
          }
        })
      },
//      openFree(){
//        this.$emit('openTip','free');
//      },
      sendTimeOthers(coupon_time){
        api.timeOthers({
          token:CONFIG.token,
          log_id:localStorage.getItem('log_id'),
          auth_time:localStorage.getItem('warrantTime') ? localStorage.getItem('warrantTime') : 0,
          dom_time:localStorage.getItem('domTime'),
          coupon_time:coupon_time,
          use_time:localStorage.getItem('userTime')
        })
        localStorage.removeItem('warrantTime');
        localStorage.removeItem('userTime');
        localStorage.removeItem('domTime');
      },
      openDetails(operationTipContent) {
        this.$emit('changeBgShow', {
          bgShow: true,
          contentShow: 'operationTip',
          operationTipContent: operationTipContent
        });
      },
      openXcx(url, action) {
        if (action == 2) {
          window.location.href = url;//跳转页面
        }
      },
      consumerRed(item) {
        if (item.timeType === 'unreceived') {
          _hmt.push(['_trackEvent', '新春抽大奖', '点击', '', '']);
          this.$store.dispatch('redReceive', item.record_id);
          this.$store.dispatch('getOperations');
          if (item.coupon.id === -1) {
            this.$emit('changeBgShow', {bgShow: true, contentShow: 'unRedCoupon'});
          } else {
            this.$emit('changeBgShow', {bgShow: true, contentShow: 'redCoupon', currentCoupon: item});
          }
        } else if (item.timeType === 'received') {
          _hmt.push(['_trackEvent', '直接使用红包', '点击', '红包价格为' + (item.coin_price.coin_price - item.coupon.reduce) + '元', '']);
          //调用充值
          this.useCoupons(item.coupon.id, item.coin_price.coin_price_id, item.coupon.type, item.coin_price.coin_num, item.coin_price.type, item.coin_price.coin_price, item.coupon.reduce);
        }
      },
      //领取优惠券
      consumer(index, coupon_id, coin_price_id, coupon_type, coin, type,opType,imgUrl) {
        //类型为7的运营位，如果是支付宝的话直接按原来，如果是微信的话弹窗
        if(opType === 7){
          if(CONFIG.isWx){
            this.$emit('openTip','free',imgUrl);
            return;
          }
        }
        if (!this.isRequestFree) {
          this.isRequestFree = true;
          this.$store.dispatch('consumer', {coupon_id: coupon_id}).then(() => {
            _hmt.push(['_trackEvent', '领取抓娃娃优惠券', '点击', '免费抓娃娃优惠券', '']);
            if (coupon_type === 2) {
              this.useCoupons(coupon_id, coin_price_id, coupon_type, coin, type);
            } else if (type === 1) {
              this.$emit('changeBgShow', {
                bgShow: true,
                contentShow: 'infinityTip',
                currentCoupon: this.operations[index]
              });
            } else {
              this.$emit('changeBgShow', {bgShow: true, contentShow: 'newUser', currentCoupon: this.operations[index]});
            }
            if (coupon_type !== 2) {
              this.operations[index].coupon.status = 1;
            }
          })
        }
      },
      useCoupons(coupon_id, coin_price_id, coupon_type, coin, type, coin_price, reduce) {
        if (!this.isRequest) {
          this.isRequest = true;
          var actualPrice;
          if (coupon_type === 4) {
            actualPrice = coin_price * reduce / 100;
          } else if (coupon_type === 3) {
            actualPrice = coin_price - reduce;
          }
          if (coupon_type === 2 || actualPrice === 0) {
            this.$store.dispatch('getFreeCoin', {coin_price_id: coin_price_id, coupon_id: coupon_id}).then((data) => {
              this.$store.commit('setCoins', coin);
              this.$store.dispatch('getUser');
              for(var i=0;i<this.operations.length;i++){
                if(this.operations[i].coupon.type ===2){
                  this.operations[i].coupon.status = 2;
                  break;
                }
              }
              this.isRequest = false;
              this.isRequestFree = false;
//              this.$store.dispatch('getOperations').then(() => {
//                this.isRequest = false;
//                this.isRequestFree = false;
//              })
              this.$emit('closeBg');
            })
          } else {
            if (this.info.online === 0) {
              this.$store.commit('changeTipContent', getErrMsg(1001));
              this.isRequest = false;
              return
            }
            var self = this;
            payment(CONFIG, {coin_price_id: coin_price_id, coupon_id: coupon_id}, self, function () {
              self.isRequest = false;
              try {
                if (self.tip_operation.recharged) {
                  changeTipOperation(self.tip_operation.recharged, 'alreadyTipRecharged', self.$store);
                }
              }catch(err) {}
              if (type !== 1) {
                self.$store.commit('setCoins', coin);
                self.$emit('closeBg');
              } else {
                //type为1是无限模式
                self.$store.dispatch('InfiniteGame').then(() => {
                  self.$emit('changeTip');
                });
              }
              setTimeout(()=>{
                self.$store.dispatch('getUser')
                self.$store.dispatch('getOperations')
              },1000)
            });
          }
        }
      },
      useInfinite(type) {
        if (type === 1 && this.user.coin_infinite > 0) {
          this.$store.dispatch('InfiniteGame');
        }
      },
    },
    filters:{
//      回头兼容一下那个优惠券上次数的展示。不足一次的不展示，大于等于一次的，向下取整展示
      handleN(value){
        try {
        var valueNumber = Number(value.substr(0,value.length-1));
        if(valueNumber<1){
          return '';
        } else if(valueNumber>=1){
          return Math.floor(valueNumber)+'次';
        }
      }catch(err){
          return '';
        }
      }
    },
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  .more {
    width: 32px;
    height: 32px;
    position: absolute;
    bottom: 16px;
    right: 16px;
    text-align: left;
    background: url("http://cdn.catchme.com.cn/operation/1522735323.3796.png") no-repeat;
    background-size: 100% 100%;
  }

  .operations > div .price {
    width: 226px;
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
  }

  .operations {
    /*width: 100%;*/
    /*height: 100%;*/
    /*height: 1.78px;*/
    /*height: 100%;*/
    /*padding: 0 22px;*/
    position: absolute;
    bottom: 0;
    left: 20px;
  }

  .operations > div img {
    width: 178px;
    /*max-height: 1.78px;*/
    /*height: 2px;*/
    /*height: 100%;*/
    display: block;
    float: left;
  }

  .operations > div .used {
    width: 181px;
    position: absolute;
    right: -40px;
    top: 60px;
    z-index: 3;
  }

  .operations > div .infinity-tip {
    color: #fff;
    position: absolute;
    left: 123px;
    top: 60px;
    /*font-size: 0.34px;*/
    /*line-height: 0.34px;*/
    font-size: 36px;
    line-height: 36px;
  }

  .operations > div .put-tip {
    color: #fff;
    position: absolute;
    left: 123px;
    top: 26px;
    font-size: 34px;
    line-height: 34px;
  }
  .operations > div .high-money{
    font-size: 22px;
  }


  .operations > div .already-use {
    color: #aaa;
  }

  .operations > div .cost-price {
    color: #fff;
    text-decoration: line-through;
    font-size: 34px;
    line-height: 34px;
    position: absolute;
    /*right: 0.3px;*/
    right: 12px;
    top: 26px;
  }

  .operations > div .quan_game_num {
    position: absolute;
    left: 36px;
    top: 76px;
    width: 50px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    line-height: 22px;
  }
  .operations > div .quan_coin_num{
    font-size: 50px;
    line-height: 50px;
    width: 70px;
    top:16px;
    left:80px;
    text-align: left;
  }
  .operations > div .quan_coin_num_use{
    color: #bdbdbd;
  }
  .operations > div .quan_coin_num b{
    font-size: 20px;
  }



  .operations > div:first-of-type > div {
    float: left !important;
  }

  .operations > div > div {
    float: left;
    position: relative;
    overflow: hidden;
  }

  .operations > div:last-of-type > div {
    float: right;
  }

  .operations .ptip {
    position: absolute;
    color: #ff4848;
    font-size: 50px;
    left: 0;
    top: 15px;
    width: 342px;
    text-align: center;
    font-weight: 600
  }

  .operations-version2 > div img {
    width: 204px;
  }
  .operations-version2 > div .quan_coin_num{
    top:18px;
    left: 96px;
  }

</style>
