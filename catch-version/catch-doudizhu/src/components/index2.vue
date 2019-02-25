<template>
  <div class="jo-index" :class="{'jo-version2':version2}">
    <div class="jo-index-div" v-show="showHtml" @click="hideKefu">
      <div v-if="isGetImg" v-show="false">
        <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/big/recharge.png" alt="">
        <!--<img src="http://res.catchme.com.cn/activity/catch3/rule.png" alt="">-->
        <!--<img src="http://res.catchme.com.cn/activity/catch3/con_bg.png" alt="">-->
        <img src="http://res.catchme.com.cn/activity/task2/shuoming.png" alt="">
        <img src="http://res.catchme.com.cn/activity/guide/jieshi.png" alt="">
        <img src="http://res.catchme.com.cn/activity/guide/shuoming_bg.png" alt="">
        <!--<img src="http://res.catchme.com.cn/activity/task-2/weibao.png" alt="">-->
      </div>
      <div class="header">
        <div>
          <div class="head-portrait" @click="goProfile">
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
              <!--<img v-show="isShowCoinTip" class="animated coin-tip" :class="{'zoomOutLeft':isShowCoinTip}" src="./../assets/small/coin_tip.png" alt="">-->
              <span v-show="isShowCoinTip" class="animated coin-animate" :class="{'zoomOutLeft':isShowCoinTip}">+{{addCoinNum}}</span>
            </div>
            <div class="kefu" @click.stop="">
              <p id="support" @click="showKefu">
                <!--<img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_kefu.png" alt=""><span>客服</span>-->
                <img :src="theme.kefuIcon" alt=""><span>客服</span>
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
        <!--<operations ref="operations" @changeBgShow="changeBgShow" @closeBg="closeBg"-->
        <!--@changeTip="changeTip" @openTip="openTip"></operations>-->
        <!--<quanprogress @openTip="openTip" @getVoucherLength="getVoucherLength"></quanprogress>-->
        <task  ref="task" @receiveBiSuccess="receiveBiSuccess" @openTip="openTip" @taskGame="taskGame" @bankCard="bankCard" @handleGzh="handleGzh"></task>
      </div>

      <div class="main">
        <!--<div class="main-center">-->
          <div class="centerout">
            <div class="center">
              <h3 @click="handleScanQRCode" id="change_device">扫码换机<i class="iconfont icon-go"></i></h3>
              <div v-if="isShowBaomihuaList" class="my_ticket" @click="openTip('baomihuaList')">
                <img src="./../assets/dalibao/my_ticket.png" alt=""/>
                <!--<p>我的兑换券</p>-->
              </div>
              <div class="ring" v-if="activity_bounty.length>0">
                <div class="d">
                  <div class="dd" :style="ringStyle">
                    <div>
                      <img class="img" :src="theme.ringCircle" alt="">
                      <!--<img class="img" src="http://res.catchme.com.cn/activity/ring/process2.png" alt="">-->
                      <div class="star" :class="{'animation':starClass==='animation'}">
                        <img class="star1" src="./../assets/ring/star1.png" alt="">
                        <img class="star2" src="./../assets/ring/star2.png" alt="">
                        <img class="star3" src="./../assets/ring/star3.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>
                <span class="icon"></span>
                <!--<span class="icon"><b>{{task_now.game_bounty}}</b>/{{task_game.value}}</span>-->
                <div class="task-gift" v-show="isCalculated" v-for="(item,index) in activity_bounty">
                  <!--<img class="ling" v-if="item.voucher_batch.value <= task_now.recharge_bounty" src="./../assets/task/red_ling.png" alt="" @click="receiveGift(item)" />-->
                  <div class="ring-tip" id="couponList"
                       @click="handleRed(item.voucher_batch.value,item)">
                    <div class="ring-tip-bg">
                      <!--<div class="ring-quan"-->
                           <!--:class="{'ring-tip-ling':item.voucher_batch.value <= task_now.recharge_bounty}">-->
                        <img :class="{'ring-tip-ling':item.voucher_batch.value <= task_now.recharge_bounty}" v-if="item.voucher_batch.image" class="ring-quan" :src="item.voucher_batch.image"
                             alt=""/>
                      <!--</div>-->
                      <div class="ring-content"
                           :class="{'last':(index+1)/activity_bounty.length>=0.6,'nolast':(index+1)/activity_bounty.length<0.6}">
                        <p :class="{'hidden':item.voucher_batch.value - task_now.recharge_bounty<=0}">
                          (再抓{{Math.ceil(( item.voucher_batch.value - task_now.recharge_bounty) / info.coin_num)}}次)</p>
                        <h3 v-if="item.voucher_batch.description">{{item.voucher_batch.description}}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="startgame" :class="{'hasclick':start_desc == '投币中','mypluse':!isClickStartGame}" id="coin-operated"
                   @click="handleStartingDevice">{{start_desc ? start_desc : '投币启动'}}
              </div>
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
              <div class="tip" :class="{'tipbg':!isClickStartGame}">
                <p v-show="user.coins<=0  && !is_lamp_after">充值后点击“投币启动”按钮开始游戏</p>
                <p v-show="is_lamp_after && start_desc=='投币启动'">投币成功，<span>“摇动游戏杆”</span>即可开始游戏</p>
              </div>
            </div>
          </div>
        <!--</div>-->
      </div>
      <div class="footer">
        <joPay ref="joPay" @changeTip="changeTip" @startGame="myStartGame" @openTip="openTip" @changeBgShow="changeBgShow" @handleScanQRCode="handleScanQRCode"
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

        <div class="bg-center8" v-if="contentShow == 'notExchange'" @click.stop="">
          <div>
            <div>
              <h3 class="tipTitle"><span></span><b>我的优惠券</b></h3>
              <img :src="theme.notExchangeImg" alt="" class="imgBg" @click.prevent="">
              <p>暂时没有优惠券哦</p>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
          </div>
        </div>

        <div class="bg-center8-2" v-if="contentShow == 'activityRule'" @click.stop="">
          <div>
            <img src="http://res.catchme.com.cn/activity/catch3/rule.png" alt="" class="imgBg" @click.prevent=""/>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg2"/>
          </div>
        </div>

        <div class="bg-center9" v-if="contentShow == 'exchange2'" style="width: 100%;height: 100%">
          <div class="bg-center9-center">
            <div>
              <h3 class="tipTitle"><span></span><b>{{couponInfo.name}}</b></h3>
              <div class="scroll">
                <span class="spanh3" id="copy">{{couponInfo.code}}</span>
                <p>有效期至：{{couponInfo.end_time | handleEndTime}}</p>
                <button :data-clipboard-target="'#copy'" @click="copy" class="btncopy" id="copyBtn">复制</button>
              </div>
              <img :src="theme.exchange2Img" alt="" @click.prevent=""
                   class="imgBg"/>
              <a class="go-coupon-list" href="javascript:void(0)"
                 @click.stop="couponList">我的优惠券：{{activity_bounty | handleActivityBounty}} <i
                class="iconfont icon-shuangjiantouyou"></i></a>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg2"/>
          </div>
          <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg2"></div>
        </div>

        <div class="bg-center9-2" v-if="contentShow == 'exchange3'" style="width: 100%;height: 100%">
          <div class="bg-center9-center">
            <div>
              <h3 class="tipTitle"><span></span><b>观影小食兑换券</b></h3>
              <div class="food">
                <div class="food-top">
                  <img src="./../assets/catch4/food.png" alt="">
                  <h4>32oz爆米花+12oz可乐</h4>
                  <p>有效期至：{{couponInfo.end_time | handleEndTime2}}</p>
                </div>
                <div class="exchange-code">
                  <barcode :value="couponInfo.code" style="height: 100%;" :height="45" :width="2" :fontSize="14"
                           :margin="5" :marginTop="7"></barcode>
                </div>
              </div>
              <div class="bottom">
                <img src="./../assets/catch4/horn.png" alt="">
                <p>赶紧到“影院卖品部”免费兑换吧~</p>
              </div>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg2"/>
          </div>
          <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg2"></div>
        </div>


        <div class="bg-center10" v-if="contentShow == 'coin'" @click.stop="">
          <div>
            <div>
              <img class="imgBg" src="http://res.catchme.com.cn/imgs-2018-02-05/tip/image_much.png" alt="">
              <p>一次投币太多容易造成浪费<br/>确定继续投币吗？</p>
              <button class="btn1" @click="reloadCoin">重新选择</button>
              <button class="btn2" @click="continueCoin">继续投币</button>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center11" v-if="contentShow == 'receive'" @click.stop="">
          <div>
            <div class="bg-center11-top" v-if="currentGift.voucher_batch.category ===0">
              <img class="con_bg" src="http://res.catchme.com.cn/activity/task-2/con_bg_top.png" alt=""/>
            </div>
            <div class="bg-center11-top" v-else>
              <img class="top-img" src="./../assets/task-2/congratulate_bg.png" alt=""/>
              <img v-if="currentGift.voucher_batch.big_image" class="top-wawa"
                   :src="currentGift.voucher_batch.big_image" alt="">
            </div>
            <div class="bg-center11-main">
              <!--<img src="http://res.catchme.com.cn/activity/catch3/con_bg.png" alt="" class="imgBg" @click.prevent=""/>-->
              <div class="content">
                <h3 class="tipTitle"><span></span><b>恭喜获得任务值</b></h3>
                <h5><span class="home_icon_bi"></span>{{task_now.recharge_bounty}}</h5>
                <p>我的任务值</p>
                <div>
                  <dl class="dlCoupon">
                    <dt>
                      <h4>{{currentGift.voucher_batch.name}}</h4>
                      <p>(消耗{{currentGift.voucher_batch.value}}个任务值)</p>
                    </dt>
                    <dd>
                      <button @click="receiveCoupon">兑换</button>
                    </dd>
                  </dl>
                </div>
                <p class="go-shuoming" @click="openTip('shuoming')">查看活动说明</p>
                <a class="go-coupon-list" href="javascript:void(0)"
                   @click="couponList">我的优惠券：{{activity_bounty | handleActivityBounty}} <i
                  class="iconfont icon-shuangjiantouyou"></i></a>
              </div>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center12" v-if="contentShow == 'couponList'" @click.stop="">
          <div>
            <div>
              <h3 class="tipTitle"><span></span><b>我的优惠券</b></h3>
              <ul>
                <template v-for="activity_bountyItem in activity_bounty">
                  <li v-for="item in activity_bountyItem.vouchers">
                    <div>
                      <dl class="dlCoupon">
                        <dt>
                          <h4>{{activity_bountyItem.voucher_batch.name}}</h4>
                          <p>{{item.code}}</p>
                          <p>有效期至：{{item.end_time | handleEndTime}}</p>
                        </dt>
                        <dd>
                          <button id="useCoupon"
                                  @click="useCoupon(item.code,item.end_time,activity_bountyItem.voucher_batch.name,activity_bountyItem.voucher_batch.category)">
                            使用
                          </button>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg">
          </div>
        </div>

        <div class="bg-center13" v-if="contentShow == 'free'" @click.stop="">
          <div>
            <img @click.prevent="" :src="theme.freeImg" alt="" class="imgBg"/>
            <img class="btn" :src="theme.freeButtonImg" v-show="isShowGzhButtton" @click.prevent="" @touchstart="press1" @touchend="press2"/>
            <!--<img class="qrcode" src="./../assets/guide/code.png"  v-show="isShowGzhImg" alt=""/>-->
            <p>关注公众号回复“<span>{{freeTip}}</span>”即可领免费币</p>
            <img :style="gzhCodeStyle" @click.prevent="" :src="freeTipImg" alt="" class="qrcode"/>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center14" v-if="contentShow == 'receiveBi'" @click.stop="">
          <div class="center-bg" :style="centerStyle">
            <div>
              <div class="top-high">
                <div class="con-light">
                  <img src="http://res.catchme.com.cn/activity/task/con_light.png" alt="" @click.prevent=""/>
                </div>
                <img src="http://res.catchme.com.cn/activity/task/congradulation.png" alt="" class="top-high-bg"
                     @click.prevent=""/>
                <p>2币</p>
              </div>
              <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                   @click="closeBg"/>
            </div>
          </div>
        </div>

        <div class="bg-center15" v-if="contentShow == 'taskGameTip'" @click.stop="">
          <div class="water" v-if="task_game.task_count < task_game.num && task_now.game_bounty<task_game.value">
            <div class="bol" :style="'height:'+task_now.game_bounty/task_game.value*100+'%'"></div>
            <span
              class="game-num"><b>{{task_now.game_bounty / info.coin_num}}/</b>{{task_game.value / info.coin_num}}</span>
          </div>
          <p>投币送币</p>
          <p>累计抓{{task_game.value / info.coin_num}}次，送免费游戏币</p>
          <button @click="closeBg">去抓娃娃</button>
        </div>

        <div class="bg-center15" v-if="contentShow == 'taskWawaTip'" @click.stop="">
          <img :src="theme.wawaTipImg" alt=""/>
          <p>抓中送币</p>
          <p>您还没有抓中哦</p>
          <button @click="closeBg">去抓娃娃</button>
        </div>

        <div class="bg-center16" v-if="contentShow == 'jieshi'" @click.stop="">
          <div class="center16-main" :class="{'main-baomihua':currentActivityBounty.voucher_batch.category===0}">
            <img v-if="currentActivityBounty.voucher_batch.category===0" class="imgBg" :src="theme.jieshiImgBaomihua" alt="">
            <img v-else class="imgBg" :src="theme.jieshiImgaWawa" alt=""/>
            <h3 v-if="currentActivityBounty.voucher_batch.category===0">
              累计抓取{{currentActivityBounty.voucher_batch.value / info.coin_num}}次没抓中?
            </h3>
            <img v-if="currentActivityBounty.voucher_batch.category===0" class="baomihua" src="./../assets/guide/baomihua.png" alt="" />
            <h3 v-if="currentActivityBounty.voucher_batch.category!==0">
              累计抓取{{currentActivityBounty.voucher_batch.value / info.coin_num}}次没抓中?<br/>+{{currentActivityBounty.voucher_batch.description | handleDes}}元拿走!
            </h3>
            <p @click="openTip('shuoming')">查看活动说明</p>
            <!--<a class="go-coupon-list" href="javascript:void(0)"-->
            <!--@click="couponList">我的优惠券：{{activity_bounty | handleActivityBounty}} <i-->
            <!--class="iconfont icon-shuangjiantouyou"></i></a>-->
            <div class="btn" @click="closeBg">我知道啦</div>
            <!--<img class="btnImg" src="./../assets/guide/press_iknow.png" alt="">-->
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center16" v-if="contentShow == 'shuoming'" @click.stop="">
          <div class="center16-main">
            <img class="imgBg" :src="theme.shuomingImg" alt=""/>
            <h2>活动说明</h2>
            <ul class="content">
              <li v-for="(item,index) in activity_bounty">
                <span v-if="item.voucher_batch.category===1">{{index+1}}、若累计{{item.voucher_batch.value / info.coin_num}}次抓取，未抓中，可得任务值，累计足额任务值，可兑换{{item.voucher_batch.description | handleDes}}元加购券1张，该券可在趣东西商城"{{item.voucher_batch.value / info.coin_num}}次兑换专区"购买商品；</span>
                <span v-if="item.voucher_batch.category===0">
                  {{index+1}}、若累计{{item.voucher_batch.value / info.coin_num}}次抓取，未抓中，可得任务值，累计足额任务值，可兑换影院观影小食兑换券1张，该券可在影城兑换32oz爆米花+12oz可乐一份；
                </span>
              </li>
              <li>{{activity_bounty.length+1}}、
                抓中娃娃或领取加购券之后，任务值将会归零；
              </li>
              <li>{{activity_bounty.length+2}}、归零后继续游戏，重新开始累计任务值；</li>
              <li>{{activity_bounty.length+3}}、每日早上6:00任务值归零；</li>
              <li>{{activity_bounty.length+4}}、本活动的最终解释权归深圳市我抓科技有限公司所有。</li>
            </ul>
            <div class="back" @click="goPre"><i></i>返回</div>
            <!--<img class="btnImg" src="./../assets/guide/press_iknow.png" alt="">-->
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center16" v-if="contentShow == 'wawaTip'" @click.stop="">
          <div class="center16-main">
            <img class="imgBg" :src="zhuazhongWawaImg" alt=""/>
            <h3>抓中公仔将重新开始累积任务值<br/>开始新一轮的挑战吧<i></i></h3>
            <p @click="openTip('shuoming')">查看活动说明</p>
            <!--<a class="go-coupon-list" href="javascript:void(0)"-->
            <!--@click="couponList">我的优惠券：{{activity_bounty | handleActivityBounty}} <i-->
            <!--class="iconfont icon-shuangjiantouyou"></i></a>-->
            <div class="btn" @click="closeBg">我知道啦</div>
            <!--<img class="btnImg" src="./../assets/guide/press_iknow.png" alt="">-->
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center17" v-if="contentShow == 'bankCard'" @click.stop="" style="background: #fff">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/task-2/minsheng.png" alt=""/>
            <p>请先填写您的联系方式，成功办理信用卡后，<br/>将会由工作人员联系您，寄送公仔。</p>
            <input type="text" name="username" id="username" v-model="bankUserInfo.username" placeholder="姓名"/>
            <input type="text" name="phone" id="phone" v-model="bankUserInfo.phone" placeholder="电话"/>
            <div class="btn" @click="sendUserInfo">去办理</div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center18" v-if="contentShow == 'coinred'" @click.stop="">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/red/red_bi2.png" alt="">
            <img v-if="user.avatar" class="avatar" :src="user.avatar" alt=""/>
            <div  class="avatar-div" v-else>
              <img src="./../assets/small/icon_portrait.png" alt="">
            </div>
            <h3>恭喜获得</h3>
            <h2 v-if="redCoinNum > 0">{{redCoinNum}}个免费游戏币</h2>
            <h2 v-else="">现金红包</h2>
            <p v-if="redCoinNum > 0">点击“投币启动”按钮，开始抓娃娃吧</p>
            <p v-else="">红包已通过“趣东西服务”发送至您的微信上啦<br/>注意查收哦</p>
            <h4><span></span><b>大家的手气</b></h4>
            <ul>
              <li v-for="item in redGroup.list">
                <img v-if="item.avatar" class="ul-avatar" :src="item.avatar" alt="">
                <div v-else="">
                  <img src="./../assets/small/icon_portrait.png" alt="">
                </div>
                <p>{{item.nickname}}</p>
                <span v-if="item.type == 1">{{item.desc}}元</span>
                <span v-if="item.type == 2">{{item.desc}}币</span>
              </li>
              <li v-for="item2 in (redGroup.num - redGroup.list.length)">
                <div class="red-avatar">
                  <img src="./../assets/red/red_s.png" alt="">
                </div>
                <span>等待领取</span>
              </li>
            </ul>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg('redMachine')"/>
          </div>
        </div>

        <div class="bg-center19" v-if="contentShow == 'moneyred'" @click.stop="">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/red/red_cash.png" alt="">
            <h3>恭喜获得</h3>
            <h2>现金红包</h2>
            <p>红包已通过“趣东西服务”发送至您的微信上啦<br/>注意查收哦</p>
            <div class="btn" @click="closeBg">我知道啦</div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center20" v-if="contentShow == 'failred'" @click.stop="">
          <div>
            <div class="content">
              <img class="imgBg" src="http://res.catchme.com.cn/activity/red/red_image.png" alt="">
              <h3>领取失败</h3>
              <p>{{message}}</p>
              <div class="btn" @click="closeBg('redMachine')">我知道啦</div>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg('redMachine')"/>
          </div>
        </div>

        <div class="bg-center21" v-if="contentShow == 'nobi'" @click.stop="">
          <div>
            <div class="content">
              <img class="imgBg" src="http://res.catchme.com.cn/activity/guide/image_zero.png" alt="">
              <h3>游戏币用完啦</h3>
              <p>差点点儿就抓到你了呢</p>
              <div class="btn" @click="closeBg">我知道啦</div>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center22" v-if="contentShow == 'tencent'" @click.stop="">
          <div>
            <img @touchstart="press3" @touchend="press4" class="imgBg" src="http://res.catchme.com.cn/activity/task-2/weibao.png"  alt=""/>
            <img class="code" :src="tencentCodeImgUrl" alt="">
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg('redMachine')"/>
          </div>
        </div>

        <div class="bg-center23" v-if="contentShow == 'dalibaotip'" @click.stop="">
          <div>
            <img class="imgBg" v-if="dalibao[dalibaoIndex].coin_price.coin_price == '10.00'" src="http://res.catchme.com.cn/activity/dalibao/corn_fifteen.png" alt="">
            <img  class="imgBg" v-else="" src="http://res.catchme.com.cn/activity/dalibao/corn.png" alt=""/>
            <div class="btn" @click="useDalibaoPay">去充值</div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center24" v-if="contentShow == 'redGame'" @click.stop="">
          <div>
            <img v-if="redGame.task_count < 2" class="imgBg" src="http://res.catchme.com.cn/activity/task-2/doudizhu.png" alt=""/>
            <img v-else="" class="imgBg" src="http://res.catchme.com.cn/activity/task-2/doudizhued.png" alt="">
            <div class="content">
              <h3>第一步：点击下载</h3>
              <p>「红包斗地主」APP，即送<span>2</span>币</p>
              <h4>（玩游戏送红包哦~）</h4>
              <button @click="downloadGame" :class="{'is-down':redGame.task_count >= 1}">下载</button>
              <img class="arrow" src="./../assets/task-2/arrow.png" alt=""/>
              <h3>第二步：APP内成功登录</h3>
              <p>点击下方验证按钮获取<span>4</span>币 </p>
              <button @click="verificationGame"  :class="{'is-down':redGame.task_count == 2}">验证</button>
            </div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center25" v-if="contentShow == 'baomihuaList'" @click.stop="">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/dalibao/tickets_bg.png" alt=""/>
            <ul>
              <template v-for="item in dalibao">
                <li v-for="item2 in item.vouchers" @click="useCoupon(item2.code,item2.end_time,item2.name,item2.category,'baomihua')">
                  <div>
                    <h3>{{item2.name}}</h3>
                    <p>有效期至：{{item2.end_time | handleEndTime2}}</p>
                  </div>
                </li>
              </template>
            </ul>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center26" v-if="contentShow == 'baomihua'" @click.stop="">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/dalibao/success.png" alt="">
            <h3>{{couponInfo.name}}</h3>
            <h4>32oz爆米花+12oz可乐</h4>
            <p>有效期至：{{couponInfo.end_time | handleEndTime2}}</p>
            <div class="exchange-code" v-if="couponInfo.code">
              <barcode :value="couponInfo.code" style="height: 100%;" :height="codeHeight" :width="codeWidth" :fontSize="14"
                       :margin="5" :marginTop="7" :displayValue="false"></barcode>
              <p>{{couponInfo.code}}</p>
            </div>
            <div class="tip" v-else="">已放入“我的兑换券”里</div>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

        <div class="bg-center27" v-if="contentShow == 'artifact'" @click.stop="">
          <div>
            <img class="imgBg" src="http://res.catchme.com.cn/activity/task-2/loan.png" alt=""/>
            <button @click="downloadArtifact">去下载</button>
            <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
                 @click="closeBg"/>
          </div>
        </div>

      </div>
      <tipOperation></tipOperation>
    </div>
    <tip :tipContent="tipContent" @tipButton="tipButton"></tip>
    <guide v-if="isShowGuide && isAfterRed && info.online ===1 &&( activity_bounty.length>0 || (gzh_operation.coupon && gzh_operation.coupon.status !=2) || (gzh_operation_other.task_count < gzh_operation_other.num))"></guide>
    <guide2 v-if="isShowGuide2" @closeGuide2="closeGuide2"></guide2>
  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import joPay from './wxpay'
