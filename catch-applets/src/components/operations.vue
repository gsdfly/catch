<template>
  <div class="operations" v-if="operations.length>0 && imgscurrent.length>0">
    <div v-for="(item,index) in operations" :key="index">
      <!--运营位类别:优惠券-->
      <div v-if="item.type === 1">
        <!--优惠券样式类型、优惠券状态-->
        <img @click.prevent="" v-if="item.coupon.status === 0" :src="imgscurrent[index].img_receive"
             @click="consumer(item.id,item.title,index,item.coupon.id,item.coin_price.coin_price_id,item.coupon.type,item.coin_price.coin_num,item.coin_price.type)"
             id="free_doll" mode="widthFix"/>
        <img @click.prevent="" v-else-if="item.coupon.status === 1 && item.coupon.type !==2"
             :src="imgscurrent[index].img_use"
             @click="useCoupons(item.coupon.id,item.coin_price.coin_price_id,item.coupon.type,item.coin_price.coin_num,item.coin_price.type)"
             mode="widthFix"/>
        <img @click.prevent="" v-else="" :src="imgscurrent[index].img_already_use"
             @click="useInfinite(item.coin_price.type)" mode="widthFix">

        <!--优惠券最左边文字-->
        <span v-if="item.coupon.type === 2 && item.coin_price.type === 0"
              class="quan_game_num">{{item.coin_price.coin_num / info.coin_num}}次</span>
        <span v-if="item.coupon.type !== 2 && item.coin_price.type === 0" class="quan_game_num">优惠</span>
        <span v-if="item.coin_price.type === 1" class="quan_game_num">无限</span>
        <!--优惠券最左边文字-->

        <!--优惠券类型不是免费玩的打折前的价格-->
        <span v-if="item.coupon.type !== 2"
              class="cost-price">{{item.coin_price.coin_price}}元</span>
        <!--优惠券类型不是免费玩的打折前的价格-->

        <!--打折后的价格根据优惠券类型计算价格：普通模式-->
        <span v-if="item.coin_price.type === 0 && item.coupon.type===1"
              class="put-tip">{{(item.coin_price.coin_price - item.coupon.reduce)}}元</span>
        <span v-if="item.coin_price.type === 0 && item.coupon.type===0 "
              class="put-tip">{{(item.coin_price.coin_price * item.coupon.reduce / 100)}}元</span>
        <!--打折后的价格根据优惠券类型计算价格：普通模式-->

        <!--中间的提示：若优惠券绑定的充值项为无限玩就会显示价格-->
        <p class="infinity-tip" :class="{'already-use':item.coupon.status === 2}">
          <span
            v-if="item.coin_price.type === 1 && item.coupon.type===1">{{(item.coin_price.coin_price - item.coupon.reduce)}}元</span><span
          v-if="item.coin_price.type === 1 && item.coupon.type===0">{{(item.coin_price.coin_price * item.coupon.reduce / 100)}}元</span><span>{{item.coupon.title}}</span>
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
        <span class="top-tip" :class="{'already-use':item.coupon.status === 2}">最高88元</span>
        <p class="infinity-tip" :class="{'already-use':item.coupon.status === 2}">
          <span v-if="item.timeType === 'unreceived' || item.timeType === 'notPrize'">幸运抽大奖</span><span
          v-if="item.timeType !== 'unreceived' && item.coupon.type===3">{{(item.coin_price.coin_price - item.coupon.reduce)}}元{{item.coin_price.coin_num}}币</span>
          <span v-if="item.timeType !== 'unreceived' && item.coupon.type===4">{(item.coin_price.coin_price * item.coupon.reduce / 100)}}元{{item.coin_price.coin_num}}币</span>
        </p>
        <img @click.prevent="" v-if="item.timeType === 'unreceived'" :src="time.unreceived" alt="" mode="widthFix">
        <img @click.prevent="" v-if="item.timeType === 'received'" :src="time.received" alt="" mode="widthFix">
        <img @click.prevent="" v-if="item.timeType === 'notPrize'" :src="time.notPrize" alt="" mode="widthFix">
        <img @click.prevent="" v-if="item.timeType === 'used'" :src="time.used" alt="" mode="widthFix">
        <img @click.prevent="" v-if="item.coupon.status === 2 && item.coupon.type !== 2" class="used"
             src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/used.png" alt="" mode="widthFix">
      </div>
      <!--运营位类别:跳转小程序-->

      <div v-if="item.type===2" @click="openXcx(item.url,item.action)">
        <img v-if="version2" :src="item.image_big" alt="" mode="widthFix">
        <img v-else="" :src="item.image_small" alt="" mode="widthFix">
        <span v-if="item.remark" class="more" @click.stop="openDetails(item.remark)"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import {getErrMsg, changeTipOperation, payment} from './../utils/index'

  export default {
    name: 'operations',
    mounted() {
      if (this.version2) {
        this.imgs = this.imgs2;
        this.time = this.time2;
      }
//      需要根据优惠券的样式类型判断
//      if(this.isLogin){
//        this.handleOperations();
//      }
    },
    data() {
      return {
        isRequest: false,
        version2: this.version2,
        isRequestFree: false,
        imgs: {
          free: {
            img_receive: 'http://res.catchme.com.cn/imgs-2018-04-10/quan_free_un.png',
            img_use: 'http://res.catchme.com.cn/imgs-2018-04-10/quan_free.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2018-04-10/card_free_used.png'
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
            img_receive: 'http://res.catchme.com.cn/imgs-2018-04-10/quan_free_un2.png',
            img_use: 'http://res.catchme.com.cn/imgs-2018-04-10/quan_free2.png',
            img_already_use: 'http://res.catchme.com.cn/imgs-2018-04-10/card_free_used2.png'
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
//      isLogin:state => state.user.isLogin
    }),
    methods: {
      openDetails(operationTipContent) {
        this.$emit('changeBgShow', {
          bgShow: true,
          contentShow: 'operationTip',
          operationTipContent: operationTipContent
        });
      },
      openXcx(url, action) {
        if (action == 1) {
          wx.navigateToMiniProgram({
            appId: url,
            fail: function (err) {
              console.log(err);
            }
          })
        } else if (action == 2) {
          this.$store.commit('changePayBack', true);
          wx.navigateTo({
            url: "../web/web?url=" + url
          })
        }
      },
      handleOperations(res) {
//        this.$store.dispatch('getOperations').then((res) => {
        //还会有一个类型的运营位，作用如果该运营位包含该充值项的话，当点击充值项时，直接使用优惠券去付款
        for (var i = 0; i < res.length; i++) {
          if (res[i].type === 1) {
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
//        })
      },
      consumerRed(item) {
        if (item.timeType === 'unreceived') {
          this.$store.dispatch('redReceive', item.record_id);
          this.$store.dispatch('getOperations');
          if (item.coupon.id === -1) {
            this.page.aldstat.sendEvent('红包抽奖未抽中')
            this.$emit('changeBgShow', {bgShow: true, contentShow: 'unRedCoupon'});
          } else {
            this.page.aldstat.sendEvent('红包抽奖抽中', {
              '红包': item.coupon.title
            })
            this.$emit('changeBgShow', {bgShow: true, contentShow: 'redCoupon', currentCoupon: item});
          }
        } else if (item.timeType === 'received') {
          this.page.aldstat.sendEvent('直接使用优惠券', {
            '优惠券': item.coupon.title
          });
          //调用充值
          this.useCoupons(item.coupon.id, item.coin_price.coin_price_id, item.coupon.type, item.coin_price.coin_num, item.coin_price.type, item.coin_price.coin_price, item.coupon.reduce);
        }
      },
      //领取优惠券
      consumer(id, title, index, coupon_id, coin_price_id, coupon_type, coin, type) {
        this.page.aldstat.sendEvent('点击运营位', {
          "id": "" + id,
          "title": "" + title
        });
        if (!this.isRequestFree) {
          this.isRequestFree = true;
          this.$store.dispatch('consumer', {coupon_id: coupon_id}).then(() => {
            if (coupon_type === 2) {
//            this.page.aldstat.sendEvent('领取免费玩优惠券');
              this.useCoupons(coupon_id, coin_price_id, coupon_type, coin, type);
            } else if (type === 1) {
              this.$emit('changeBgShow', {
                bgShow: true,
                contentShow: 'infinityTip',
                currentCoupon: this.operations[index]
              });
//            this.page.aldstat.sendEvent('领取无限玩优惠券');
            } else {
              this.$emit('changeBgShow', {bgShow: true, contentShow: 'newUser', currentCoupon: this.operations[index]});
//            this.page.aldstat.sendEvent('领取新人优惠券');
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
              this.$store.dispatch('getOperations').then(() => {
                this.isRequestFree = true;
                this.isRequest = false;
              })
              this.$emit('closeBg');
            });
          } else {
            if (this.info.online === 0) {
              this.$store.commit('changeTipContent', getErrMsg(1001));
              this.isRequest = false;
              return
            }
            var self = this;
            payment(CONFIG, {coin_price_id: coin_price_id, coupon_id: coupon_id}, self, function () {
              self.isRequest = false;
              if (self.tip_operation.recharged) {
                changeTipOperation(self.tip_operation.recharged, 'alreadyTipRecharged', self.$store);
              }
              if (type !== 1) {
                self.$store.commit('setCoins', coin);
                self.$emit('closeBg');
              } else {
                self.$store.dispatch('InfiniteGame').then(() => {
                  self.$emit('changeTip');
                });
              }
              self.$store.dispatch('getOperations');
            })
          }
        }
      },
      useInfinite(type) {
        if (type === 1 && this.user.coin_infinite > 0) {
          this.$store.dispatch('InfiniteGame');
        }
      },
    },
//    watch:{
//      isLogin(){
//        this.handleOperations();
//      }
//    }
  }
</script>

<style>
  .more {
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    bottom: 0.16rem;
    right: 0.16rem;
    background: url("http://cdn.catchme.com.cn/operation/1522735323.3796.png") no-repeat;
    background-size: 100% 100%;
  }

  .operations > div .price {
    width: 2.26rem;
    position: absolute;
    left: 50%;
    top: 0.3rem;
    transform: translateX(-50%);
  }

  .operations {
    width: 100%;
    /*height: 100%;*/
    /*height: 1.78rem;*/
    /*height: 100%;*/
    padding: 0 0.22rem;
    position: absolute;
    bottom: 0;
  }

  .operations > div img {
    width: 3.42rem;
    /*max-height: 1.78rem;*/
    /*height: 2rem;*/
    /*height: 100%;*/
    display: block;
    float: left;
  }

  .operations > div .used {
    width: 1.81rem;
    position: absolute;
    right: -0.4rem;
    top: 0.6rem;
    z-index: 3;
  }

  .operations > div .infinity-tip {
    color: #fff;
    position: absolute;
    left: 1.24rem;
    top: 0.6rem;
    /*font-size: 0.34rem;*/
    /*line-height: 0.34rem;*/
    font-size: 0.36rem;
    line-height: 0.36rem;
  }

  .operations > div .put-tip {
    color: #fff;
    position: absolute;
    left: 1.23rem;
    top: 0.26rem;
    font-size: 0.34rem;
    line-height: 0.34rem;
  }

  .operations > div .top-tip {
    color: #fff;
    position: absolute;
    left: 1.23rem;
    top: 0.3rem;
    /*font-size: 0.24rem;*/
    /*line-height: 0.24rem;*/
    font-size: 0.22rem;
    line-height: 0.22rem;
  }

  .operations > div .already-use {
    color: #aaa;
  }

  .operations > div .cost-price {
    color: #fff;
    text-decoration: line-through;
    font-size: 0.34rem;
    line-height: 0.34rem;
    position: absolute;
    /*right: 0.3rem;*/
    right: 0.12rem;
    top: 0.26rem;
  }

  .operations > div .quan_game_num {
    position: absolute;
    left: 0.36rem;
    top: 0.76rem;
    width: 0.5rem;
    text-align: center;
    color: #fff;
    font-size: 0.22rem;
    line-height: 0.22rem;
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
    font-size: 0.5rem;
    left: 0;
    top: 0.15rem;
    width: 3.42rem;
    text-align: center;
    font-weight: 600
  }

</style>
