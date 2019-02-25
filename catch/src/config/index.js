import {GetCookie, getParamByName} from '../util'

function IsWeixinOrAlipay() {
  var ua = window.navigator.userAgent.toLowerCase()
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') return "WeiXin"
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') return "Alipay"
  //判断是不是天猫
  if (ua.match(/tmall/i) == 'tmall') return "tmall"

  if (ua.match(/tbmovie/i) == 'tbmovie') return "Tpp"
  //哪个都不是
  return "false"
}


var expName = IsWeixinOrAlipay();

function isAlipayOpen() {
  var arr = ['CATCH_101087','CATCH_101092','CATCH_101097','CATCH_100984']
  if(IsWeixinOrAlipay() !== 'Alipay' && arr.includes(getParamByName('machine'))){
    return true
  }else {
    return false
  }
}

function isTmallOpen() {
  // var arr =  ['CATCH_100295','CATCH_100333','CATCH_100368']
  var arr = []
  if(arr.includes(getParamByName('machine')) && IsWeixinOrAlipay() !== 'Alipay'){
    return true
  }else {
    return false
  }
}

let CONFIG = {
  url: document.URL.indexOf('catchme') !== -1 ? 'http://front.catchme.com.cn/' : 'http://front.5zhua.cn/',
  localtionUrl: document.URL.indexOf('catchme') !== -1 ? 'http://www.catchme.com.cn/catch/' : 'http://www.5zhua.cn/catch/',
  version: '1.0.0',
  scene: 1,
  //属性拦截 get 和 set 方法重写
  get token(){
    return   process.env.NODE_ENV === 'development' ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Zyb250LjV6aHVhLmNuL2FwaS9hdXRoL3Rva2VuIiwiaWF0IjoxNTM3ODQxMzk1LCJleHAiOjE1MzgwNTczOTUsIm5iZiI6MTUzNzg0MTM5NSwianRpIjoiV29oVWZIN21RMldVUjZjQyIsInN1YiI6Mn0.lIWWpapJZWiHDlWGCa1ibbyGED9QDPgktrHMBPIYNgI' : GetCookie('token_')
  },
  machine_no: getParamByName('machine') || 'CATCH_100024',
  u: function () {
    return `?machine=${this.machine_no}&token=${this.token}`
  },
  isWx: expName === 'WeiXin' ? true : false,
  isAlipay: expName === 'Alipay' ? true : false,
  isTpp: expName === 'Tpp' ? true : false,
  isTmallOpen:isTmallOpen(),
  isAlipayOpen:isAlipayOpen()
}


export default CONFIG
