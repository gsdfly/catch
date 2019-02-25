import Vue from 'vue'
import App from './App'
import router from './router'
import CONFIG from './config'
import FastClick from 'fastclick'
import wxFc from './config/wx'
import store from './store'
// import callbackUrl from './callbackUrl'
import 'mint-ui/lib/style.css'
import Indicator from 'mint-ui/lib/indicator'
import api from './api'
import {locationHref,SetCookie,getParamByName} from "./util/index";

// require('./util/vconsole.js')

FastClick.attach(document.body)

!async function () {
  if (process.env.NODE_ENV !== 'development') {
    if(!(CONFIG.isAlipayOpen || CONFIG.isTmallOpen)){
      try {
        var result = await api.getVersion({machine_no:CONFIG.machine_no});
        if(result.data.id && result.data.id !== 1){
          // console.log(locationHref(result.data.id))
          // console.log(CONFIG.localtionUrl+locationHref(result.data.id)+'machine='+CONFIG.machine_no)
          window.location.replace(CONFIG.localtionUrl+locationHref(result.data.id)+'machine='+CONFIG.machine_no);
          return;
        }
      }catch (err){}
      if(!CONFIG.token){
        var encrypt = localStorage.getItem('encrypt');

        if(encrypt){
          api.getToken2({encrypt:encrypt}).then((res)=>{
            console.log('getToken2-----------------------------'+res);
            SetCookie('token_', res.data.token);
            store.commit('changeIsLogin');
            delete res.data.token;
            store.commit('setUser',res.data);
            //没有授权
            api.machineLogin({machine_no:CONFIG.machine_no,token:CONFIG.token});
          })
        }else {
          //这里可能会授权，第一种通过授权过来的，第二种以前授过权但是token过期过来的
          //改变url
          var index = window.location.href.indexOf('&');
          var newUrl = window.location.href.slice(0,index);
          window.history.pushState({},'',newUrl);
          // 授权
          var auth_type = localStorage.getItem('auth_type');
          var auth_id = localStorage.getItem('auth_id').split('').reverse().join('');
          api.getToken({auth_type:auth_type,auth_id:auth_id}).then((res)=>{
            //这里可以得到用户信息将用户信息存储到vuex里面，将用户id存储到本地存储中
            localStorage.setItem('encrypt',res.data.encrypt);
            SetCookie('token_', res.data.token);
            store.commit('changeIsLogin');
            delete res.data.token;
            delete res.data.encrypt;
            store.commit('setUser',res.data);
            if(index === -1){
              api.machineLogin({machine_no:CONFIG.machine_no,token:CONFIG.token});
            }
          });
        }
      }else {
        //没有授权
        api.machineLogin({machine_no:CONFIG.machine_no,token:CONFIG.token});
        //状态改的太快没有监听到
        store.commit('changeIsLogin');
        store.dispatch('getUser');
      }
      var sc = document.createElement('script')
      //配置初始化
      if (CONFIG.isWx) {
        sc.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
        document.getElementsByTagName('body')[0].appendChild(sc)
        sc.onload = function () {
          wxFc()
        }
      } else {
        sc.src = 'https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.5/alipayjsapi.inc.min.js'
        document.getElementsByTagName('body')[0].appendChild(sc)
      }
    }
    //回调授权
    // await callbackUrl()
    //获取机器版本根据版本进行跳转
  }else {
    store.commit('changeIsLogin');
    store.dispatch('getUser');
  }

  store.commit('setMachineNo');

  Vue.prototype.version2 = false;
  var clientWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  var clientHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  if (clientWidth / clientHeight <= 0.6) {
    Vue.prototype.version2 = true;
  }

  Vue.prototype.Indicator = Indicator

  Vue.filter('handleNum', function (value) {
    var index = value.indexOf('.');
    if(index !== -1){
      var after = value.substr(index+1);
      if(Number(after)%100 === 0 ){
        return value.substr(0,index);
      }else if(Number(after)%10 === 0){
        return value.substr(0,index+2);
      }else {
        return value;
      }
    }
  })

  //统计扫码用户
  // api.machineLogin({machine_no:CONFIG.machine_no,token:CONFIG.token});

  Vue.prototype.Indicator = Indicator

  new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
  })
}()
