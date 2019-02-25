<template>
  <div class="main" v-if="showHtml">
    <div>
      <div class="centerout">
        <div class="center">
          <h3 @click="handleScanQRCode" id="change_device">扫码换机<i class="iconfont icon-go"></i></h3>
          <button plain="true" class="startgame" :class="{'hasclick':start_desc == '投币中'}" id="coin-operated"
                  @click="handleStartingDevice">{{start_desc ? start_desc : '投币启动'}}
          </button>
          <div class="game-num norecharge" v-if="user.coins<=0 && user.game_ticket<=0">您还没有游戏币，请先充值<span></span>
          </div>
          <div class="game-num" v-else>
            <i id="coin_reduce" class="iconfont icon-jian" @click="handlerGameNum('-')" :class="{
                     'active': gameNum === 1
                 }"></i>
            <div>
              <h3>{{gameNum * info.coin_num}}币</h3>
              <p>可玩{{gameNum}}次游戏</p>
            </div>
            <i id="coin_add" class="iconfont icon-jia" @click="handlerGameNum('+')" :class="{
                     'active': ((gameNum + 1) * info.coin_num) > (user.coins+user.game_ticket*info.coin_num)
                 }"></i>
          </div>
          <img v-if="start_desc=='投币中'" class="tbz" src="http://res.catchme.com.cn/imgs-2018-02-05/tbz.gif" alt="">
          <img v-show="is_lamp_after && start_desc=='投币启动'" class="tbz"
               src="http://res.catchme.com.cn/imgs-2018-02-05/btcg.gif" alt="">
          <div class="tip">
            <p v-show="user.coins<=0 && user.game_ticket<=0 && !is_lamp_after">充值后点击“投币启动”按钮开始游戏</p>
            <p v-show="is_lamp_after && start_desc=='投币启动'">投币成功，<span>“摇动游戏杆”</span>即可开始游戏</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getErrMsg,getParamByName} from './../utils/index'

  export default {
    name:"main",
    data(){
      return {
        start_desc: '投币启动',
        gameNum: 1,
        is_start: false,
        is_lamp_after: false,
        time:{}
      }
    },
    props:['showHtml'],
    computed: mapState({
      user: state => state.user.user,
      info: state => state.user.info,
    }),
    methods:{
      infinityState(){
        this.is_lamp_after = true
        setTimeout(() => {
          this.is_lamp_after = false
        }, 60000)
      },
      handlerGameNum(x) {
        if (x === '-') {
          if (this.gameNum === 1) return false;
          this.gameNum--;
          this.page.aldstat.sendEvent('减币',{'当前币数':this.gameNum * this.info.coin_num,'币总数':this.user.coins})
        } else {
          if (((this.gameNum + 1) * this.info.coin_num) > (this.user.coins + this.info.coin_num * this.user.game_ticket)) {
            return false
          }
          this.gameNum++;
          this.page.aldstat.sendEvent('加币',{'当前币数':this.gameNum * this.info.coin_num,'币总数':this.user.coins})
        }
      },
      //投币，开始游戏
      handleStartingDevice() {
//        this.closeBg();
        if (this.info.online === 0) {
          this.$store.commit('changeTipContent', getErrMsg(1001));
          return
        }
        if (this.is_start) {
          return;
        } else {
          if(JSON.stringify(this.time)!=='{}'){
            clearTimeout(this.time);
            this.is_lamp_after = false
          }
          this.is_start = true
          this.is_lamp_after = false
          this.start_desc = '投币中'
          if (this.user.game_ticket + this.user.coins < this.info.coin_num) {
            this.start_desc = '';
            this.is_start = false
            this.$store.commit('changeTipContent', getErrMsg(1005));
            return false
          }
          this.$store.dispatch('startingDevice', this.gameNum * this.info.coin_num)
            .then(() => {
              this.is_lamp_after = true
              this.is_start = false
              this.start_desc = '投币启动';
              this.$emit('getFallback',this.gameNum);
              this.page.aldstat.sendEvent('投币启动',{
                "币数":""+this.gameNum * this.info.coin_num,
                "游戏次数":""+this.gameNum
              });
              this.time = setTimeout(() => {
                this.is_lamp_after = false
              }, 12000 * this.gameNum);
              this.gameNum = 1;
            })
            .catch(() => {
              this.is_start = false
              this.start_desc = '投币启动'
            })
        }
      },
      handleScanQRCode() {
        this.$emit('scanCode');
        this.page.aldstat.sendEvent('扫码换机');
      },
    }
  }
