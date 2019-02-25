<template>
  <div class="quanprogress" :class="{'quan-version2':version2}" v-if="showHtml">
    <img v-show="!userProgress.state" @click.prevent="" :src="img1" alt="" mode="widthFix">
    <img v-show="userProgress.state" @click.prevent="" :src="img3" alt="" mode="widthFix">
    <h3 @click="openActivityRule">活动规则</h3>
    <h4>价值{{cinemaInfo.price}}元小吃套餐，抓不中也有机会兑换</h4>
    <p>{{userProgress.voucher_list.length}}</p>
    <div class="exchange" @click="goExchange"></div>
    <div class="stars" v-show="!userProgress.state">
      <span class="star star1" v-for="(item,index2) in userProgress.grab_num" :key="index2"></span>
      <span class="star star2" v-for="(item,index2) in (10-userProgress.grab_num)" :key="index2"></span>
    </div>
    <div class="stars" v-show="userProgress.state">
      <span class="star star1" v-for="(item,index2) in 10" :key="index2"></span>
    </div>
  </div>
</template>

<script>
  import api from './../api/index'
  import CONFIG from './../config/index'
  import {mapState} from 'vuex'

  export default {
    name: 'quanprogress',
    data() {
      return {
        grab_num: 0,
        inter: {},
        isBand: false,
        timeOut: {},
        img1: 'http://res.catchme.com.cn/imgs-2018-02-06/2/card.png',
        img2: 'http://res.catchme.com.cn/imgs-2018-02-06/2/card2.png',
        img3: 'http://res.catchme.com.cn/imgs-2018-02-06/2/card_2.png',
        img4: 'http://res.catchme.com.cn/imgs-2018-02-06/2/card2_2.png',
        voucher:0,
        version2:this.version2
      }
    },
    props: ['cinemaInfo','showHtml'],
    computed: mapState({
        userProgress: state => state.user.user_progress,
      }),
    onShow(){
      console.log('222222222222222')
      this.$store.dispatch('getUserProgress').then((res) => {
        console.log(res)
        this.publicFunc(res);
      });
    },
    mounted() {
//      this.$store.dispatch('getUserProgress').then((res)=>{
//        this.voucher = res.voucher_list.length;
//        this.$emit('getVoucherLength',res.voucher_list.length);
//      })
      if (this.version2) {
        this.img1 = this.img2;
        this.img3 = this.img4;
      }
    },
    methods: {
      setVoucher(value){
        this.voucher = value
      },
      goExchange() {
        if (this.userProgress.voucher_list && this.userProgress.voucher_list.length === 0) {
          this.$emit('openTip', 'notExchange');
        } else {
          this.$emit('openTip', 'exchange');
        }
      },
      openActivityRule() {
        this.$emit('openTip', 'activityRule');
      },
      getFallback(gameNum) {
        if (JSON.stringify(this.inter) !== '{}') {
          clearTimeout(this.timeOut);
          this.timeOut = {};
        }
        if (JSON.stringify(this.inter) === '{}') {
          this.inter = setInterval(() => {
            this.$store.dispatch('getUserProgress').then((res) => {
              this.publicFunc(res);
            });
          }, 15000)
        }
        this.timeOut = setTimeout(() => {
          clearInterval(this.inter);
          this.inter = {};
        }, 45000 * gameNum);
      },
      publicFunc(res){
        if(res.grab_num === 1 && res.voucher_list.length===0){
          this.$emit('openTip', 'activityTip');
        }
        if((res.voucher_list.length - this.voucher) >= 1) {
          this.$emit('openTip', 'exchange');
          this.$emit('getVoucherLength', res.voucher_list.length);
          this.voucher = res.voucher_list.length;
        }
      }
    },
  }
</script>


<style>
  .quanprogress {
    width: 100%;
    height: 100%;
    position: relative;
    /*background: red;*/
  }

  .quanprogress img {
    width: 100%;
    /*height: 100%;*/
  }

  .quanprogress .stars {
    position: absolute;
    width: 5.25rem;
    /*background: red;*/
    top: 1.18rem;
    left: 0.47rem;
  }

  .quanprogress .stars .star {
    width: 0.45rem;
    height: 0.42rem;
    float: left;
    margin: 0 0.09rem 0 0;
  }

  .quanprogress .stars .star:last-of-type {
    margin: 0;
  }

  .quanprogress .stars .star1 {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/star1.png");
    background-size: 100% 100%;
  }

  .quanprogress .stars .star2 {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/star2.png");
    background-size: 100% 100%;
  }

  .quanprogress > h3 {
    position: absolute;
    padding: 0.04rem 0.15rem;
    line-height: 0.34rem;
    font-size: 0.24rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.17rem;
    top: 0.1rem;
    left: 0.1rem;
    color: #fefffc;
  }

  .quanprogress .exchange {
    position: absolute;
    width: 2.2rem;
    height: 0.5rem;
    right: 0;
    top: 0;
    z-index: 3;
  }

  .quanprogress p {
    width: 0.36rem;
    font-size: 0.28rem;
    color: #b04228;
    text-align: center;
    text-shadow: 1px 1px 1px #cf8706;
    position: absolute;
    right: 0.28rem;
    top: 0.08rem;
  }

  .quanprogress > h4 {
    font-size: 0.24rem;
    color: #fefffc;
    width: 4.64rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    position: absolute;
    top: 0.72rem;
    left: 1.05rem;
  }

  /*@media only screen and (min-device-aspect-ratio: 3/5) {*/
  /*.quanprogress .stars{*/
  /*top:1.32rem;*/
  /*}*/
  /*.quanprogress>h4{*/
  /*top:0.8rem;*/
  /*}*/
  /*}*/
  .quan-version2  .stars {
    top: 1.32rem;
  }

  .quan-version2 > h4 {
    top: 0.8rem;
  }

</style>

