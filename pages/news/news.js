var WxParse = require('../wxParse/wxParse.js');
import { get, post } from '../../utils/request.js';

const newsUrl = 'https://lza11111.com/api/news/';

const unlikeUrl = 'https://lza11111.com/api/like/delete/';

Page({
  data: {
    news: {}
  },

  //options为页面跳转带来的参数
  onLoad: function (options) {
    console.log(options.newsid);
    var _this = this;
    //网络请求，加载id对应的s新闻详情
    get(`${newsUrl}${options.newsid}/`, {}, (res) => {
      this.setData({
        news: res.data
      })
      var str = res.data.content;
      console.log(str);
      //wxParse插件可以将html代码转换为wxml代码
      WxParse.wxParse('newsContent', 'md', str, _this);
    });
  },

  taplike: function () {
    const { news } = this.data;
    const likeUrl = `https://lza11111.com/api/news/${news.id}/like/`;
    if (news.liked) {
      post(likeUrl, {
        cancel: true,
      }, (res) => {
        wx.showToast({
          title: '取消赞成功！',
        });
        news.liked = !news.liked;
        this.setData({ news });
      })
    }
    if (!news.liked) {
      post(likeUrl, {}, (res) => {
        wx.showToast({
          title: '点赞成功！',
        });
        news.liked = !news.liked;
        this.setData({ news });
      })
    }
  }
});