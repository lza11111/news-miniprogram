// pages/profile/profile.js
import { post } from '../../utils/request.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  login: function() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/account/login/login',
      });
    }
  },

  goMyLike: function () {
    wx.navigateTo({
      url: './myLike/myLike',
    })
  },

  goMyRead: function () {
    wx.navigateTo({
      url: './myRead/myRead',
    })
  },

  logout: function () {
    post('http://localhost:8080/api/users/logout/', {}, (res) => {
      app.globalData.userInfo = null;
      wx.switchTab({
        url: '/pages/newslist/newslist'
      })
    })
  }


})