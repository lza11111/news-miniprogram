//app.js
import './vendor/weapp-cookie/index'
import { get } from './utils/request.js';

const url = 'http://localhost:8080/api/users/';

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    if (!this.globalData.userInfo) {
      //调用登录接口
      get(url, {}, (res) => {
        if (res.data.is_authenticated){
          this.globalData.userInfo = res.data;
        }
      });
    }
  },
  
  globalData:{
    userInfo:null
  }
})