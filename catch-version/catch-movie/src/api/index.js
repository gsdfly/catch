import $axios from 'axios'
import CONFIG from './../config/index'
import {jsonToStr} from "../util/index";
import {getErrMsg,SetCookie} from "../util/index";
import store from './../store'
import callbackUrl from './../callbackUrl'

let instance = $axios.create({
  params: {
    version: CONFIG.version,
    scene:CONFIG.scene,
  }
})

instance.interceptors.response.use(function(response) {
  // 错误码信息
  let res = response.data
  if (res.status_code !== 200) {
    // sendError({code:response.data.status_code,message:response.data.message,url:response.config.url});
    if(res.status_code !== 1015 && res.status_code !== 1016){
      store.commit('changeTipContent',getErrMsg(res.status_code, res.message))
    }
    // if(res.status_code === 1014){
    //   SetCookie('token_', '')
    //   localStorage.removeItem('encrypt')
    //   localStorage.removeItem('auth_type')
    //   location.reload();
    // }
    return Promise.reject(res);
  }
  return res
}, async function(error) {
  // Do something with response error
  // sendError({code:error.response.data.status_code,message:error.response.data.message,url:error.config.url});
  // if(error.response.data.status_code === 401){
  //   await callbackUrl();
  // }
  if (error.response.data.status_code === 401) {
    SetCookie('token_', '')
    localStorage.removeItem('encrypt')
    localStorage.removeItem('auth_type')
    location.reload();
    return;
  }
  if (error.response.data.status_code === 429) {
    store.commit('changeTipContent',{
      imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip8.png",
      content: ['已经领取过了'],
      button: '知道了',
      isShow: true
    });
    return Promise.reject(error);
  }
    console.log(error, '全局err')
  store.commit('changeTipContent',{
    imgSrc:"http://res.catchme.com.cn/imgs-2018-02-05/tip/tip1.png",
    content:['娃娃机出了点状况','请跟换机器'],
    button:'扫码换机',
    isShow:true
  });
  console.log(store.state.user.tipContent)
  return Promise.reject(error);
})

function sendError(obj) {
  var str = {
    play_id:store.state.user.user.play_id || "",
    machine_no:CONFIG.machine_no,
    extra:JSON.stringify({
      code:obj.code,
      message:obj.message,
      url:obj.url
    })
  };
  instance.get(CONFIG.url+'api/error', {params:str})
}

export default {
  getUser: function (params) {
    return instance.get(CONFIG.url + 'api/player/info', {
      params: params
    })
  },
  getCoinList: function (params) {
    return instance.get(CONFIG.url + 'api/machine/coin_price', {
      params: params
    })
  },
  getConsume: function (params) {
    return instance.get(CONFIG.url + 'api/player/consume', {
      params: params
    })
  },
  getPayJssdk: function (params) {
    return instance.get(CONFIG.url + 'api/wechat/order', {
      params: params
    })
  },
  getPayAlipay:function (params) {
    return instance.post(CONFIG.url + 'api/alipay/tradeOrder', jsonToStr(params))
  },
  getPayTpp: function (params) {
    return instance.get(CONFIG.url + 'api/tpp/order', {
      params: params
    })
  },
  judgeMachine: function (params) {
    return instance.get(CONFIG.url + 'api/machine/info', {
      params: params
    })
  },
  getFreeCoin: function (params) {
    return instance.post(CONFIG.url + 'api/free/order', jsonToStr(params))
  },
  startingDevice: function (params) {
    return instance.post(CONFIG.url + 'api/machine/launch', jsonToStr(params))
  },
  InfiniteGame:function (params) {
    return instance.post(CONFIG.url + 'api/machine/unlimited', jsonToStr(params))
  },
  getOperations:function (params) {
    return instance.get(CONFIG.url +'api/operation/v2', {
      params: params
    })
  },
  consumer:function (params) {
    return instance.post(CONFIG.url +'api/player/coupon/receive', jsonToStr(params))
  },
  useCoupons:function (params) {
    return instance.get(CONFIG.url + 'api/machine/info', {
      params: params
    })
  },
  redReceive:function (params) {
    return instance.post(CONFIG.url + 'api/player/red/coupon/receive',jsonToStr(params));
  },
  getVersion:function (params) {
    return new Promise((success,error)=>{
      instance.get(CONFIG.url+'api/site/version', {
        params: params
      }).then((data)=>{
        success(data)
      }).catch((err)=>{
        error(err)
      })
    })
  },
  getActivityPromocode:function (params) {
    return instance.get(CONFIG.url+'api/activity/promocode', {
      params: params
    })
  },
  //用户扫码记录
  machineLogin:function (params) {
    return instance.get(CONFIG.url + 'api/machine/login',{
      params: params
    });
  },
  //提交页面各个阶段的统计时间
  timeOthers:function (params) {
    return instance.post(CONFIG.url + 'api/time/others',jsonToStr(params));
  },
  // //获取奖励金
  // getActivityBounty:function (params) {
  //   return instance.get(CONFIG.url+'api/activity/bounty', {
  //     params: params
  //   })
  // },
  // //领取券
  // getActivityReceive:function (params) {
  //   return instance.get(CONFIG.url+'api/activity/receive', {
  //     params: params
  //   })
  // },
  getActivityBountyInfo:function (params) {
    return instance.get(CONFIG.url+'api/bounty/info', {
      params: params
    })
  },
  //奖励金兑换，这个是任务的
  getActivityBountyExchange:function (params) {
    return instance.get(CONFIG.url+'api/bounty/exchange', {
      params: params
    })
  },
  //授权登录，获取token
  getToken:function (params) {
    return instance.get(CONFIG.url + 'api/auth/login', {
      params: params
    });
  },
  //根据用户的id来获取token
  getToken2:function (params) {
    return instance.get(CONFIG.url + 'api/auth/token', {
      params: params
    });
  },
  getBountyStatus:function (params) {
    return instance.get(CONFIG.url + 'api/bounty/status', {
      params: params
    });
  },
  playerAddress:function (params) {
    return instance.post(CONFIG.url + 'api/player/address',jsonToStr(params));
  },
  //领取红包
  // url: CONFIG.url + 'api/envelope/receive',
  getEnvelopeReceive:function (params) {
    return instance.post(CONFIG.url+'api/envelope/receive',jsonToStr(params))
  },
  //
  sendVideoStatus:function (params) {
    return instance.post(CONFIG.url+'api/video/status',jsonToStr(params))
  },
  getVideoExchange:function (params) {
    return instance.post(CONFIG.url+'api/video/exchange',jsonToStr(params))
  },
}
