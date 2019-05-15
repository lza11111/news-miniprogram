import { post } from '../../../utils/request.js';

var app = getApp();
const url = 'https://lza11111.com/api/users/login/'
Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () {

    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      post(url,{
        username: this.data.phone,
        password: this.data.password,
      }, (res) => {
        app.globalData.userInfo = res.data;
        wx.showToast({
          title: `用户${res.data.username}登录成功`,
          icon: 'success',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/profile/profile',
        });
      });
    }
  },

  register: function() {
    wx.redirectTo({
      url: '../register/register',
    });
  }
})