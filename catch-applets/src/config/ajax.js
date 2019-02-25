import store from './../store'
import {getErrMsg} from "../utils/index";
import CONFIG from './index'

export  const ajax = function (url,params,method='GET') {
  return  new Promise((success,err)=>{
    wx.request({
      url:url,
      data:Object.assign({},{version:CONFIG.version,scene:CONFIG.scene},params),
      method:method,
      success:function (res) {
        if (res.data.status_code !== 200) {
          console.log(res)
          store.commit('changeTipContent',getErrMsg(res.data.status_code, res.data.message))
          wx.hideLoading()
          err(res);
        }else {
          success(res)
        }
      },
      fail:function (res) {
        wx.hideLoading()
        store.commit('changeTipContent',{
          imgSrc:"http://res.catchme.com.cn/imgs-2018-02-05/tip/tip1.png",
          content:['娃娃机出了点状况','请跟换机器'],
          button:'扫码换机',
          isShow:true
        });
        err(res);
      }
    })
  })
}
