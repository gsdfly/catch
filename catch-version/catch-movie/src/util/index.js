export const getParamByName = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]);
  return null
}

export const GetCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

export const SetCookie = (name, value) => {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + 60 * 60 * 1000*6)//过期时间 60分钟*6
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

// //测试淘票票生成唯一id
// export const generateUUID = () => {
//   var d = new Date().getTime();
//   var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = (d + Math.random() * 16) % 16 | 0;
//     d = Math.floor(d / 16);
//     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//   });
//   return uuid;
// }

//判断错误
export const getErrMsg = (errCode, message) => {
  let m = {};
  if (errCode) {
    switch (errCode) {
      case 1001:
      case 1006:
      case 1007:
      case 1004:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip1.png",
          content: ['娃娃机出了点状况'+errCode, '请更换机器'],
          button: '扫码换机',
          isShow: true
        }
        break;
      case 1002:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip3.png",
          content: ['充值额度不存在'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1003:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip4.png",
          content: ['您已打到最高购买次数', '请按原价购买'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1005:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip5.png",
          content: ['游戏币数量不足'],
          button: '去充值',
          isShow: true
        }
        break;
      case 1008:
      case 1009:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip2.png",
          content: ['尚有分，还能继续玩哦'+errCode, '请玩完在上分'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1010:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip7.png",
          content: ['不满足优惠券使用条件'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1011:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip6.png",
          content: ['充值订单异常'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1012:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip8.png",
          content: ['已经领取过了'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1013:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip9.png",
          content: [message],
          button: '知道了',
          isShow: true
        }
        break;
      case 1014:
        if (message.indexOf('无限') !== -1 || message.indexOf('游戏') !== -1) {
          m = {
            imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip2.png",
            content: ['尚有分，还能继续玩哦', '请玩完在上分'],
            button: '知道了',
            isShow: true
          }
        } else {
          m = {
            imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip1.png",
            content: ['娃娃机出了点状况', '请更换机器'],
            button: '扫码换机',
            isShow: true
          }
        }
        break;
      default:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip1.png",
          content: ['娃娃机出了点状况', '请更换机器'],
          button: '扫码换机',
          isShow: true
        }
        SetCookie('token_', '')
        break
    }
  }
  return m
}

export const jsonToStr = (obj) => {
  var str = '';
  if (Object.keys) {
    var keys = Object.keys(obj)
    for (var key in obj) {
      if (key != keys[keys.length - 1]) {
        str += key + '=' + obj[key] + '&';
      } else {
        str += key + '=' + obj[key];
      }
    }
  } else {
    for (var key in obj) {
      str += key + '=' + obj[key] + '&';
    }
  }
  return str;
}

export const locationHref = (version) => {
  var url = '';
  SetCookie('site_version_id',version);
  if (version) {
    switch (version) {
      case 1:
        url = 'place.html?'
        break;
      case 2:
        url = 'fallback.html?'
        break;
      case 3:
        url = 'redpacket.html?'
        break;
      case 4:
        url = 'promocode.html?'
        break;
    }
  }
  return url;
}


export const changeTipOperation = (tipOperationObj, loalStorageName, store) => {
  if (tipOperationObj.trigger === 'once') {
    var alreadyTip = localStorage.getItem(loalStorageName);
    var time = new Date().getDate() + '';
    if (!(alreadyTip && time === alreadyTip)) {
      localStorage.setItem(loalStorageName, time);
      store.commit('changeShowTipOperation', {isShow: true, tipObj: tipOperationObj});
    }
  } else {
    store.commit('changeShowTipOperation', {isShow: true, tipObj: tipOperationObj});
  }
}


export const payment = (CONFIG, params, self, callback) => {
  if (CONFIG.isWx) {
    self.$store.dispatch('getPayJssdk', params)
      .then((data) => {
        if (data.status_code === 200) {
          const d = data.data
          wx.chooseWXPay({
            timestamp: d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: d.nonceStr, // 支付签名随机串，不长于 32 位
            package: d.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: d.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: d.paySign, // 支付签名
            success: function (res) {
              // self.isRequest = false;
              // if(self.tip_operation.recharged){
              //   changeTipOperation(self.tip_operation.recharged,'alreadyTipEnterRecharged',self.$store);
              // }
              // if (type !== 1) {
              //   self.$store.commit('setCoins', coin)
              //   self.$emit('closeBg');
              // } else {
              //   self.$store.dispatch('InfiniteGame').then(() => {
              //     self.$emit('changeTip');
              //   })
              // }
              // self.getCoinList()
              callback();
            },
            cancel: function (res) {
              self.isRequest = false;
              console.log(res);
            }
          })
        }
      }).catch(() => {
      self.isRequest = false;
    })
  }else if(CONFIG.isAlipay){
    self.$store.dispatch('getPayAlipay', params).then((data) => {
      AlipayJSBridge.call("tradePay", {
        tradeNO: data.data.trade_no
      }, function (result) {
        if (result.resultCode == '9000') {
          // self.isRequest = false
          //   if(self.tip_operation.recharged){
          //     changeTipOperation(self.tip_operation.recharged,'alreadyTipEnterRecharged',self.$store);
          //   }
          //   if (type !== 1) {
          //     self.$store.commit('setCoins', coin)
          //     self.$emit('closeBg');
          //   } else {
          //     self.$store.dispatch('InfiniteGame').then(() => {
          //       self.$emit('changeTip');
          //     })
          //   }
          //   self.getCoinList()
          callback();
        } else {
          self.isRequest = false;
        }
      });
    }).catch(() => {
      self.isRequest = false;
    })
  }else {
    self.isRequest = false;

    window.location.href = `${CONFIG.localtionUrl2}index.php/api/taobao/order?machine_no=${CONFIG.machine_no}&coin_price_id=${params.coin_price_id}&token=${CONFIG.token}&callback=${document.URL}`
  }
}

