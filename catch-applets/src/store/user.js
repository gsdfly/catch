import CONFIG from '../config'
import api from './../api/index'
import {changeTipOperation} from "../utils/index";

const state = {
  isLogin:false,
  user: {
    avatar: '',
    coins: 0,
    nick_name: '',
    open_id: '',
    player_id: '',
    coin_infinite:false
  },
  coin: [],
  consume: {
    data: [],
    meta: {
      pagination: {}
    }
  },
  info: {
    coin_num: 0
  },
  machine_no: '',
  operations:[],
  hide_coupons:[], //隐藏优惠券
  tipContent:{
    imgSrc:"",
    content:[],
    button:'',
    isShow:false
  },
  user_progress:{
    voucher_list:[],
    grab_num:0,
    state:false
  },
  isPayBack:false,
  show_tip_operation:{isShow:false,tipObj:{image:''}},
  tip_operation:{}
}

const mutations = {
  changeIsLogin(state){
    state.isLogin = true;
  },
  setUser(state, user) {
    state.user = user
  },
  setCoins(state, coin) {
    state.user.coins = state.user.coins + coin
  },
  setCoinList(state, coin) {
    state.coin = coin
  },
  setConsume(state, consume) {
    state.consume = consume
  },
  setMachineNo(state) {
    if (CONFIG.machine_no) {
      state.machine_no = CONFIG.machine_no
    }
  },
  setInfo(state, info) {
    state.info = info
  },
  setInfinite(state,flag){
    state.user.coin_infinite = flag;
  },
  setOperations(state,operations){
    state.operations = operations
  },
  setHideCoupons(state,hideCoupons){
    state.hide_coupons = hideCoupons;
  },
  changeTipContent(state,tipContent){
    state.tipContent = tipContent
  },
  setUserProgress(state,user_progress){
    state.user_progress = user_progress;
  },
  changePayBack(state,payBack){
    state.isPayBack = payBack;
  },
  setTipOperation(state,tip_operation){
    state.tip_operation = tip_operation;
  },
  changeShowTipOperation(state,obj){
    state.show_tip_operation = obj;
  },
}