</script>

<style>
  .main {
    width: 100%;
    height: 46%;
    min-height: 5.42rem;
    position: relative;
  }

  .main > div {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .main .centerout {
    background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/bg_begin.png") no-repeat;
    background-size: 100% 100%;
    padding: 0.2rem;
  }

  .main .centerout .center {
    width: 100%;
    padding: 0.7rem 0.2rem 0 0.2rem;
    position: relative;
    background: #fff;

  }

  .main .center .tbz {
    width: calc(100% - 0.3rem);
    height: calc(100% - 0.3rem);
    position: absolute;
    left: 0.15rem;
    top: 0.15rem;
  }

  .main .center > h3 {
    width: 2.26rem;
    height: 0.9rem;
    /*font-size: 0.32rem;*/
    font-size: 0.34rem;
    color: #fd643b;
    background: #feedd7;
    line-height: 0.9rem;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    /*padding: 0.2rem 0.3rem;*/
  }

  .main .center > h3 > i {
    font-size: 0.3rem;
  }

  .main .center .startgame {
    width: 3.06rem;
    height: 3.06rem;
    line-height: 3.06rem;
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_begin.png");
    background-size: 100% 100%;
    border: none;
    outline: none;
    /*font-size: 0.5rem;*/
    font-size: 0.4rem;
    color: #fff;
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 6;
  }

  .main .center .hasclick {
    background: url("http://res.catchme.com.cn/imgs-2017-12-29-20-42/press_ing.png");
    background-size: 100% 100%;
  }

  .main .center .game-num {
    width: 4.18rem;
    height: 0.93rem;
    border: 1px solid #ff784e;
    border-radius: 0.18rem;
    font-size: 0.24rem;
    line-height: 0.91rem;
    margin: -0.63rem auto 0 auto;
    background: #fff;
    color: #7e7e7e;
    text-align: center;
    position: relative;
    z-index: 6;
  }
  .main .center .game-num > div{
    width: 60%;
    float: left;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .main .center .game-num.norecharge {
    border: 1px solid #afafaf;
  }

  .main .center .game-num i.active {
    color: #c8c8c8;
  }

  .main .center .game-num i {
    /*width: 0.81rem;*/
    width: 20%;
    float: left;
    font-size: 0.5rem;
    color: #ff784e;
    text-align: center;
    height: 0.67rem;
    line-height: 0.67rem;
    border-right: 1px solid #ff784e;
    margin: 0.1rem 0;
  }

  .main .center .game-num i:last-of-type {
    border-right: none;
    border-left: 1px solid #ff784e;
    float: right;
  }

  .main .center .game-num > div {
    /*width: calc(100% - 1.62rem);*/
    width: 60%;
    float: left;
    text-align: center;
  }

  .main .center .game-num > div h3 {
    /* font-size: 0.42rem; */
    font-size: 0.4rem;
    color: #ff784e;
    font-weight: 600;
    /* line-height: 0.42rem; */
    line-height: 0.4rem;
    margin: 0 0 0.08rem 0;
  }
  .main .center .game-num > div p{
    font-size: 0.22rem;
    color: #888888;
    line-height: 0.22rem;
  }

  .main .center .tip {
    height: 0.84rem;
  }

  .main .center .tip > p {
    /*font-size: 0.24rem;*/
    font-size: 0.26rem;
    color: #888888;
    line-height: 0.64rem;
    text-align: center;
  }

  .main .center .tip > p > span {
    font-weight: 600;
    color: black;
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

  /*.jo-version2 .header > div {*/
  /*top: 55%;*/
  /*}*/

  .jo-version2 .main .center .tip {
    height: 1rem;
  }

</style>
