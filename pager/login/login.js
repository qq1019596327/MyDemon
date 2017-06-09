//获取应用实例
var app = getApp()
Page({


  onTap: function (event) {
    console.log("你击败了我");
    wx.switchTab({
      url: '../mainList/mainList'
    });
    // wx.navigateTo({
    //   url: '../mainList/item_detail/item_detail?id=1'
    // });
  },
  onLoad: function () {



    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    if(!wx.getStorageSync(app.globalData.versionCode)){
      wx.clearStorageSync();
      wx.setStorageSync(app.globalData.versionCode, true);
    }
  }
})