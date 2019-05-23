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

    wx.navigateTo({
      url: '/pages/profile/edit/edit',
    })
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
    post('https://lza11111.com/api/users/logout/', {}, (res) => {
      app.globalData.userInfo = null;
      wx.switchTab({
        url: '/pages/newslist/newslist'
      })
    })
  }


})