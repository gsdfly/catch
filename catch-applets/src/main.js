import Vue from 'vue'
import App from './App'
import store from './store'
import CONFIG from './config/index'
import api from './api/index'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;

// var time = new Date().getTime();
// try {
//   var token_x = JSON.parse(wx.getStorageSync('token_x'));
// } catch (err) {
//   token_x = {};
// }
// if (JSON.stringify('token_x') !== '{}' && (time - token_x.time < 3600000)) {
//   CONFIG.token = token_x.token;
//   store.commit('changeIsLogin');
// } else {
//   console.log('登录');
//   wx.login({
//     success:(res) => {
//       console.log(res)
//       wx.getUserInfo({
//         lang:"zh_CN",
//         success:function (res2) {
//           console.table(res2)
//           api.onLogin({"js_code": res.code,raw:res2}).then((res3)=>{
//             console.log(res3)
//             CONFIG.token = res3.data.data.token;
//             wx.setStorageSync('token_x', JSON.stringify({'token': res3.data.data.token, 'time': time}))
//             store.commit('changeIsLogin');
//           }).catch(()=>{
//             wx.hideLoading()
//           })
//         }
//       })
//     }
//   });
// }

var systemInfo = wx.getSystemInfoSync()
Vue.prototype.version2 = false;
var screenHeight = systemInfo.screenHeight;
var screenWidth = systemInfo.screenWidth;
// console.log(screenHeight);
// console.log(screenWidth);
if (screenHeight / screenWidth > 1.9) {
  Vue.prototype.version2 = true;
}


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/index','pages/baodi/baodi'], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fd825d',
      navigationBarTitleText: '抓趣多',
      navigationBarTextStyle: '#fff',
      enablePullDownRefresh:false
    }
  }
}