const actions = {
  getUser({commit}) {
    return new Promise((success, error) => {
      api.getUser({token:CONFIG.token}).then((data) => {
        commit('setUser', data.data.data)
        success(data.data.data)
      }).catch((res)=>{
        error(res)
      })
    })
  },
  getCoinList({commit}) {
    return new Promise((success, error) => {
      api.getCoinList({
        machine_no: state.machine_no,
        token:CONFIG.token
      }).then((data) => {
        commit('setCoinList', data.data.data);
        success();
      })})
  },
  getConsume({commit}, page) {
    return new Promise((success, error) => {
      api.getConsume({
        page_index: page.page_index,
        page_size: page.page_size,
        token:CONFIG.token
      }).then((data) => {
        commit('setConsume', data.data)
        const p = data.data
        success(p)
      })
    })
  },
  getPayJssdk(ctx,ids) {
    return new Promise((success, error) => {
      if(ids.coupon_id){
        api.getPayJssdk({
          coin_price_id: ids.coin_price_id,
          coupon_id:ids.coupon_id,
          machine_no: ctx.state.machine_no,
          token:CONFIG.token
        }).then((data) => {
          ctx.commit('changePayBack',true);
          success(data.data)
        }).catch(()=>{
          error()
        })
      }else {
        api.getPayJssdk({
          coin_price_id: ids.coin_price_id,
          machine_no: ctx.state.machine_no,
          token:CONFIG.token
        }).then((data) => {
          success(data.data)
          ctx.commit('changePayBack',true);
        }).catch(()=>{
          error()
        })
      }

    })
  },
  judgeMachine(ctx) {
    return new Promise((success, error) => {
      api.judgeMachine({
        machine_no: ctx.state.machine_no,
        token:CONFIG.token
      }).then((data) => {
        ctx.commit('setInfo', data.data.data)
        success(data.data.data)
      }).catch((res)=>{
        error(res)
      })
    })
  },
  getFreeCoin(ctx, ids) {
    return new Promise((success, error) => {
      if(ids.coupon_id){
        api.getFreeCoin({
            coin_price_id:ids.coin_price_id,
            machine_no:ctx.state.machine_no,
            coupon_id:ids.coupon_id,
            token:CONFIG.token
          }
        ).then((data) => {
          success(data.data)
        }).catch((err)=>{
          error(err);
        })
      }else {
        api.getFreeCoin({
            coin_price_id:ids.coin_price_id,
            machine_no:ctx.state.machine_no,
            token:CONFIG.token
          }
        ).then((data) => {
          success(data.data)
        }).catch((err)=>{
          error(err);
        })
      }
    })
  },
  startingDevice(ctx, num) {
    return new Promise((success, error) => {
      api.startingDevice({
        coin_num: num,
        machine_no: CONFIG.machine_no,
        token:CONFIG.token
      }).then((data) => {
        if (data.data.status_code === 200) {
          var s = ctx.state.user
          s.coins = data.data.data.coin_total
          s.game_ticket = data.data.data.game_ticket
          if(s.coins === 0 && s.game_ticket === 0 && ctx.state.tip_operation.workout){
            changeTipOperation(ctx.state.tip_operation.workout,'alreadyTipWorkout',ctx);
          }
          ctx.commit('setUser', s)
          success()
        } else {
          error()
        }
      }).catch((err)=>{
        error(err);
      })
    })
  },
  InfiniteGame(ctx){
    return new Promise((success,error)=>{
      api.InfiniteGame({machine_no:ctx.state.machine_no,token:CONFIG.token}).then((data)=>{
        if (data.data.status_code === 200) {
          ctx.commit('setInfinite',0);
          success();
        }else {
          ctx.commit('setInfinite',1);
          error(err);
        }
      }).catch((err)=>{
        ctx.commit('setInfinite',1);
        error(err);
      })
    })
  },
  //获取优惠券列表
  getOperations:function (ctx) {
    return new Promise((success,err)=>{
      api.getOperations({machine_no:ctx.state.machine_no,token:CONFIG.token}).then((data)=>{
        //对运营位进行过滤
        var res = data.data.data;
        var operationsList = [];
        var hideCoupons = [];
        for(var i=0;i<res.length;i++){
          if(res[i].type ===1 ){
            if(res[i].coupon){
              if(res[i].coupon.type === 2 ){
                operationsList.push(res[i]);
              }else if(res[i].coupon.type === 1 && ((res[i].coin_price.coin_price - res[i].coupon.reduce) >0) ){
                operationsList.push(res[i]);
              }else if(res[i].coupon.type === 0 && ((res[i].coin_price.coin_price*res[i].coupon.reduce/100) >0)){
                operationsList.push(res[i]);
              }
            }
          }else if(res[i].type ===4 ){
            if(res[i].coupon.status === 2){
              res[i].timeType = 'used';
            } else if(res[i].coupon.status ===0){
              res[i].timeType = 'unreceived'
            }else if(res[i].coupon.status === 1){
              if(res[i].coupon.id === -1){
                res[i].timeType = 'notPrize';
              }else {
                res[i].timeType = 'received';
              }
            }
            operationsList.push(res[i]);
          }else if(res[i].type ===5 ){
            hideCoupons.push(res[i]);
          }else if(res[i].type === 2){
            operationsList.push(res[i]);
          }else if(res[i].type === 6){
            var endTime = res[i].end_time.replace(/-/g,',');
            endTime = new Date(endTime).getTime();
            var nowTime = new Date().getTime();
            if(endTime >= nowTime){
              ctx.commit('setTipOperation',res[i]);
            }
        }}
        ctx.commit('setHideCoupons',hideCoupons);
        ctx.commit('setOperations',operationsList)
        success(operationsList)
      })
    })
  },
  //领取优惠券
  consumer:function (ctx,ids) {
    return new Promise((success,error) => {
      api.consumer({coupon_ids:ids.coupon_id,token:CONFIG.token}).then((data)=>{
        if (data.data.status_code === 200) {
          success(data.data)
        }else {
          error(data.data)
        }
      }).catch((err)=>{
        error(err)
      })
    })
  },
  //使用优惠券
  useCoupons:function (ctx,id) {
    return new Promise(() => {
      api.useCoupons({id:id,token:CONFIG.token}).then((data) => {
      })
    })
  },
  //抢红包
  redReceive:function (ctx,record_id) {
    return new Promise(() => {
      api.redReceive({record_id:record_id,token:CONFIG.token}).then((data) => {
      })
    })
  },
  getUserProgress:function (ctx) {
    return new Promise((success,err)=>{
      api.fallback({machine_no:ctx.state.machine_no,token:CONFIG.token}).then((res)=>{
        if(res.data.data){
          if(!res.data.data.voucher_list){
            res.data.data.voucher_list = [];
          }
          ctx.commit('setUserProgress',res.data.data);
          success(res.data.data)
        }else {
          success({
            voucher_list:[],
            grab_num:0,
            state:false
          })
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
