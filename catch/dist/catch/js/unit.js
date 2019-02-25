
function code(CONFIG) {
  if(CONFIG.ua === 'WeiXin'){
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
  }else{
    ap.scan(function (res) {
      window.location.href = res.code
    })
  }
}

function closePage() {
  var ua  = IsWeixinOrAlipay()
  if(ua === 'WeiXin'){
    wx.closeWindow();
  }else {
    ap.popWindow();
  }
  }

function getJssdk(CONFIG) {
  var sc = document.createElement('script')
  if (CONFIG.ua === 'WeiXin') {
    sc.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
    document.getElementsByTagName('body')[0].appendChild(sc)
    sc.onload = function() {
      ajax2({
        url: CONFIG.url+"api/wechat/jssdk",
        method:'GET',
        data:{'url':escape(document.URL.split('#')[0]),token:getParamByName('token') || GetCookie('token_')},
        success:function (res) {
          var r = JSON.parse(res).data;
          wx.config({
            debug: false,
            appId: r.appId,
            timestamp: r.timestamp,
            nonceStr: r.nonceStr,
            signature: r.signature,
            url: r.url,
            jsApiList: [
              'onMenuShareTimeline',     // 分享朋友圈
              'onMenuShareAppMessage',   // 分享朋友
              'showOptionMenu',
              'hideMenuItems',
              'showMenuItems',
              'hideOptionMenu',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'chooseWXPay',
              'scanQRCode'
            ]
          });
          wx.error(function (res) {
            console.error(JSON.stringify(res))
            console.error('wx error')
          });
          wx.ready(function () {
            // wx.showOptionMenu()
            wx.hideOptionMenu()
          });
        }
      });
    }
  } else {
    sc.src = 'https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.5/alipayjsapi.inc.min.js'
    document.getElementsByTagName('body')[0].appendChild(sc)
  }
}

function getUrl() {
  var url;
  if (document.URL.indexOf('catchme') != -1) {
    url = 'http://front.catchme.com.cn/'
  }else{
    url = 'http://front.5zhua.cn/'
  }
  return url;
}

function IsWeixinOrAlipay() {
  var ua = window.navigator.userAgent.toLowerCase()
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') return "WeiXin"
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') return "Alipay"
  //判断是不是淘票票
  if (ua.match(/tbmovie/i) == 'tbmovie') return "Tpp"
  //哪个都不是
  return "false"
}

function callbackUrl(CONFIG) {
  var token = getParamByName('token');
  var ok = getParamByName('ok')
  if(ok==0){
    return;
  }
  if (token ) {
    SetCookie('token_', token)
    window.location.href = funcUrlDel('token')
  } else if (GetCookie('token_')) {
    return;
  } else {
    if (CONFIG.ua === 'Alipay') {
      window.location.href = CONFIG.url+'alipay/oauth?callback='+document.URL;
    } else if (CONFIG.ua === 'Tpp') {
      var uid;
      if (localStorage.getItem('uid')) {
        uid = localStorage.getItem('uid');
      } else {
        uid = generateUUID();
        localStorage.setItem('uid', uid);
      }
      window.location.href =  CONFIG.url+'tpp/oauth?identity='+uid+'&callback='+document.URL;
    } else {
      // window.location.href =  CONFIG.url+'wechat/oauth_scope/?callback='+encodeURIComponent(document.URL);
      window.location.href =  CONFIG.url+'wechat/oauth_scope/third?callback='+encodeURIComponent(document.URL);
    }
  }
}

function getParamByName (name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]);
  return null
}

function GetCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function SetCookie(name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + 60 * 60 * 1000)//过期时间 2分钟
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

//测试淘票票生成唯一id
function generateUUID(){
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

//删除url中的参数
function funcUrlDel(name){
  var loca = window.location;
  var baseUrl = loca.origin + loca.pathname + "?";
  var query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    ;
    delete obj[name];
    var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    return url
  }
}

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax2 (opt) {
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || '';
  opt.async = opt.async || true;
  opt.data = opt.data || null;
  opt.success = opt.success || function () {
  };
  opt.error = opt.error || function () {
  };
  var xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  var params = [];
  for (var key in opt.data) {
    params.push(key + '=' + opt.data[key]);
  }
  var postData = params.join('&');
  if (opt.method.toUpperCase() === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  }
  else if (opt.method.toUpperCase() === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
    xmlHttp.send();
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4) {
      if( xmlHttp.status == 200){
        opt.success(xmlHttp.responseText);
      } else {
      opt.error(xmlHttp.responseText);
    }
    }
  }
};