//  import operations from './operations.vue'
  import tip from './tip.vue'
  import tipOperation from './tipoperation.vue'
  import {getErrMsg,getParamByName} from './../util/index'
  import Toast from 'mint-ui/lib/Toast'
  import Clipboard from 'clipboard';
//  import quanprogress from './quanprogress.vue'
  import task from './task.vue'
  import guide from './guide.vue'
  import guide2 from './guide2.vue'
  import socketio from 'socket.io-client';
  import vueBarcode from 'vue-barcode'
  import animate from 'animate.css'
  import api from './../api'
  import theme from './../themes/default'

  export default {
    data() {
      return {
        theme:theme,           //页面主题变动部分
        isClickStartGame:true,
        isConnectScoket: false,
        io: {},
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
        contentShowAfter:'',
        currentCoupon: {},
        pay: {},
        currentCouponPay: {},
        operationTipContent: '',
        isKefuStyle: '',
        kefuImg: '',
        isGetImg: false,
        isReceive: false,   //是否领取红包
        couponInfo: {
          code: '',
          end_time: '',
          name: ''
        },
        freeTipImg: '',
        freeTip:'666',
        ringStyle: '',
        centerStyle: '',
        starClass: '',
//        currentGift:{}
        currentGift: {
          id: 37,
          level: 1,
          title: "三方优惠券",
          type: 8,
          voucher_batch: {
            id: 3,
            value: 16,
            name: "商城优惠码2",
            image: null,
          },
          vouchers: [{
            code: "267299840241",
            end_time: "2019-01-01 00:00:00",
            image: null,
            value: 1600,
            voucher_batch_id: 3
          }]
        },
        task_game:{},
        bankUserInfo:{
          username:'',
          phone:''
        },
        bankOpe:{},
        isRequest:false,
        redCoinNum:0,
        shuomingPre: '',
        isShowGuide2: false,
        freeAnimate:'',
        isShowCoinTip:false,
        addCoinNum:0,
        isShowGzhButtton:true,
        isShowGzhImg:false,
        gzhCodeStyle:'visibility: hidden',
        isCalculated:false,//娃娃位置计算完成
        timeout1:{},
        timeout2:{},
//        guideTime:'',
//        touchTime:0
        message:'',
        redGroup:{
          num:5,
          list:[]
        },
        isAfterRed:false,
        tencentCodeImgUrl:'',
        tencentImgtime:0,
        currentActivityBounty:{},
        dalibaoIndex:0,
        isShowBaomihuaList:false,
        codeWidth:2,
        codeHeight:45,
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
//      activity_promocode: state => state.user.activity_promocode, //已经舍弃
      activity_bounty: state => state.user.activity_bounty,
//      task_game: state => state.user.task_game,
      task_now: state => state.user.task_now,
      isShowGuide: state => state.user.isShowGuide,
      isLogin:state => state.user.isLogin,
      gzh_operation: state => state.user.gzh_operation,
      gzh_operation_other: state => state.user.gzh_operation_other,
      dalibao:state => state.user.dalibao,
      redGame:state => state.user.redGame
    }),
    components: {
      joPay,
//      operations,
      tip,
      tipOperation,
//      quanprogress,
      task,
      guide,
      guide2,
      barcode: vueBarcode
    },
    mounted() {
//      var step1 = localStorage.getItem('redGameStep')
//      if(step1 && this.isLogin){
//        this.handleRedGame('');
//        localStorage.removeItem('redGameStep')
//      }
      var unionid = localStorage.getItem('unionid')
      if(unionid && this.isLogin){
        this.handleRedGame(unionid);
      }
      var re = localStorage.getItem('re');
      if(!re){
        this.isAfterRed = true;
      }
      if(re && this.isLogin){
       this.handleRedMachine(re)
      }
      //判断是否是充gzh关注之后过来的
      var isgzh = localStorage.getItem('isgzh');
      if (isgzh) {
        var coin_price_id = document.URL.indexOf('catchme') !== -1 ? 104 : 17;
        var coupon_id = document.URL.indexOf('catchme') !== -1 ? 9 : 13;
        api.getFreeCoin({
          coin_price_id: coin_price_id,
          machine_no: 'CATCH_199999',
          coupon_id: coupon_id,
          token: CONFIG.token
        }).then((res) => {
          //正常领取成功
          this.isShowCoinTip = true;
          this.isClickStartGame = false;
          this.addCoinNum = res.data.coin_num;
          setTimeout(()=>{
            this.$store.commit('setCoins', res.data.coin_num);
            this.$store.dispatch('getUser');
            this.$store.dispatch('getOperations');
            this.isShowCoinTip = false;
          },1500)
        })
        localStorage.removeItem('isgzh')
      }
      if (CONFIG.isWx) {
        document.addEventListener('visibilitychange', function () {
          if (!document.hidden) {
            this.$store.dispatch('getUser');
            this.$store.dispatch('getOperations');
            this.handleActivityBountyInfo(2);
//            this.$store.dispatch('getActivityBountyInfo');
            if(this.contentShow === 'free'){
               this.bgShow = false;
            }
          }
        }.bind(this));
      } else if (CONFIG.isAlipay) {
        document.addEventListener('resume', function () {
          this.$store.dispatch('getUser');
          this.handleActivityBountyInfo(2);
//          this.$store.dispatch('getActivityBountyInfo')
//          this.bgShow = false;
        }.bind(this));
      }
      this.$store.dispatch('judgeMachine').then((res) => {
        localStorage.setItem('machine_obj', JSON.stringify({'url':document.URL,'time':new Date().getTime()}));
        //用户可以操作时间
        localStorage.setItem('userTime', (Date.now() - (localStorage.getItem('startTime2') ? localStorage.getItem('startTime2') : performance.timing.navigationStart)))
        this.Indicator.close();
        this.showHtml = true;
        this.isGetImg = true;
        if (res.online === 0) {
          this.$store.commit('changeTipContent', getErrMsg(1001));
        }
      })
//      this.$store.dispatch('getUser')
    },
    methods: {
      myStartGame(coin){
        this.isClickStartGame = false;
        this.isShowCoinTip = true;
        this.addCoinNum = coin;
        setTimeout(()=>{
          this.$store.dispatch('getUser');
          this.isShowCoinTip = false;
        },1500)
      },
      downloadArtifact(){
        this.$refs.task.useArtifact()
      },
      handleRedGame(unionid){
        var operation_id = this.redGroup.id || localStorage.getItem('redGameOpeId')
        this.$store.dispatch('getActivityBountyExchange',{operation_id:operation_id,machine_no:CONFIG.machine_no,unionid:unionid}).then(()=>{
          Toast({
            message: '成功领币',
            position: 'middle',
            duration: 1000
          })
          this.$store.dispatch('getUser')
          localStorage.removeItem('unionid')
          this.$store.dispatch('getOperations');
        }).catch((res)=>{
          Toast({
            message: res.message,
            position: 'middle',
            duration: 1000
          })
        })
      },
      downloadGame(){
        if(this.redGame.task_count == 0){
          localStorage.setItem('redGameOpeId',this.redGame.id)
          this.$store.dispatch('getActivityBountyExchange',{operation_id:this.redGame.id,machine_no:CONFIG.machine_no})
//            .then(()=>{
//            localStorage.setItem('redGameStep','step1')
//          })
          this.$store.dispatch('getUser');
          this.$store.dispatch('getOperations');
//          localStorage.setItem('redGameStep','step1')
          setTimeout(()=>{
            location.href = this.redGame.url;
          },300)
        }else if(this.redGame.task_count == 1){
          location.href = this.redGame.url;
        }
      },
      verificationGame(){
        if(this.redGame.task_count== 0 ){
          Toast({
            message: '请先完成第一步',
            position: 'middle',
            duration: 1000
          })
        }else if(this.redGame.task_count == 1){
          window.location.href = 'http://new.legaogame.com/getwxidbyapi.php?state='+document.URL
        }
      },
      handleRedMachine(re){
          this.$store.dispatch('getEnvelopeReceiveAction',re).then((res)=>{
            this.bgShow = true;
            this.redGroup = res.group;
            this.contentShow = 'coinred';
            if(res.type === 'coin'){
              this.isShowCoinTip = true;
              this.redCoinNum = res.coin_num;
              setTimeout(()=>{
                this.$store.dispatch('getUser');
              },1500)
            }
            localStorage.removeItem('re')
          }).catch((res)=>{
            this.bgShow = true;
            this.contentShow = 'failred'
            this.message = res.message
            localStorage.removeItem('re')
          })
      },
      handleGzh(){
        this.isShowCoinTip = true;
      },
      bankCard(info){
        this.bankOpe = info
      },
      sendUserInfo(){
        var reg = /^[\u4E00-\u9FA5]{2,4}$/;
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(!reg.test(this.bankUserInfo.username.trim())){
          Toast({
            message: '用户名不符合标准',
            position: 'middle',
            duration: 1000
          })
          this.bankUserInfo.username= ''
          return;
        }
        if(!myreg.test(this.bankUserInfo.phone.trim())){
          Toast({
            message: '手机号不符合标准',
            position: 'middle',
            duration: 1000
          })
          this.bankUserInfo.phone= ''
          return;
        }
        if(!this.isRequest){
          this.isRequest = true
          this.$store.dispatch('playerAddressAction',{username:this.bankUserInfo.username,phone:this.bankUserInfo.phone,operation_id:this.bankOpe.id}).then(()=>{
            this.$store.dispatch('getFreeCoin', {coin_price_id: this.bankOpe.coin_price.coin_price_id, coupon_id: this.bankOpe.coupon.id}).then((data) => {
              this.isRequest = false
              this.bgShow = false
              this.$store.commit('setCoins', data.data.coin_num);
              this.$store.dispatch('getUser');
              this.$store.dispatch('getOperations');
              window.location.href  = this.bankOpe.url
            }).catch(()=>{
              this.isRequest = false
            })
          }).catch(()=>{
            this.isRequest = false
          })
        }
      },
      taskGame(value){
        this.task_game=value
      },
      press1(){
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        setTimeout(()=>{
//          this.isShowGzhImg = true
          this.gzhCodeStyle = 'visibility: visible'
          this.isShowGzhButtton = false
        },100)
//        setTimeout(()=>{
//          this.isShowGzhButtton = false
//        },400)
        this.timeout1 = setTimeout(()=>{
          this.gzhCodeStyle = 'visibility: hidden'
          this.isShowGzhButtton = true
        },800)
      },
      press2(){
        this.timeout2 = setTimeout(()=>{
          this.gzhCodeStyle = 'visibility: hidden'
          this.isShowGzhButtton = true
        },400)
      },
      press3(){
        this.tencentImgTime = new Date().getTime();
      },
      press4(){
        var time = new Date().getTime()
        console.log(time - this.tencentImgTime)
        if((time - this.tencentImgTime) > 1500){
          _hmt.push(['_trackEvent', '任务：微保', '长按', '微保弹窗', '']);
        }
      },
      closeGuide2() {
        this.isShowGuide2 = false
      },
      goPre() {
        this.openTip(this.shuomingPre)
      },
      socket() {
        var self = this;
        if (!self.isConnectScoket) {
          self.io = socketio(CONFIG.socketUrl, {
            query: 'machine=' + CONFIG.machine_no,
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5
          })
          self.io.on('connect', function () {
            self.isConnectScoket = true
            self.io.on('prize', function () {
              self.handleActivityBountyInfo(1);
            })
            self.io.on('game_finish_score_0', function () {
              self.bgShow = true;
              self.contentShow = 'nobi'
            })
          })
          self.io.on('disconnect', function () {
            self.isConnectScoket = false
          })
        }
      },
      handleActivityBountyInfo(scene) {
        var prize_bounty = localStorage.getItem('prize_bounty')
        this.$store.dispatch('getActivityBountyInfo').then((res) => {
          if (res.prize_bounty > prize_bounty && this.activity_bounty.length > 0) {
            this.bgShow = true;
            this.contentShow = 'wawaTip';
            switch (scene) {
              case 1:
                _hmt.push(['_trackEvent', '抓中娃娃弹窗', '打开', 'websocket返回弹出', '']);
                break;
              case 2:
                _hmt.push(['_trackEvent', '抓中娃娃弹窗', '打开', '页面重新可见时弹出', '']);
                break;
            }
          }
          localStorage.setItem('prize_bounty', res.prize_bounty);
        })
      },
      goProfile() {
        _hmt.push(['_trackEvent', '点击用户头像', '点击', '跳转到个人中心', '']);
        if(document.URL.indexOf('www') !== -1){
          window.location.href = CONFIG.localtionUrl + '/profile'
        }else {
          window.location.href = CONFIG.localtionUrl2 + 'taobao/profile'
        }
      },
      handleRed(value, item) {
        _hmt.push(['_trackEvent', '点击娃娃', '点击', '点击娃娃', '']);
        //在每次领取之前，我需要先同步一次任务值，判断是否满足可以领取的
        var prize_bounty = localStorage.getItem('prize_bounty')
        this.$store.dispatch('getActivityBountyInfo').then((res) => {
          if (res.prize_bounty > prize_bounty) {
            _hmt.push(['_trackEvent', '抓中娃娃弹窗', '打开', '点击时娃娃是弹出', '']);
            this.bgShow = true;
            this.contentShow = 'wawaTip';
            localStorage.setItem('prize_bounty', res.prize_bounty);
            return;
          }
          if (res.recharge_bounty >= value) {
            //在这里需要发送一个请求去判断是否可以领取优惠券及用户所消耗的游戏币是否满足条件
            this.$store.dispatch('getActivityBountyStatus', item.id).then((res2) => {
              if (res2.can_exchange) {
                this.receiveGift(item)
              } else {
                //这里弹出让用户玩完所有的游戏币提示
                this.isShowGuide2 = true
                _hmt.push(['_trackEvent', '弹出解释弹出', '点击', '币没玩完弹出', '']);
              }
            })
          } else {
            this.currentActivityBounty = item
            this.couponList()
          }
        })
      },
      receiveGift(gift) {
        this.currentGift = gift;
        console.log(gift);
        this.openTip('receive');
      },
      couponList() {
        var len = this.activity_bounty.length;
        for (var i = 0; i < len; i++) {
          if (this.activity_bounty[i].vouchers.length > 0) {
            this.openTip('couponList');
            _hmt.push(['_trackEvent', '打开优惠券列表弹窗', '点击', '优惠券为：' + this.activity_bounty[i].voucher_batch.name, '']);
            return;
          }
        }
        _hmt.push(['_trackEvent', '弹出解释弹出', '点击', '币没满足且无兑换券', '']);
        this.openTip('jieshi');
      },
      receiveBiSuccess() {
        this.bgShow = true;
        this.contentShow = 'receiveBi';
        setTimeout(() => {
          this.centerStyle = 'opacity:1;clip-path:circle(100vh at 50vw 50vh)'
        }, 0)
        setTimeout(() => {
          this.bgShow = false;
          this.contentShow = '';
          this.centerStyle = 'opacity:0;clip-path:circle(8.67vw at 77.33vw 88vw)'
        }, 1500)
      },
      changeTaskGameProgress() {
        var len = this.activity_bounty.length;
        var n = this.task_now.recharge_bounty / this.activity_bounty[len - 1].voucher_batch.value * 180 + 180;
        if (n > 360) {
          n = 360;
        }
        this.starClass = 'animation';
        setTimeout(() => {
          this.starClass = '';
        }, 1000);
        this.ringStyle = `transform:  rotate(${n}deg);`
      },
      receiveCoupon() {
        this.$store.dispatch('getActivityBountyExchange', {operation_id:this.currentGift.id}).then((res) => {
          this.couponInfo = res.data;
//          this.isReceive = true;
          this.bgShow = true;
          this.contentShow = 'couponList';
          //重新获取任务值信息,并更新本地娃娃任务值
          this.$store.dispatch('getActivityBountyInfo')
          this.$store.dispatch('getOperations');
        })
      },
      useCoupon(code, end_time, name, category,type='') {
        _hmt.push(['_trackEvent', '打开使用优惠券弹窗', '点击', '使用优惠券为：' + name, '']);
        if (category === 0) {
          if(type === 'baomihua'){
            var clientWidth = window.innerWidth
              || document.documentElement.clientWidth
              || document.body.clientWidth;
            if(clientWidth <=320){
              this.codeHeight = 40;
              this.codeWidth = 1.8;
            }
            this.contentShow = 'baomihua';
          }else {
            this.contentShow = 'exchange3';
          }
        } else {
          this.contentShow = 'exchange2';
        }
        this.couponInfo.name = name;
        this.couponInfo.code = code;
        this.couponInfo.end_time = end_time;
        this.isReceive = false;
      },
      copy() {
        var clipboard = new Clipboard('.btncopy');
        clipboard.on('success', e => {
          console.log(e)
          _hmt.push(['_trackEvent', '点击复制优惠券', '点击', '复制优惠券为：' + this.couponInfo.name, '']);
          Toast({
            message: '复制成功',
            position: 'middle',
            duration: 1000
          })
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          Toast({
            message: '该浏览器不支持自动复制',
            position: 'middle',
            duration: 1000
          })
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      closeBg2() {
        this.bgShow = false
      },
      openTip(value, value2 = '',value3 = '') {
        if (value === 'shuoming') {
          this.shuomingPre = this.contentShow;
          _hmt.push(['_trackEvent', '打开活动说明', '点击', '打开活动说明', '']);
        }
        if(value === 'free'){
          this.isShowGzhButtton = true;
          this.gzhCodeStyle = 'visibility: hidden'
//          this.isShowGzhImg = false;
        }
        if(value === 'tencent'){
          var userId = this.user.reality_id;
          userId = userId.toString(36);
          this.tencentCodeImgUrl = 'http://api.datasuv.net/wesure/insure?m=MjRxN2J4c2F0&type=qrcode&user='+userId;
        }
        if(value === 'dalibaotip'){
          this.dalibaoIndex = value2;
        }
        if(value === 'baomihua'){
          this.couponInfo.name = this.dalibao[this.dalibaoIndex].vouchers[0].name
          this.couponInfo.end_time = this.dalibao[this.dalibaoIndex].vouchers[0].end_time
        }
        this.freeTipImg = value2;
        this.freeTip = value3;
        this.bgShow = true;
        this.contentShow = value;
      },
      tipButton() {
        if (this.tipContent.button === '扫码换机') {
          this.handleScanQRCode();
        } else {
          this.$store.commit('changeTipContent', {isShow: false});
        }
      },
      useDalibaoPay(){
        this.$refs.joPay.handlePay(this.dalibao[this.dalibaoIndex].coin_price.coin_price_id, this.dalibao[this.dalibaoIndex].coin_price.coin_num, this.dalibao[this.dalibaoIndex].coin_price.status, this.dalibao[this.dalibaoIndex].coin_price.coin_price, this.dalibao[this.dalibaoIndex].coin_price.type,this.dalibaoIndex);
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
        if(this.contentShowAfter){
          this.contentShow = this.contentShowAfter;
          this.contentShowAfter = '';
        }
        if (value === 'red') {
          _hmt.push(['_trackEvent', '关闭红包弹窗', '点击', '', '']);
        } else if (value === 'hide') {
          _hmt.push(['_trackEvent', '关闭' + this.pay.coin_price + '元弹窗优惠券', '点击', '', '']);
        }else if(value === 'redMachine' || ['failred','nobi','tencent'].includes(this.contentShow)){
          this.isAfterRed = true;
        }
        if (this.contentShow === 'exchange' || this.contentShow === 'exchange2') {
          return
        }
        if(this.contentShow === 'dalibaotip'){
          this.isAfterRed = true;
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
        this.isClickStartGame = true;
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
            this.socket();
            //投币成功，重新调用获取task_now的接口
            this.$store.dispatch('getActivityBountyInfo')
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
        } else if (CONFIG.isWx) {
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
        } else {
          Tida.scanCode(function (res) {
            if (res.code) {
              if (res.type !== 'ERROR') {
                window.location.href = res.code
              }
            }
          });
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
    watch: {
      dalibao(newValue,oldValue){
        for(var item of newValue){
          if(item.vouchers.length > 0){
            this.isShowBaomihuaList = true;
            break;
          }
        }
        if(newValue.length>0){
          if(this.contentShow){
            this.contentShowAfter = 'dalibaotip'
          }else {
            this.bgShow = true;
            this.contentShow = 'dalibaotip'
            this.isAfterRed = false;
          }
        }
      },
      isLogin(){
        var unionid = localStorage.getItem('unionid')
        if(unionid){
          this.handleRedGame(unionid)
        }
        var re = localStorage.getItem('re');
        if(re){
          this.handleRedMachine(re)
        }
      },
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
      task_now(newValue, oldValue) {
        if (this.activity_bounty.length === 0) {
          return;
        }
        if (newValue.recharge_bounty !== oldValue.recharge_bounty) {
          this.changeTaskGameProgress();
        }
      },
      //来设置图形的位置
      activity_bounty(newValue) {
        setTimeout(() => {
          var taskGiftList = document.querySelectorAll('.task-gift');
          var len = newValue.length;
          for (var i = 0; i < len; i++) {
            var n = newValue[i].voucher_batch.value / newValue[len - 1].voucher_batch.value;
            //根据角度获取圆环上的坐标点来进行定位
            var x1 = 241 - 215 * Math.cos(n * 3.14) - 60;
            var y1 = 222 - 215 * Math.sin(n * 3.14) - 38;
//            var x1 = 215 -  202 * Math.cos(n* 3.14);
//            var y1 = 209 -  202 * Math.sin(n* 3.14);
            var nowX1 = x1 / 7.5.toFixed(3) + 'vw';
            var nowY1 = y1 / 7.5.toFixed(3)+0.5+ 'vw';
            taskGiftList[i].style = `left:${nowX1};top:${nowY1}`;
          }
          this.isCalculated = true;
        }, 0)
      }
    },
    filters: {
      handleEndTime(value) {
        if (value) {
          return value.split(' ')[0].replace(/-/g, '.');
        } else {
          return value;
        }
      },
      handleEndTime2(value) {
        var arr = value.split(' ')[0].split('-');
        return arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
      },
      handleActivityBounty(value) {
        var sum = 0;
        for (var item of value) {
          sum += item.vouchers.length;
        }
        return sum
      },
      handleDes(value) {
        if (parseFloat(value)) {
          return parseFloat(value)
        } else {
          return 0
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../themes/default";
  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }

    14% {
      transform: scale(1.2);
    }

    28% {
      transform: scale(1);
    }

    42% {
      transform: scale(1.2);
    }

    70% {
      transform: scale(1);
    }
  }
  /*@keyframes my-pulse {*/
    /*from {*/
      /*transform: scale3d(1, 1, 1);*/
    /*}*/

    /*50% {*/
      /*transform: scale3d(1.08, 1.08, 1.08);*/
    /*}*/

    /*to {*/
      /*transform: scale3d(1, 1, 1);*/
    /*}*/
  /*}*/

  @keyframes wave-animation {
    0% {
      background-position: 0 top;
    }

    100% {
      background-position: 235px top;
    }
  }


  @mixin tipButton {
    width: 118px;
    height: 56px;
    text-align: center;
    -webkit-appearance: none;
    line-height: 56px;
    outline: none;
    font-size: 30px;
    border: none;
    color: $tipButtonColor;
    background: $tipButtonImg;
    background-blend-mode: normal,
    normal;
    box-shadow: 0px 3px 18px rgba(134, 106, 49, 0.13),
    0px 5px 32px rgba(134, 106, 49, 0.33);
    border-radius: 27px;
  }

  $bgColor: #fd673b;
  $bgRadius: 20px;
  @mixin center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @mixin centerX {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @mixin centerY {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  @keyframes turn {
    from {
      transform: rotateZ(0deg)
    }
    to {
      transform: rotateZ(360deg)
    }
  }

  .tipTitle {
    width: 100%;
    font-size: 36px;
    color: $tipTitleColor;
    line-height: 36px;
    height: 36px;
    position: relative;
    margin: 0 0 42px 0;
    b {
      padding: 0 10px;
      background: $tipTitleBBgColor;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    span {
      position: absolute;
      width: calc(100% - 66px);
      left: 33px;
      top: 17px;
      height: 2px;
      background: $tipTitleColor;
    }
  }

  .dlCoupon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include centerY;
    dt {
      float: left;
      margin: 0 0 0 24px;
      text-align: left;
      h4 {
        color: $dlCouponH4Color;
        font-size: 36px;
        line-height: 36px;
      }
      p {
        color: $dlCouponPColor;
        margin: 14px 0 0 0;
        font-size: 24px;
        line-height: 24px;
      }
    }
    dd {
      float: right;
      margin: 0 30px 0 0;
      button {
        @include tipButton;
      }
    }
  }

  .kefu2 {
    width: 324px;
    height: 347px;
    background-size: 100% 100%;
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    margin: -14px -14px 0 0;
    padding: 13px 13px 0 19px;
    transform: translate3d(100%, 0, 0);
    transition: all 0.4s;
    .kefu2-left {
      float: right;
      width: 58px;
      height: 62px;
      background: #fff2ee;
      border-radius: 18px 0 0 18px;
      line-height: 62px;
      text-align: center;
      img {
        width: 30px;
        height: 29px;
        vertical-align: middle;
      }
    }
    .kefu2-right {
      width: 234px;
      height: 320px;
      background: #fff2ee;
      padding: 30px 0 0 0;
      float: right;
      border-radius: 0 0 0 18px;
      .kefu2-img {
        width: 143px;
        height: 143px;
        padding: 3px;
        margin: 0 auto;
        background: #d83622;
        border-radius: 4px;
        img {
          width: 137px;
          height: 137px;
        }
      }
      h3 {
        font-size: 22px;
        line-height: 24px;
        color: $kefuTipColor;
        margin: 12px 0 28px 0;
        text-align: center;
      }
      p {
        font-size: 22px;
        text-align: center;
        a {
          color: $kefuPhoneColor;
        }
        span {
          display: inline-block;
          width: 27px;
          height: 26px;
          /*background: url("http://res.catchme.com.cn/imgs-2018-04-10/icon_phone.png") no-repeat;*/
          background: url("./../assets/small/icon_phone.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: top;
          margin: 0 8px 0 0;
        }
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

  .bg-center8 {
    > div {
      width: 640px;
      @include center;
      > div {
        width: 100%;
        height: 700px;
        background: $bgColor;
        border-radius: 20px;
        padding: 34px 0 0 0;
        img {
          width: 328px;
          height: 361px;
          margin: 54px 0 0 0;
        }
        p {
          font-size: 28px;
          line-height: 28px;
          color:$notCouponPColor;
          margin: 82px 0 0 0;
        }
      }
    }

  }

  .bg-center8-2 {
    > div {
      width: 640px;
      @include center;
      .imgBg {
        width: 100%;
      }
      .rule-main {
        width: 100%;
        height: 700px;
        background: $bgColor;
        border-radius: $bgRadius;
        font-size: 28px;
        color: #fff;
        padding: 34px 0 0 0;
        position: relative;
        .contentli {
          width: 100%;
          margin: 0 0 10px 0;
          line-height: 36px;
          float: left;
          padding: 0 45px;
          span {
            width: 40px;
            float: left;
            line-height: 40px;
            text-align: left;
          }
          p {
            width: calc(100% - 40px);
            float: left;
            text-align: left;
          }
        }
        .code {
          position: absolute;
          left: 70px;
          bottom: 50px;
          height: 153px;
          display: flex;
          align-items: center;
          img {
            width: 153px;
            height: 153px;
            float: left;
            margin: 0 40px 0 0;
          }
          > div {
            p {
              font-size: 22px;
              line-height: 22px;
              text-align: left;
              &:first-of-type {
                margin: 0 0 16px 0;
              }
            }
          }
        }
      }
    }
  }

  .bg-center9 {
    .bg-center9-center {
      position: absolute;
      z-index: 1001;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      /*margin: 0 0 0 15px;*/
      > div {
        width: 640px;
        /*height: 900px;*/
        /*background: #445ee4;*/
        position: relative;
        border-radius: 20px;
        .go-coupon-list {
          color: $goCouponListColor;
          font-size: 22px;
          text-decoration: none;
          position: absolute;
          line-height: 22px;
          right: 33px;
          bottom: 20px;
          i {
            font-size: 18px;
          }
        }
        .tipTitle {
          margin: 36px 0 0 0;
          position: absolute;
          left: 0;
          top: 0;
        }
        > img {
          width: 100%;
        }
        .scroll {
          width: 584px;
          height: 240px;
          /*background: url("./../assets/catch3/big_red_bg.png") no-repeat;*/
          /*background-size: 100% 100%;*/
          margin: 0 auto;
          padding: 0.1px;
          @include centerX;
          top: 112px;
          .spanh3 {
            color: $exchangeSpanH3Color;
            display: inline-block;
            font-size: 44px;
            line-height: 44px;
            margin: 40px 0 20px 0;
          }
          p {
            font-size: 24px;
            line-height: 24px;
            color: $exchangePColor;
            margin: 0 0 28px 0;
          }
          button {
            @include tipButton;
          }
        }
        .phone {
          margin: 42px 0 0 0;
          position: relative;
          > div {
            width: 340px;
            position: absolute;
            color: #fff;
            font-size: 26px;
            text-align: left;
            left: 42px;
            top: 96px;
            p {
              margin: 20px 0 0 0;
              span {
                opacity: 0;
              }
            }
          }
          img {
            width: 548px;
            height: 323px;
          }
        }
        .code {
          height: 153px;
          display: flex;
          align-items: center;
          img {
            width: 153px;
            height: 153px;
            float: left;
            margin: 0 26px 0 46px;
          }
          p {
            font-size: 22px;
            line-height: 22px;
            color: #fff;
            margin: 0 0 18px 0;
            &:last-of-type {
              margin: 0;
            }
          }
        }
      }
      .close {
        margin: 40px 0 0 0;
      }
    }

  }

  .bg-center9-2 {
    .bg-center9-center {
      position: absolute;
      z-index: 1001;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      /*margin: 0 0 0 15px;*/
      > div {
        width: 640px;
        height: 840px;
        background: #fd673b;
        /*background: url("http://res.catchme.com.cn/activity/task-2/snack_bg.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        position: relative;
        border-radius: 20px;
        padding: 36px 0 0 0;
        .food {
          width: 576px;
          height: 549px;
          background: url("./../assets/catch4/food_bg.png") no-repeat;
          background-size: 100% 100%;
          margin: 44px auto 0 auto;
          position: relative;
          .food-top {
            padding: 0.1px;
            img {
              width: 192px;
              height: 187px;
              display: block;
              margin: 42px auto 0 auto;
            }
            h4 {
              font-size: 28px;
              line-height: 28px;
              margin: 32px 0 16px 0;
              color: #494949;
            }
            p {
              font-size: 22px;
              color: #666;
              line-height: 22px;
            }
          }
          .exchange-code {
            width: 100%;
            height: 164px;
            /*background: red;*/
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 8px 0 0 0;
          }
        }
        .bottom {
          margin: 38px 0 0 0;
          /*background: red;*/
          img {
            width: 148px;
            height: 90px;
            float: left;
            margin: 0 0 0 54px;
          }
          p {
            font-size: 30px;
            color: #fff;
            float: left;
            margin: 14px 0 0 -30px;
          }
        }

      }
      .close {
        margin: 40px 0 0 0;
      }
    }
  }

  .bg-center10 {
    > div {
      width: 622px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      > div {
        width: 100%;
        height: 840px;
        background: #fff;
        /*margin: 0 0 122px 0;*/
        p {
          font-size: 40px;
          color: #000;
          width: 622px;
          text-align: center;
          line-height: 62px;
          margin: 0 0 34px 0;
        }
        button {
          width: 556px;
          height: 100px;
          border: none;
          outline: none;
          /*font-size: 0;*/
          color: #fff;
          &.btn1 {
            background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
            background-size: 100% 100%;
            bottom: 204px;
            font-size: 36px;
            margin: 0 0 26px 0;
          }
          &.btn2 {
            background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_recharge_default.png") no-repeat;
            background-size: 100% 100%;
            bottom: 62px;
            color: #f16319;
            /*text-shadow:0 0 10px #fff,
            4px 4px 6px blue,-4x -4px 6px blue;*/
          }
        }
        .imgBg {
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

  .bg-center11 {
    > div {
      width: 640px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .imgBg {
        width: 100%;
      }
      .bg-center11-top {
        width: 100%;
        height: 230px;
        position: relative;
        .con_bg {
          width: 556px;
          height: 189px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -12px;
          z-index: 999;
        }
        .top-wawa {
          /*width: 230px;*/
          height: 230px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .top-img {
          width: 600px;
          display: block;
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .bg-center11-main {
        width: 640px;
        height: 490px;
        background-color: #fd673b;
        /*background: url("./../assets/task-2/con_bg.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        border-radius: 20px;
        position: relative;
        .content {
          width: 584px;
          position: absolute;
          top: 34px;
          left: 50%;
          transform: translateX(-50%);
          /*background: pink;*/
          .tipTitle {
            margin: 0 0 36px 0;
          }
          > div {
            position: relative;
            width: 100%;
            height: 180px;
            background: url("http://res.catchme.com.cn/activity/task2/ticket_bg.png") no-repeat;
            background-size: 100% 100%;
          }
          h5 {
            font-size: 60px;
            color: $receiveBiNumColor;
            line-height: 60px;
            span {
              display: inline-block;
              width: 42px;
              height: 42px;
              background: url("./../assets/catch3/home_icon_bi.png") no-repeat;
              background-size: 100% 100%;
              margin: 0 5px 0 0;
            }
          }
          > P {
            font-size: 24px;
            color: $receivePColor;
            line-height: 24px;
            margin: 16px 0 40px 0;
          }
          .go-coupon-list {
            color: $receiveGoCouponListColor;
            font-size: 22px;
            text-decoration: none;
            position: absolute;
            line-height: 22px;
            right: 0;
            bottom: -42px;
            i {
              font-size: 18px;
            }
          }
          .go-shuoming {
            position: absolute;
            font-size: 22px;
            line-height: 22px;
            left: 0;
            bottom: -42px;
            margin: 0;
            text-decoration: underline;
          }
        }
      }

    }
    .imgBg {
      width: 622px;
    }
  }

  .bg-center12 {
    > div {
      @include center;
      > div {
        width: 640px;
        height: 900px;
        background: $couponListImgOrColor;
        border-radius: $bgRadius;
        padding: 34px 0 0 0;
        ul {
          width: 100%;
          /*padding: 0 28px;*/
          height: 790px;
          overflow: auto;
          li {
            background: red;
            width: 584px;
            height: 180px;
            background:$couponImg;
            background-size: 100% 100%;
            margin: 0 auto 9px auto;
            position: relative;
          }
        }
      }
    }
  }

  .bg-center13 {
    > div {
      @include center;
      .imgBg {
        width: 640px;
      }
      .qrcode{
        width: 114px;
        height: 114px;
        @include centerX;
        top:805px;
      }
      p{
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 30px;
        line-height: 30px;
        color: #353535;
        left: 0;
        top:723px;
        span{
          font-size: 34px;
          color: #de201b;
        }
      }
      .btn{
        width: 420px;
        height: 130px;
        @include centerX;
        top:810px;
        z-index: 666;
      }
    }
  }

  .bg-center14 {
    width: 100%;
    height: 100%;
    .center-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      /*background: red;*/
      /*position: absolute;*/
      /*z-index: 999;*/
      /*clip-path: circle(65px at 580px 660px);*/
      /*filter: none;*/
      /*transition: opacity,clip-path 0.5s;*/
      transition: all 1s;
      /*opacity: 0;*/
      /*display: none;*/
      /*pointer-events: none;*/
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        /*background: red;*/
        @include center;
        .top-high {
          width: 660px;
          height: 856px;
          /*background: red;*/
          padding: 0.1px;
          .top-high-bg {
            width: 674px;
            position: absolute;
            left: 0;
            top: 0;
          }
          .con-light {
            width: 734px;
            height: 500px;
            /*background: blue;*/
            margin: -25px 0 0 -37px;
            overflow: hidden;
            > img {
              width: 100%;
              animation: turn 5s linear infinite;
            }
          }
          p {
            font-size: 100px;
            color: #fff;
            position: absolute;
            width: 100%;
            left: 0;
            top: 240px;
            text-align: center;
          }
        }
      }
    }
  }

  .bg-center15 {
    width: 666px;
    height: 750px;
    background: $gameBgImgOrColor;
    background-size: 100% 100%;
    border-radius: 20px;
    @include center;
    > img {
      display: block;
      width: 308px;
      margin: 0 auto;
    }
    .water {
      width: 280px;
      height: 280px;
      background-color: $gameWaterBg;
      border: $gameWaterBorder;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin: 76px auto 59px auto;
      box-shadow: 0 11px 50px rgba(134, 106, 49, 0.49);
      .bol {
        width: 100%;
        background: $gameWaterImg;
        position: absolute;
        bottom: 0;
        left: 0;
        animation: wave-animation 1s infinite linear;
        transition: all 1s linear;
        background-size: 235px 255px;
      }
      .game-num {
        position: relative;
        font-size: 60px;
        color: $gameNumColr;
        line-height: 280px;
        b {
          font-size: 100px;
        }
      }
    }
    p {
      width: 100%;
      font-size: 50px;
      text-align: center;
      color: $gameTipColor;
      line-height: 50px;
      &:last-of-type {
        font-size: 36px;
        line-height: 36px;
        margin: 22px 0 111px 0;
      }
    }
    button {
      outline: none;
      border: none;
      width: 360px;
      height: 70px;
      background: linear-gradient(0deg,
        rgba(253, 102, 59, 0.65) 0%,
        rgba(254, 127, 66, 0.65) 100%),
      linear-gradient(
          #fd663b,
          #fd663b);
      box-shadow: 0px 3px 18px 0px rgba(134, 106, 49, 0.13),
      0px 5px 32px 0px rgba(134, 106, 49, 0.33);
      border-radius: 35px;
      font-size: 32px;
      color: $gameButtonColor;
    }
  }

  .bg-center16 {
    .center16-main {
      width: 640px;
      @include center;
      .imgBg {
        width: 100%;
      }
      h2 {
        font-size: 34px;
        line-height: 34px;
        color: #fff;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 80px;
      }
      .content {
        width: 100%;
        position: absolute;
        left: 0;
        top:140px;
        li {
          font-size: 26px;
          color: $shuomingColor;
          line-height: 48px;
          text-align: left;
          padding: 0 40px 0 48px;
          margin: 0 0 0 0;
        }
      }
      .back {
        position: absolute;
        text-align: center;
        width: 100%;
        left: 0;
        top:760px;
        color: $shuomingBackColor;
        font-size: 32px;
        line-height: 32px;
        text-shadow: 2px 2px 9px rgba(136, 80, 35, 0.56);
        i {
          width: 37px;
          height: 26px;
          display: inline-block;
          background: $shuomingBackIcon;
          background-size: 100% 100%;
          vertical-align: middle;
          margin: 0 3px 0 0;
        }
      }
      p {
        position: absolute;
        @include centerX;
        top: 768px;
        text-decoration: underline;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 1.2px;
        color: $jieshiPColor;
        opacity: 0.9;
        z-index: 666;
      }
      .btn {
        width: 414px;
        height: 124px;
        background: $jieshiButtonImg;
        background-size: 100% 100%;
        position: absolute;
        @include centerX;
        top: 647px;
        font-size: 32px;
        color: $jieshiButtonColor;
        line-height: 80px;
      }
      h3 {
        font-size: 34px;
        color: $jieshiH3Color;
        position: absolute;
        width: 100%;
        text-align: center;
        left: 0;
        top: 502px;
        line-height: 55px;
        i {
          display: inline-block;
          width: 40px;
          height: 37px;
          background: url("./../assets/guide/smlie.png") no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
          margin: -5px 0 0 10px;
        }
      }
      .baomihua{
        width: 244px;
        height: 136px;
        @include centerX;
        top:536px;
      }
      .go-coupon-list {
        color: #fff;
        font-size: 22px;
        text-decoration: none;
        line-height: 22px;
        @include centerX;
        bottom: 176px;
        i {
          font-size: 18px;
        }
      }
    }
    .main-baomihua{
      h3{
        top:484px;
      }
      .btn{
        top:676px;
      }
      p{
        top:790px;
      }
    }
  }

  .bg-center17{
    >div{
      width: 640px;
      @include center;
      .imgBg{
        width: 640px;
      }
      p{
        font-size: 24px;
        line-height: 36px;
        color: #fff;
        @include centerX;
        width: 100%;
        text-align: center;
        top:459px;
      }
      input {
        width: 460px;
        height: 68px;
        color:#888888;
        font-size: 28px;
        text-indent: 18px;
        background: #fff;
        border-radius: 8px;
        border: none;
        outline: none;
        @include centerX;
        &#username{
          top:553px;
        }
        &#phone{
          top:641px;
        }
      }
      .btn{
        width: 414px;
        height: 124px;
        background: url("./../assets/task-2/press_go_go.png") no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: none;
        font-size: 32px;
        color: #353535;
        top:749px;
        line-height: 74px;
        @include centerX;
      }
    }
  }

  .bg-center18,.bg-center19,.bg-center20{
    .btn{
      width: 360px;
      height: 70px;
      line-height: 70px;
      background-image: linear-gradient(0deg,
        rgba(193, 193, 193, 0.65) 0%,
        rgba(255, 255, 255, 0.65) 99%),
      linear-gradient(
          #ffffff,
          #ffffff);
      background-blend-mode: normal,
      normal;
      border-radius: 35px;
      font-size: 32px;
      color: #fd673b;
      @include centerX;
    }
  }

  .bg-center18{
    >div{
      @include center;
      color: #927247;
      .imgBg{
        width: 671px;
      }
      .avatar{
        width: 129px;
        height: 129px;
        border-radius: 50%;
        border: 3px solid #ff6138;
        @include centerX;
        top:60px;
      }
      .avatar-div{
        width: 129px;
        height: 129px;
        background:#ff6138;
        border-radius: 50%;
        @include centerX;
        top:60px;
        img{
          width: 110px;
          @include center;
        }
      }
      >h3{
        font-size: 32px;
        line-height: 32px;
        width: 100%;
        position:absolute;
        left: 0;
        top:213px;
        text-align: center;
      }
      >h2{
        font-size: 48px;
        line-height: 48px;
        width: 100%;
        position:absolute;
        font-weight: bold;
        left: 0;
        top:258px;
        text-align: center;
      }
      >p{
        font-size: 24px;
        line-height: 24px;
        width: 100%;
        position:absolute;
        left: 0;
        top:335px;
        text-align: center;
      }
      >h4{
        font-size: 24px;
        line-height: 24px;
        color: #ffb09c;
        width: 100%;
        text-align: center;
        @include centerX;
        top:493px;
        span{
          width: calc(100% - 98px);
          height: 2px;
          @include centerY;
          left: 49px;
          background: #ffb09c;
          z-index: -1;
        }
        b{
          background:#ff6138;
          padding: 0 20px;
        }
      }
      ul{
        width: 100%;
        height: 365px;
        @include centerX;
        top: 530px;
        overflow: auto;
        li{
          width: 100%;
          height: 65px;
          margin: 0 0 8px 0;
          padding: 0 50px;
          color: #fff;
          .ul-avatar{
            width: 65px;
            height: 65px;
            border: solid 2px #ffe8da;
            border-radius: 50%;
            float: left;
            /*background: #fdead4;*/
          }
          >div{
            width: 65px;
            height: 65px;
            background: #ffe8da;
            float: left;
            position: relative;
            border-radius: 50%;
            img{
              width: 53px;
              @include center;
            }
            &.red-avatar{
              background: #ffb09c;
              img{
                width: 32px;
              }
            }
          }
          p{
            font-size: 28px;
            line-height: 65px;
            float: left;
            margin: 0 0 0 10px;
          }
          span{
            font-size: 30px;
            line-height: 65px;
            float: right;
            font-weight: bold;
          }
        }
      }
      .btn{
        top:687px;
      }
    }
  }

  .bg-center19{
    >div{
      @include center;
      color: #fff;
      .imgBg{
        width: 697px;
      }
      h3{
        font-size: 32px;
        line-height: 32px;
        width: 100%;
        position:absolute;
        left: 0;
        top:464px;
        text-align: center;
        color: #fff787;
      }
      h2{
        font-size: 60px;
        line-height: 60px;
        width: 100%;
        position:absolute;
        left: 0;
        top:522px;
        text-align: center;
        color: #fff787;
      }
      p{
        font-size: 24px;
        line-height: 32px;
        width: 100%;
        position:absolute;
        left: 0;
        top:614px;
        text-align: center;
      }
      .btn{
        top:721px;
      }
    }
  }

  .bg-center20{
    @include center;
    >div{
      .content{
        width: 640px;
        height: 860px;
        background: #fd673b;
        border-radius: 36px;
        padding: 0.1px;
        color: #fff;
        .imgBg{
          width: 474px;
          height: 337px;
          display: block;
          margin: 125px auto 95px auto;
        }
        h3{
          font-size: 34px;
          line-height: 34px;
        }
        p{
          font-size: 24px;
          line-height: 24px;
          margin: 30px 0 0 0;
        }
        .btn{
          top:721px;
        }
    }
  }}

  .bg-center21{
    >div{
      @include center;
      .content{
        width: 640px;
        height: 860px;
        background: #fff;
        border-radius: 36px;
        padding: 0.1px;
        .imgBg{
          width: 474px;
          height: 405px;
          display: block;
          margin: 79px auto 73px auto;
        }
        h3{
          font-size: 34px;
          line-height: 34px;
          letter-spacing: 1.7px;
          color: #353535;
          width: 100%;
          text-align: center;
        }
        p{
          font-size: 24px;
          line-height: 24px;
          letter-spacing: 1.2px;
          color: #353535;
          width: 100%;
          text-align: center;
          margin: 29px 0 79px 0;
        }
        .btn{
          width: 360px;
          height: 70px;
          background-image: linear-gradient(0deg,
            rgba(253, 102, 59, 0.65) 0%,
            rgba(254, 127, 66, 0.65) 100%),
          linear-gradient(
              #fd663b,
              #fd663b);
          background-blend-mode: normal,
          normal;
          border-radius: 35px;
          font-size: 32px;
          color: #fff;
          line-height: 70px;
          @include centerX;
        }
      }
    }
  }

  .bg-center22{
    div{
      @include center;
      .imgBg{
        display: block;
        width: 640px;
        margin: 0 auto;
      }
      .code{
        width: 184px;
        height: 184px;
        @include centerX;
        bottom: 255px;
      }
    }
  }

  .bg-center23{
    div{
      @include center;
      .imgBg{
        display: block;
        width: 687px;
        margin: 0 auto;
      }
      .btn{
        width: 370px;
        height: 80px;
        @include centerX;
        top:752px;
        font-size: 0;
      }
    }
  }

  .bg-center24{
    div{
      @include center;
      width: 100%;
      color: #fff;
      .imgBg{
        display: block;
        width: 729px;
        /*margin: 0 auto;*/
        float: right;
      }
      .content{
        @include centerX;
        top:453px;
        h3{
          font-size: 32px;
          line-height: 32px;
        }
        p{
          font-size: 32px;
          line-height: 32px;
          margin: 8px 0 16px 0;
          span{
            font-size: 48px;
          }
        }
        h4{
          font-size: 24px;
          line-height: 24px;
          margin: 0 0 19px 0;
        }
        .arrow{
          width: 30px;
          height: 41px;
          display: block;
          margin:22px auto 9px auto;
        }
        button{
          width: 210px;
          height: 60px;
          background-image: linear-gradient(0deg,
            rgba(193, 193, 193, 0.65) 0%,
            rgba(255, 255, 255, 0.65) 99%),
          linear-gradient(
              #ffffff,
              #ffffff);
          background-blend-mode: normal,
          normal;
          border-radius: 30px;
          border: none;
          outline: none;
          color: #fb2032;
          font-size: 32px;
          &.is-down{
            color: #999999;
          }
        }
      }
    }
  }

  .bg-center25{
    >div{
      width: 704px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      .imgBg{
        display: block;
        width: 688px;
        float: right;
      }
      ul{
        max-height:720px;
        overflow: auto;
        @include centerX;
        top:328px;
        li{
          margin: 0 0 20px 0;
          width: 584px;
          height: 180px;
          background: url("http://res.catchme.com.cn/activity/dalibao/ticket_bg.png") no-repeat;
          background-size: 100% 100%;
          img{
            width: 584px;
            height: 180px;
            display: none;
          }
          >div{
            width: 348px;
            height: 100%;
            float: right;
            color: #8d3829;
            text-align: left;
            /*text-indent: 20px;*/
            padding: 0 0 0 20px;
            h3{
              font-size: 36px;
              line-height: 36px;
              margin: 55px 0 11px 0;
              font-weight: 600;
            }
            p{
              font-size: 22px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }

  .bg-center26{
    >div{
      width: 704px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      color:#8d3829;
      .imgBg{
        display: block;
        width: 688px;
        float: right;
      }
      >h3{
        font-size: 34px;
        line-height: 34px;
        @include centerX;
        top:347px;
      }
      >h4{
        font-size: 28px;
        line-height: 28px;
        @include centerX;
        top:661px;
      }
      >p{
        font-size: 22px;
        line-height: 22px;
        @include centerX;
        top:702px;
      }
      .exchange-code{
        @include centerX;
        top:780px;
        p{
          letter-spacing: 10px;
          font-size: 24px;
          line-height: 24px;
          margin: 5px 0 0 0 ;
        }
      }
      .tip{
        @include centerX;
        top:835px;
        font-size: 32px;
        line-height: 32px;
        font-weight: 600;
      }
    }
  }

  .bg-center27 {
    div {
      @include center;
      .imgBg {
        display: block;
        width: 640px;
        margin: 0 auto;
      }
      button{
        @include centerX;
        width: 400px;
        height: 100px;
        bottom: 160px;
        border: none;
        outline: none;
        font-size: 0;
        background: transparent;
      }
    }
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
    /*position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);*/
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
    background: $bgImgOrColor;
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
    padding: 0 0 0 20px;
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
    pointer-events: none;
  }

  .header .header-main h4 {
    /*font-size: 0.24px;*/
    font-size: 26px;
    color: $userNameColor;
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
    background: $coinsBgColor;
    float: left;
    /*min-width: 2px;*/
    position: relative;
    text-align: center;
  }

  .header .header-main .game > div {
    min-width: 160px;
    height: 62px;
  }
  .header .header-main .game  .coin-tip{
    width: 128px;
    height: 56px;
    position: absolute;
    right:-80px;
    top:0;
    animation-duration:2.5s;
    /*transition: all 1s;*/
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
    background:$coinsImg;
    background-size: 100% 100%;
    font-size: 0;
  }

  .header .header-main .game span {
    font-size: 36px;
    color: $coinsColor;
    font-weight: 600;
    margin: 0 0 0 10px;
    line-height: 70px;
    position: relative;
  }

  .header .header-main .game  .coin-animate{
    position: absolute;
    right:-10px;
    top:-10px;
    font-size: 50px;
    color: #FDCC09;
    animation-duration:2.5s;
    font-weight: bold;
  }

  .header .header-main .kefu {
    height: 62px;
    background: $coinsBgColor;
    position: absolute;
    right: 0;
    padding: 0 22px;
    border-radius: 15px 0 0 15px;
    pointer-events: auto;
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
    color: $coinsColor;
    font-size: 28px;
    height: 28px;
    line-height: 70px;
    margin: 0 0 0 55px;
    /*vertical-align: middle;*/
  }

  .main {
    width: 100%;
    height: 47.2%;
    /*min-height: 538px;*/
    min-height: 558px;
    /*height: calc(100% - 4.98px);*/
    position: relative;
  }

  .main .guide {
    position: absolute;
    background: rgba(0, 0, 0, 0.72);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    .guideImg2 {
      width: 560px;
      position: absolute;
      right: 100px;
      top: 46%;
    }
  }

  .activitys {
    width: 100%;
    /*overflow: hidden;*/
    /*padding: 0 0.22px;*/
    /*height: 2.04px;*/
    height: 14.4%;
    /*min-height: 178px;*/
    min-height: 168px;
    /*padding: 0 22px;*/
    position: relative;
  }
/*
  .main .main-center {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    //padding: 0 0.22px;
  }
  */

  .main .centerout {
    /*background: url("http://res.catchme.com.cn/imgs-2018-02-06/2/bg_begin.png") no-repeat;*/
    /*background: url("./../assets/small/bg_begin.png") no-repeat;*/
    background-size: 100% 100%;
    /*padding: 0.22px;*/
    padding: 20px;
    /*margin: 0.05px 0 0 0;*/
    width: 100%;
    /*height: 100%;*/
    position: absolute;
    @include center;
    > div {
      position: relative;
      z-index: 9999;
    }
  }

  .main .centerout .center {
    width: 100%;
    /*height: 5px;*/
    background: $mainCenterImgOrColor;
    /*margin: 0.32px 0 0 0;*/
    /*padding: 0.28px 0.2px 0 0.2px;*/
    /*padding: 90px 20px 0 20px ;*/
    padding: 96px 20px 0 20px;
    /*padding: 70px 20px 0 20px;*/
    /*border-radius: 10px;*/
    position: relative;
    border-radius: 16px;
    /*background: #fff;*/
    /*overflow: hidden;*/
    box-shadow: 2px 2px 10px rgba(206, 133, 74, 0.04), 0 0 18px rgba(206, 133, 74, 0.18), 0 0 24px rgba(206, 133, 74, 0.26);
  }

  .main .centerout .center .my_ticket{
    width: 126px;
    height: 147px;
    position: absolute;
    left: 49px;
    top:45px;
    img{
      width: 100%;
      height: 100%;
    }
    p{
      width: 126px;
      /*width: 100%;*/
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #8d3829;
      position: absolute;
      right: 0;
      bottom:8px;
    }
  }

  .main .centerout .center .ring {
    /*z-index: 5;*/
    z-index: 7;
    position: absolute;
    /*width: 392px;*/
    /*height: 213px;*/
    /*width: 417px;*/
    /*height: 240px;*/
    width: 460px;
    height: 261px;
    left: 50%;
    /*top: 36px;*/
    top: 44px;
    transform: translateX(calc(-50% - 8px));
    /*background: url("http://res.catchme.com.cn/activity/ring/progress-out.png");*/
    /*background: url("http://res.catchme.com.cn/activity/ring/process_bg2.png");*/
    background: url("http://res.catchme.com.cn/activity/task2/process_bg.png");
    background-size: 100% 100%;
    pointer-events: none;
    /*padding: 0.1px;*/
  }

  .main .centerout .center .ring .icon {
    width: 42px;
    height: 42px;
    position: absolute;
    font-size: 20px;
    left: 12px;
    bottom: 20px;
    background: $ringWawaImg;
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
    line-height: 58px;
    letter-spacing: -25;
  }

  .main .centerout .center .ring .icon b {
    font-size: 24px;
  }

  .main .centerout .center .ring .d {
    width: 424px;
    height: 215px;
    /*width: 380px;*/
    /*height: 196px;*/
    margin: 0 0 0 21.4px;
    padding: 6px 0 0 0;
    overflow: hidden;
    /*background: blue;*/
  }

  .main .centerout .center .ring .d .dd {
    width: 100%;
    /*height: 380px;*/
    height: 430px;
    transform: rotate(180deg);
    transition: transform 1s linear;
    /*display: none;*/
    /*animation: turn 1s linear infinite;*/
    /*background: pink;*/
  }

  .main .centerout .center .ring .d .dd > div {
    position: relative;
  }

  .main .centerout .center .ring .d .dd .star {
    width: 30px;
    height: 30px;
    /*background: red;*/
    position: absolute;
    bottom: 10px;
    right: -2px;
    /*z-index: 999;*/
  }

  .main .centerout .center .ring .d .dd .animation img {
    animation: turn 1s linear infinite;
  }

  .main .centerout .center .ring .d .dd .star .star1 {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 1px;
    top: 2px;
    /*animation: turn 1s linear infinite;*/
  }

  .main .centerout .center .ring .d .dd .star .star2 {
    width: 21.5px;
    height: 21.5px;
    position: absolute;
    left: 7px;
    top: 11px;
    /*animation: turn 1s linear infinite;*/
  }

  .main .centerout .center .ring .d .dd .star .star3 {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 6px;
    /*animation: turn 1s linear infinite;*/
  }

  .main .centerout .center .ring .d .dd .img {
    width: 424px;
    height: 215px;
    display: block;
  }
  /*
    .main .centerout .center .ring .ringp {
      color: #fff;
      position: absolute;
      bottom: 18px;
      left: 12px;
      background: blue;
      font-size: 20px;
      line-height: 51px;
      width: 51px;
      text-align: center;
      letter-spacing: -25;
    }

    .main .centerout .center .ring .ringp span {
      font-size: 24px;
    }
    */

    .main .centerout .center .ring .ringicon1 {
      width: 178px;
      height: 146px;
      position: absolute;
      bottom: -30px;
      right: -120px;
    }

    .main .centerout .center .ring .task-gift {
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: auto;
      z-index: 666;
    }

    .main .centerout .center .ring .task-gift > img {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .main .centerout .center .ring .task-gift .ring-tip {
      /*background: rgba(0,0,0,0.72);*/
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg {
    width: 92px;
    height: 92px;
    background: $ringCircleImg;
    background-size: 100% 100%;
    position: relative;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-quan {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    overflow: hidden;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-tip-ling {
    border:$ringWawaBorder;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-quan img {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .last {
    right: -105px;
    top:55px!important;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .nolast {
    left: -105px;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-content {
    position: absolute;
    text-align: center;
    top: -24px;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-content h3 {
    height: 24px;
    font-size: 18px;
    line-height: 32px;
    padding: 0 10px;
    color: $ringWawaTipColor;
    background: $ringWawaTipBg;
    display: inline-block;
    border-radius: 12px;
    overflow: hidden;
  }

  .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-content p {
    text-align: center;
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    color: $ringWawaGoColor;
    margin: 0 14px 4px 0;
    float: right;
  }

    .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .ring-content .hidden {
    opacity: 0;
  }


  .main .centerout .center .ring .progress {
    width: 100%;
    height: 100%;
    /*background: pink;*/
    /*polygon(0 0,26.133vw 0,26.133vw 26.667vw,0 26.667vw)*/
    /*clip-path: polygon( 0px 0px,20.779px 138.227px,196px 200px, 0px 200px);*/
    clip-path: polygon(0px 0px, 0px 0px, 0px 209px, 217px 209px, 0px 209px);
    transition: all 0.15s;
  }

  .main .centerout .center .ring .progress > img {
    width: 100%;
    height: 100%;
  }

  .main .center .tbz {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 15px;
    pointer-events: none;
  }

  .main .center > h3 {
    width: 194px;
    height: 74px;
    /*font-size: 0.32px;*/
    font-size: 32px;
    color: $saomaColor;
    /*margin: 0 0 0.1px 0;*/
    /*height: 0.64px;*/
    background: $saomaBg;
    line-height: 74px;
    position: absolute;
    border-radius: 0 16px 0 0;
    right: 0px;
    top: 0px;
    /*top:-0.28px;*/
    text-align: center;
    /*padding: 0.2px 0.3px;*/
  }

  .main .center > h3 > i {
    font-size: 30px;
  }

  .main .center .startgame {
    width: 358px;
    height: 361px;
    text-align: center;
    line-height: 306px;
    background: $startGameImg;
    background-size: 100% 100%;
    border: none;
    outline: none;
    font-size: 40px;
    color: #fff;
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 6;
    /*animation: heartBeat 1s linear infinite;*/
    /*animation: my-pulse 1s linear infinite;*/
    /*transform-style:preserve-3d;*/
  }

  .mypluse{
    /*animation: my-pulse 1s linear infinite;*/
    animation: heartBeat 1s linear infinite;
  }

  .main .center .hasclick {
    background: $startGameImg;
    background-size: 100% 100%;
  }

  .main .center .game-num {
    width: 418px;
    height: 93px;
    border: 1px solid $addAndReduceColor;
    border-radius: 18px;
    font-size: 24px;
    line-height: 91px;
    // margin: -63px auto 0 auto;
    margin: -118px auto 0 auto;
    background: #fff;
    color: #7e7e7e;
    text-align: center;
    position: relative;
    z-index: 6;
    overflow: hidden;
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
    color: $addAndReduceColor;
    text-align: center;
    height: 71px;
    line-height: 71px;
    /*height: 67px;*/
    /*line-height: 67px;*/
    border-right: 1px solid $addAndReduceColor;
    margin: 10px 0;
  }

  .main .center .game-num i:last-of-type {
    border-right: none;
    border-left: 1px solid $addAndReduceColor;
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
    font-size: 40px;
    color: $addAndReduceColor;
    font-weight: 600;
    line-height: 40px;
    margin: 0 0 8px 0;
  }

  .main .center .game-num > div p {
    font-size: 22px;
    color: $canPlayGameColor;
    line-height: 22px;
  }

  .main .center .tip {
    position: relative;
    height: 84px;
  }
  .main .center .tipbg{
    z-index: 7;
    background: #fff;
  }

  .main .center .tip > p {
    font-size: 24px;
    color: $tipColor;
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
    height: 26.4%;
    /*min-height: 310px;*/
    min-height: 300px;
    position: relative;
    /*padding: 0.36px 0.22px 0 0.22px;*/
    /*overflow: hidden;*/
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
    /*height: 44.5%;*/
    height: 45%;
  }

  .jo-version2 .activitys {
    /*height: 15.5%;*/
    height: 14.5%; //高度减少3%
    /*height: 16%;*/
  }

  .jo-version2 .main .center .game-num {
    width: 430px;
    height: 96px;
    margin: -118px auto 0 auto;
  }

  /*.jo-version2 .main .center .game-num > div h3 {*/
  /*line-height: 0.6px;*/
  /*margin: 0;*/
  /*}*/

  .jo-version2 .main .center .tip > p {
    line-height: 72px;
  }

  .jo-version2 .main .centerout .center .ring {
    /*top:52px;*/
    /*top: 40px;*/
    top: 68px;
  }

  .jo-version2 .main .center .startgame {
    /*width: 336px;*/
    /*height: 336px;*/
  }

  /*.jo-version2 .main .centerout {*/
  /*!*margin: 0.1px 0 0 0;*!*/
  /*padding: 22px 18px;*/
  /*}*/

  .jo-version2 .main .centerout .center {
    /*padding: 90px 20px 0 20px;*/
    //上面加了30px
    padding: 120px 20px 0 20px;
  }

  /*
  .jo-version2 .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .last {
    right: -70px;
  }

  .jo-version2 .main .centerout .center .ring .task-gift .ring-tip .ring-tip-bg .nolast {
    left: -70px;
  }
  */
  .jo-version2 .header > div {
    top: 55%;
    /*padding: 0 0 0 18px;*/
  }

  .jo-version2 .main .center .tip {
    height: 100px;
  }

  .jo-version2 .footer {
    height: 28.5%;
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
