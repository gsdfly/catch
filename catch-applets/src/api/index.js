
import CONFIG from './../config/index'
import {ajax} from './../config/ajax'

export default {
  onLogin: function (params) {
    return ajax(CONFIG.url + 'api/mini/onLogin', params,'POST')
  },
  getUser: function (params) {
    return ajax(CONFIG.url + 'api/player/info', params)
  },
  getCoinList: function (params) {
    return ajax(CONFIG.url + 'api/machine/coin_price', params)
  },
  getConsume: function (params) {
    return ajax(CONFIG.url + 'api/player/consume', params)
  },
  getPayJssdk: function (params) {
    return ajax(CONFIG.url + 'api/mini/order', params)
  },
  judgeMachine: function (params) {
    return ajax(CONFIG.url + 'api/machine/info', params)
  },
  getFreeCoin: function (params) {
    return ajax(CONFIG.url + 'api/free/order', params,'POST')
  },
  startingDevice: function (params) {
    return ajax(CONFIG.url + 'api/machine/launch', params,'POST')
  },
  InfiniteGame:function (params) {
    return ajax(CONFIG.url + 'api/machine/unlimited', params,'POST')
  },
  getOperations:function (params) {
    return ajax(CONFIG.url +'api/operation/v2', params)
  },
  consumer:function (params) {
    return ajax(CONFIG.url +'api/player/coupon/receive', params,'POST')
  },
  useCoupons:function (params) {
    return ajax(CONFIG.url + 'api/machine/info', params)
  },
  redReceive:function (params) {
    return ajax(CONFIG.url + 'api/player/red/coupon/receive',params,'POST');
  },
  getVersion:function (params) {
    return ajax(CONFIG.url+'/api/site/version',params)
  },
  fallback:function (params) {
    return ajax(CONFIG.url +'api/fallback', params,'POST')
  },
}
