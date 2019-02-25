import {getParamByName, GetCookie, SetCookie, generateUUID} from './util'
import CONFIG from './config'

const callbackUrl = () => {
  return new Promise((resolve, reject) => {
    // 删除url中某个参数,并跳转
    function funcUrlDel(name) {
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
      };
    }

    var token = getParamByName('token')
    // var machine = getParamByName('machine')
    var u = document.URL
    var s = u.split('?')
    var le = s[1] && s[1].match(new RegExp("=", "g"))
    if (s[1] && s[1].indexOf('machine=') > -1 && le.length) {
      if (token) {
        SetCookie('token_', token)
        window.location.href = funcUrlDel('token')
      } else if (GetCookie('token_')) {
        resolve()
      } else {
        var a = document.createElement('a');
        if (CONFIG.isAlipay) {
          a.href = `${CONFIG.url}alipay/oauth?callback=${document.URL}`;
          // window.location.href = `${CONFIG.url}alipay/oauth?callback=${document.URL}`
        }
        // else if (CONFIG.isTpp) {
        //   var uid;
        //   if (localStorage.getItem('uid')) {
        //     uid = localStorage.getItem('uid');
        //   } else {
        //     uid = generateUUID();
        //     localStorage.setItem('uid', uid);
        //   }
        //   a.href =`${CONFIG.url}tpp/oauth?identity=${uid}&callback=${document.URL}`
        //     // window.location.href = `${CONFIG.url}tpp/oauth?identity=${uid}&callback=${document.URL}`
        // }
        else {
          a.href = `${CONFIG.url}wechat/oauth_scope?callback=${document.URL}`
          // window.location.href = `${CONFIG.url}wechat/oauth_scope?callback=${document.URL}`
        }
        document.getElementsByTagName('body')[0].appendChild(a)
        a.click();
      }
    } else {
      if (GetCookie('machine')) {
        window.location.href = document.URL + `?machine=${GetCookie('machine')}`
      }
    }
  })
}

export default callbackUrl
