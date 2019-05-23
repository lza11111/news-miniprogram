import {
  get,
  post
} from '../../utils/request.js'
var url = 'https://lza11111.com/api/news/';
var app = getApp();
var colors = {
  hot: '#BDC6B8',
  rcmd: '#BDC6B8',
  wars: '#BDC6B8',
  sports: '#BDC6B8',
  tech: '#BDC6B8',
  ent: '#BDC6B8',
}

//点击某类新闻时导航栏上对应的字变为红色
var changeColor = function(curColor) {
  for (var i in colors) {
    if (i == curColor) {
      colors[i] = 'red';
    } else {
      colors[i] = '#BDC6B8';
    }
  }
  return colors;
}

Page({
  data: {
    newslist: [],
    offset: 0,
    newstype: 'hot',
    scrollHeight: 0,
    hidden: true,
    hasMore: true,
    color: {
      hot: '#BDC6B8',
      rcmd: '#BDC6B8',
      wars: '#BDC6B8',
      sports: '#BDC6B8',
      tech: '#BDC6B8',
      ent: '#BDC6B8',
    }
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function(options) {
    const {
      newstype
    } = this.data;
    var _this = this;
    this.setData({
      hidden: false, // 阴藏或显示加载更多
    });

    // 网络请求
    get(url, {
      type: newstype,
      offset: 0,
      limit: 10,
    }, (res) => {
      this.setData({
        newslist: res.data.results,
        hidden: true,
        color: changeColor(newstype),
        hasMore: res.data.results.length > 0,
      });
    })

    //获得窗口的高度，在划到页面最底部时加载更多要用
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  //浏览某条新闻
  browsing: function(event) {
    var newstype = event.currentTarget.id;
    this.setData({
      newstype: newstype,
      color: changeColor(newstype),
      hasMore: false,
      offset: 0,
    });

    get(url, {
      type: newstype,
      offset: 0,
      limit: 10,
    }, (res) => {
      this.setData({
        newslist: res.data.results,
        hidden: true,
        hasMore: res.data.results.length > 0,
      });
    });
  },

  //下拉或上拉加载更多
  loadmore: function(event) {
    const {
      newstype,
      offset,
      newslist,
      hasMore
    } = this.data;
    if (!hasMore) {
      return;
    }
    this.setData({
      hidden: false,
    });

    get(url, {
      type: newstype,
      offset: offset + 10,
      limit: 10,
    }, (res) => {
      this.setData({
        offset: offset + 10,
        newslist: newslist.concat(res.data.results),
        hasMore: res.data.results.length > 0,
        hidden: true
      });
    });
  },

  reloadnews: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    const {
      newstype,
      offset,
      newslist
    } = this.data;

    this.setData({
      hidden: false,
    });

    get(url, {
      type: newstype,
      offset: 0,
      limit: 10,
    }, (res) => {
      this.setData({
        offset: offset + 10,
        newslist: res.data.results,
        hasMore: res.data.results.length > 0,
        hidden: true
      });
    });

    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
    }, 1500);
  },

})