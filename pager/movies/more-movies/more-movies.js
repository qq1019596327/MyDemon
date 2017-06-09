var httpData = require("../../../data/movies_serves.js");

var typeKey;
var typeTitle;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeKey: "",
    typeTitle: "",
    mPager: 0,
    count: 18,
    List: [],
    loding: false
  },
  /**
   * 初始换环境
   */
  onLoad: function (options) {
    this.data.typeKey = options.typeKey;
    this.data.typeTitle = options.typeTitle;
    var that = this;
    this.onLoding(
      function (res) {
        that.setData({
          List: res.subjects,
          mPager: res.subjects.length
        })
      }
    );
  },
  /**
   * 上拉加载更多
   */
  onScrollLower: function () {
    var that=this;
    this.onLoding(
      function (res) {
        var list = that.data.List.concat(res.subjects);
        that.setData({
          List: list,          
          mPager: list.length
        })
      }
    )
  }, 
  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    var that = this;
    this.setData({mPager: 0})
    this.onLoding(
      function (res) {
        that.setData({
          List: res.subjects,
          mPager: res.subjects.length
        })
        wx.stopPullDownRefresh();
      }
    )
  },
  /**
   * item点击事件
   */
  onItemClik: function (evet) {
    var itemId = this.getTapData(evet).itemId;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?itemId=' + itemId
    })
  },
  /**
   * 设置标题
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.typeTitle
    })
  }, 
  /**
   * 进入异步网络请求
   * 如果mPager为0 则success会回调2次
   * 第一次为缓存，第二次为网络返回
   * fail为失败回调
   */
  onLoding: function (success, fail) {
    if (!this.data.loding) {
      this.setData({ loding: true });
      wx.showNavigationBarLoading();
      var that = this;
      httpData.getItem(
        this.data.typeKey,
        this.data.mPager,
        this.data.count,
        function (res) {
          if (res) {
            success(res);
            wx.hideNavigationBarLoading();
            that.setData({ loding: false });
          }
        },
        fail);
    }
  },
  /**
   * 直接获取点击时设置的数据对象
   */
  getTapData: function (event) {
    return event.currentTarget.dataset;
  }
})