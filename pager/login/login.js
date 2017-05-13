//获取应用实例
var app = getApp()
Page({


  onTap: function (event) {
    console.log("你击败了我");
    wx.redirectTo({
      url: '../mainList/mainList',
      success: function (res) {
        // 跳转成功会被调用
      },
      fail: function () {
        // 跳转失败会被调用
      },
      complete: function () {
        // 无论失败与否都会被调用
      }
    })
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
  }
})