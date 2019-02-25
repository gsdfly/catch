<template>
  <div class="task" :class="{'task-version2':version2}">
    <ul>
      <li v-for="item in task_opes.slice(0,tasklength)">
        <div v-if="item.type === 7" @click="consumer(item)">
          <img class="task-free" :class="{'is_down':item.coupon.status === 2}" src="./../assets/task-2/icon_free_a.png" alt=""/>
          <img v-if="item.coupon.status === 2" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.coupon.status === 2}">免费领币</p>
        </div>
        <div v-if="item.type === 12" @click="consumer(item)">
          <img class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_a.png" alt=""/>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">免费领币</p>
        </div>
        <div v-if="item.type === 9">
          <div @click="openTip('taskGameTip',item)" class="water" v-if="item.task_count < item.num && task_now.game_bounty<item.value">
            <div class="bol" :style="'height:'+task_now.game_bounty/item.value*100+'%'"></div>
            <span class="game-num"><b>{{task_now.game_bounty/info.coin_num}}/</b>{{item.value/info.coin_num}}</span>
          </div>
          <div @click="receiveTask(item)" v-if="item.task_count < item.num && task_now.game_bounty>=item.value" class="m-water">领币</div>
          <div v-if="item.task_count >= item.num" class="m-water is_down">领币</div>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">投币送币</p>
        </div>
        <div v-if="item.type === 10">
          <img @click="openTip('taskWawaTip')" v-if="item.task_count < item.num && task_now.prize_bounty<item.value" src="./../assets/task-2/icon_free_c.png" alt=""/>
          <img :class="{'is_down':item.task_count >= item.num}" @click="receiveTask(item)" v-else="" src="./../assets/task-2/icon_free_receive_c.png" alt="">
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">抓中送币</p>
        </div>
        <div v-if="item.type === 2" @click="openTip('bankCard',item)">
          <span class="hot" :class="{'is_down':item.task_count >= item.num}">hot</span>
          <img class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_card.png" alt=""/>
          <img v-if="item.status === 2" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">办卡送公仔</p>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
        </div>
        <div v-if="item.type === 13" @click="openTip('tencent')">
          <img  class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_a.png" alt=""/>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
        <p>免费领币</p>
        </div>
        <div v-if="item.type === 16" @click="openTip('redGame')">
          <img class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_a2.png" alt=""/>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">免费领币</p>
        </div>
        <div v-if="item.type === 17" @click="openTip('artifact',item)">
          <img class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_a2.png" alt=""/>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">免费领币</p>
        </div>
        <div v-if="item.type === 18" @click="openMovie(item)">
          <img class="task-free" :class="{'is_down':item.task_count >= item.num}" src="./../assets/task-2/icon_free_a2.png" alt=""/>
          <img v-if="item.task_count >= item.num" class="img_down" src="./../assets/task-2/received.png" alt=""/>
          <p :class="{'is_down':item.task_count >= item.num}">免费领币</p>
        </div>
      </li>
      <li v-if="movies.length>0">
        <div @click="openTip('movieList')">
          <div class="ticket-div">
            <img class="ticket animated" :class="{'bounce':isShowCoinAnimate}" src="./../assets/movie/icon_ticket.png" alt="">
          </div>
          <p>我的电影优惠券</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import api from './../api/index'

  export default {
    name:'task',
    data(){
      return {
        isRequest:false,
        artifact:{},
        tasklength:3
      }
    },
    props:['isShowCoinAnimate'],
    mounted(){
      if(this.isLogin){
        this.mountedStart();
      }
    },
    computed: mapState({
      gzh_operation: state => state.user.gzh_operation,
//      task_game: state => state.user.task_game,
//      task_wawa:state => state.user.task_wawa,
      task_now:state => state.user.task_now,
      info: state => state.user.info,
      isLogin: state => state.user.isLogin,
      activity_bounty: state => state.user.activity_bounty,
      task_opes: state => state.user.task_opes,
      movies:state => state.user.movies,
    }),
    methods:{
      openMovie(item){
        this.$emit('openMovie',item)
      },
      useArtifact(){
        if(this.artifact.task_count >= this.artifact.num){
          location.href = this.artifact.url;
          return;
        }
        _hmt.push(['_trackEvent', '任务：零钱神器', '点击', '打开零钱下载页面', '']);
        this.$store.dispatch('getActivityBountyExchange',{operation_id:this.artifact.id,machine_no:CONFIG.machine_no}).then((res)=>{
          this.$store.dispatch('getUser');
          this.$store.dispatch('getOperations');
          setTimeout(()=>{
            location.href = this.artifact.url;
          },300)
        })
      },
      mountedStart(){
        this.$store.dispatch('getOperations').then((res)=>{
          //获取是否是从别人公众号过来的gzh_code
          var gzh_code = localStorage.getItem('gzh_code');
          if(gzh_code){
           //这里需要找到对应的公众号运营位，来领取免费币
            for (let item of res){
              if(item.type === 12 && item.code === gzh_code){
                //这里请求
                this.$store.dispatch('getActivityBountyExchange',{operation_id:item.id}).then((res)=>{
                  this.$store.dispatch('getFreeCoin',{coin_price_id: item.coin_price.coin_price_id, coupon_id: item.coupon.id}).then((res)=>{
                    //领取成功调用动画
                    this.$emit('handleGzh')
                    setTimeout(()=>{
                      this.$store.commit('setCoins', res.data.coin_num);
                      this.$store.dispatch('getUser');
                      this.$store.dispatch('getOperations');
                    },1500)
                  })
                })
              }
            }
            localStorage.removeItem('gzh_code')
          }

          var hasGzh = false
          for (let item2 of res){
            if(item2.type===12 && item2.num>item2.task_count){
              hasGzh = true;
              break;
            }
          }
          if(this.info.online === 1){
            //获取本地的guide
            var guideTime = localStorage.getItem('guideTime');
            var date = new Date();
            var nowTime = date.getMonth()+''+date.getDate();
            if(!hasGzh){
              if(!(guideTime === nowTime)){
                this.$store.commit('changeIsGuide',true);
                localStorage.setItem('guideTime',nowTime)
              }
            }else {
              var guideNum = localStorage.getItem('guideNum');
              if(guideNum){
                if(guideNum == 1){
                  if(guideTime !== nowTime || this.activity_bounty.length>0){
                    this.$store.commit('changeIsGuide',true);
                    localStorage.setItem('guideTime',nowTime);
                    localStorage.setItem('guideNum',2)
                  }
                }else {
                  if(guideTime !== nowTime){
                    this.$store.commit('changeIsGuide',true);
                    localStorage.setItem('guideNum',1)
                  }
                }
              }else {
                this.$store.commit('changeIsGuide',true);
                localStorage.setItem('guideNum',1)
                if(this.activity_bounty.length==0){
                  localStorage.setItem('guideTime',nowTime);
                }
              }
            }
          }

          var prize_bounty = localStorage.getItem('prize_bounty')
          //在第一次进入页面或取到任务值的时候需要将娃娃的任务值存到本地
          this.$store.dispatch('getActivityBountyInfo').then((res)=>{
            if(prize_bounty && res.prize_bounty>prize_bounty && this.activity_bounty.length > 0){
              _hmt.push(['_trackEvent', '抓中娃娃弹窗', '打开', '进入页面时弹出', '']);
              //弹出抓中娃娃的弹窗
              this.$emit('openTip','wawaTip');
            }
            localStorage.setItem('prize_bounty',res.prize_bounty);
          })

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
        })
      },
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
      openTip(value,info){
        if(value === 'taskGameTip'){
          _hmt.push(['_trackEvent', '任务：投币送币', '点击', '投币送币：未完成', '']);
          this.$emit('taskGame',info);
        }else if(value === 'taskWawaTip'){
          _hmt.push(['_trackEvent', '任务：抓中送币', '点击', '抓中送币：未完成', '']);
        } else if(value === 'bankCard'){
          if(info.task_count>=info.num){
            _hmt.push(['_trackEvent', '任务：办卡', '点击', '办卡领币继续点击', '']);
            location.href = info.url
            return;
          }else {
            _hmt.push(['_trackEvent', '任务：办卡', '点击', '办卡领币', '']);
            this.$emit('bankCard',info);
          }
        }else if(value === 'tencent'){
          _hmt.push(['_trackEvent', '任务：微保', '点击', '微保领币', '']);

        }else if(value === 'artifact'){
          _hmt.push(['_trackEvent', '任务：零钱神器', '点击', '打开零钱弹窗', '']);
          this.artifact = info
        }
        this.$emit('openTip',value);
      },
      consumer(gzh_operation){
        if(gzh_operation.coupon.status === 2 || gzh_operation.task_count >= gzh_operation.num){
          return;
        }
        if(CONFIG.isWx || gzh_operation.type === 12){
          this.$emit('openTip','free',gzh_operation.mp_url,gzh_operation.remarks);
          _hmt.push(['_trackEvent', '任务：免费领币', '点击', '免费领币：微信', '']);
          return;
        }
        _hmt.push(['_trackEvent', '任务：免费领币', '点击', '免费领币：支付宝', '']);
        this.$store.dispatch('getFreeCoin', {coin_price_id: gzh_operation.coin_price.coin_price_id, coupon_id: gzh_operation.coupon.id}).then((data) => {
          console.log(data);
          this.$store.commit('setCoins', data.data.coin_num);
          this.$store.dispatch('getUser');
          this.$store.dispatch('getOperations');
        })
      },
      receiveTask(task){
        //领取任务的游戏币
        if(!this.isRequest){
          if(task.type === 9){
            _hmt.push(['_trackEvent', '任务：投币送币', '点击', '投币送币：领币', '']);
          }else if(task.type === 10){
            _hmt.push(['_trackEvent', '任务：抓中送币', '点击', '抓中送币：领币', '']);
          }
          this.isRequest = true;
          this.$store.dispatch('getActivityBountyExchange',{operation_id:task.id}).then((res)=>{
            this.$store.dispatch('getFreeCoin',{coin_price_id: task.coin_price.coin_price_id, coupon_id: task.coupon.id}).then(()=>{
              this.isRequest = false;
              this.$emit('receiveBiSuccess');
              //领取成功
              this.$store.dispatch('getUser');
              this.$store.dispatch('getActivityBountyInfo').then((res)=>{
                localStorage.setItem('prize_bounty',res.prize_bounty);
              })
              this.$store.dispatch('getOperations')
            }).catch(()=>{
              this.isRequest = false;
            })
          }).catch(()=>{
            this.isRequest = false;
          })
        }
      }
    },
    watch:{
      isLogin(){
        this.mountedStart();
      },
      movies(newValue,oldValue){
        if(newValue.length>0){
          this.tasklength = 2
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes wave-animation {
    0% {
      background-position: 0 top;
    }

    100% {
      background-position: 102px top;
    }
  }
  .task{
    width: 100%;
    height:168px;
    position: absolute;
    padding: 0 20px;
    left: 0;
    bottom: 0;
    .task-bg{
      width: 710px;
    }
    .free-bg{
      width: 333px;
      position: absolute;
      left: 0;
      top:-18px;
    }
    ul{
      background: #fff;
      width: 706px;
      position: absolute;
      height:100%;
      border-radius: 16px;
      left: 22px;
      li{
        width: calc(100% / 3);
        height: 100%;
        float: left;
        position: relative;
        >div{
          width: 100%;
          height: 100%;
          padding: 0.1px;
          >div{
            position: relative;
            width: 110px;
            height: 110px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 13px auto 0 auto;
            &.ticket-div{
              background: url("./../assets/movie/ticket_press.png");
              background-size: 100% 100%;
            }
            >img{
              width: 100%;
              &.ticket{
                width: 46px;
                height: 34px;
                margin-top:-2px;
                animation-duration: 2.5s;
              }
            }

          }
          .hot{
            width: 54px;
            height: 24px;
            font-size: 20px;
            line-height: 24px;
            color: #fff;
            position: absolute;
            text-align: center;
            right: 52px;
            top:23px;
            background-image: linear-gradient(-54deg,
              #e8453d 0%,
              #f76058 100%),
            linear-gradient(
                #fdebd3,
                #fdebd3);
            background-blend-mode: normal,
            normal;
            box-shadow: 0px 1px 9px 0px
            rgba(227, 50, 41, 0.36);
            border-radius: 12px;
            z-index: 2;
            &.is_down{
              opacity: 0.5;
            }
          }
          >img{
            width: 110px;
            height: 110px;
            display: block;
            margin: 13px auto 0 auto;
            &.img_down{
              width: 160px;
              height: 88px;
              position: absolute;
              left: 50%;
              top:26px;
              margin: 0;
              transform: translateX(-50%);
              z-index:3;
            }
            &.is_down{
              opacity: 0.5;
            }
          }
          .m-water{
            width: 90px;
            height: 90px;
            background: url("./../assets/task-2/water.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 50%;
            font-size: 30px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 19px auto 18px auto;
            box-shadow: 0 4px 12px rgba(180,149,84,0.4);
            &.is_down{
              opacity: 0.5;
            }
          }
          .water{
            width: 90px;
            height: 90px;
            background-color: #999999;
            /*border: solid 6px #ffffff;*/
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: flex-end;
            margin: 19px auto 18px auto;
            box-shadow: 0 4px 12px rgba(180,149,84,0.4);
            /*box-shadow: inset 0px 3px 13px 0px*/
            /*rgba(242, 123, 0, 0.51);*/
            .bol{
              width: 100%;
              background: url("./../assets/task/b_bg.png");
              animation: wave-animation 1s infinite linear;
              transition: all 1s linear;
              background-size: 102px 116px;
            }
            .game-num{
              position: absolute;
              left: 50%;
              top:50%;
              font-size: 28px;
              color: #fff;
              transform: translate(-50%,-50%);
              b{
                font-size: 40px;
              }
            }
          }
          p{
            text-align: center;
            height: 24px;
            font-size: 24px;
            line-height: 24px;
            color: #494949;
            margin: 4px 0 0 0;
            &.is_down{
              color: #b3b3b3;
            }
          }
        }
        }
      }
    }

  .task-version2{
    /*padding: 0 18px;*/
    height: 184px;
    ul{
      padding: 8px 0 0 0;
    }
  }
</style>
