var httpsData = require("../../../data/mainList_data.js");
var app=getApp();
var id;
Page({
  onLoad: function (options) {
    id = options.id;
    var list = httpsData.getListData();
    for (var i in list) {
      if (list[i].postId == id) {
        this.setData(list[i]);
        break
      }
    }
    var Collection = wx.getStorageSync("Collection")
    if (Collection) {
      this.setData({ Collection: Collection[id] })
    } else {
      Collection = {}
      Collection[id] = false
      wx.setStorageSync("Collection", Collection)
    }
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: this.data.title, // 分享标题
      desc: this.data.content, // 分享描述
      path: 'null' // 分享路径
    }
  },
  onCollection: function () {
    var Collection = wx.getStorageSync("Collection")
    Collection[id] = !Collection[id]
    wx.setStorageSync("Collection", Collection)
    this.setData({ Collection: Collection[id] })
    wx.showToast({
      title: Collection[id] ? '收藏成功' : "取消收藏"
    })
  },
  onPlay: function (event) {
    var play = this.getTapData(event).playMusic;
    var isPlay = !this.data.isPlay;
    if (isPlay) {
      wx.playBackgroundAudio({
        dataUrl: play.url,
        title: play.title,
        coverImgUrl: play.url
      });
    } else {
      wx.pauseBackgroundAudio();
    }
    this.setData({ isPlay: isPlay })
  },
  onShareTap: function () {
    wx.showActionSheet({
      itemList: [
        "分享到朋友圈",
        "分享到微博",
        "分享到QQ",
        "分享到豆瓣"
      ]
    })
  },
  onUnload: function () {
    wx.stopBackgroundAudio();
  },
  getTapData: function (event) {
    return event.currentTarget.dataset;
  }
})