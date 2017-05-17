var httpsData = require("../../data/mainList_data.js");
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  onItemTap: function (event) {
    var obj=this.getTapData(event);
    console.log("我点击了item" + obj.postId);
    wx.navigateTo({
      url: 'item_detail/item_detail?id=' + obj.postId
    });
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({ imgUrls: httpsData.getSwiperData() });
    this.setData({ psot: httpsData.getListData() });
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  getTapData:function (event){
    return event.currentTarget.dataset.obj;
  }
})