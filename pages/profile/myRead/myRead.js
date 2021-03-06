import { get, post } from '../../../utils/request.js'
var url = 'https://lza11111.com/api/news/recent-read/';

var app = getApp();

Page({
  data: {
    newslist: [],
    scrollHeight: 0,
    hidden: true,
  },

  onShow: function () {
    // 网络请求
    get(url, {}, (res) => {
      this.setData({
        newslist: res.data,
        hidden: true,
      });
    });
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    var _this = this;
    this.setData({
      hidden: false, // 阴藏或显示加载更多
    });
  },

  deleteRecord: function (event){
    const { id } = event.currentTarget;
    const url = `https://lza11111.com/api/news/${id}/delete-read/`;

    post(url, {} ,(res) => {
      wx.showToast({
        title: '删除成功!',
      })
      this.onShow();
    })
  }
})