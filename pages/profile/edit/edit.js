// pages/profile/edit/edit.js
import { post } from '../../../utils/request';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nicknameModalHidden: true,
    nickname: "",
    passwordModalHidden: true,
  },

  editNickname: function () {
    this.setData({
      nicknameModalHidden: false,
    })
  },

  nicknameCancel: function () {
    this.setData({
      nicknameModalHidden: true,
    })
  },

  nicknameSubmit: function () {
    const { nickname } = this.data;
    post('https://lza11111.com/api/users/nickname/', {
      nickname
    }, () => {
      app.globalData.userInfo.nickname = nickname;
      wx.showToast({
        title: '昵称修改成功!',
      })
    });
    this.setData({
      nicknameModalHidden: true,
    })
  },

  changeNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  editPassword: function () {
    wx.showToast({
      title: '密码修改成功!',
    })
    this.setData({
      passwordModalHidden: false,
    })

  },

  passwordCancel: function () {
    this.setData({
      passwordModalHidden: true,
    })
  },

  passwordSubmit: function () {
    this.setData({
      nicknameModalHidden: true,
    })
  },

})