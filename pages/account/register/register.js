import { get, post } from '../../../utils/request.js';

var app = getApp();
const url = 'http://localhost:8080/api/users/'
Page({
  data: {
    username: '',
    password: '',
    confirm_password: '',
  },

  // 获取输入账号
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 获取再次输入密码
  confirmInput: function (e) {
    this.setData({
      confirm_password: e.detail.value
    })
  },

  // 注册
  register: function () {
    const { username, password, confirm_password } = this.data;

    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {

      post(url, {
        username,
        password,
        confirm_password,
      }, (res) => {
        wx.showToast({
          title: `注册成功`,
          icon: 'success',
          duration: 2000
        });
        get(url, {}, (res) => {
          app.globalData.userInfo = res.data;
        });
        wx.reLaunch({
          url: '/pages/newslist/newslist',
        });
      });
    }
  },
})