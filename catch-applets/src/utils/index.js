function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


export const getParamByName = (name,url) => {
  if(url === "undefined"){
    return;
  }
  var params = url.split('?')[1].split('&');
  var param;
  for(var item of params){
    if(item.indexOf('machine') !== -1){
      param = item;
      break;
    }
  }
  return param.split('=')[1];
}


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
          content: ['娃娃机出了点状况', '请更换机器'],
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
          content: ['尚有分，还能继续玩哦', '请玩完在上分'],
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
          content: ['该优惠券已被使用'],
          button: '知道了',
          isShow: true
        }
        break;
      case 1013:
        m = {
          imgSrc: "http://res.catchme.com.cn/imgs-2018-02-05/tip/tip9.png",
          content: ['优惠券领取失败'],
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
        };
        // SetCookie('token_', '')
        break;
    }
  }
  return m
}

export const locationHref = (version) => {
  var url = '';
  if (version) {
    switch (version) {
      case 1:
        url = ''
        break;
      case 2:
        url = '../baodi/baodi'
        break;
    }
  }
  return url;
}

export const changeTipOperation = (tipOperationObj, loalStorageName, store) => {
  if (tipOperationObj.trigger === 'once') {
    var alreadyTip = wx.getStorageSync(loalStorageName);
    var time = new Date().getDate() + '';
    if (!(alreadyTip && time === alreadyTip)) {
      wx.setStorageSync(loalStorageName, time);
      store.commit('changeShowTipOperation', {isShow: true, tipObj: tipOperationObj});
    }
  } else {
    store.commit('changeShowTipOperation', {isShow: true, tipObj: tipOperationObj});
  }
}


export const payment = (CONFIG, params, self, callback) => {
  self.$store.dispatch('getPayJssdk', params)
    .then((data) => {
      if (data.status_code === 200) {
        const d = data.data
        wx.requestPayment({
          timeStamp: d.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: d.nonceStr, // 支付签名随机串，不长于 32 位
          package: d.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: d.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: d.paySign, // 支付签名
          success: function (res) {
            callback();
          },
          fail:function (res) {
            self.isRequest = false;
            console.log(res);
          }
        })
      }
    })
}







