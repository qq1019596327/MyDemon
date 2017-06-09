var httpsData = require("../../data/movies_serves.js");
const start = 0;
const count = 3;
Page({
  data: {
    List: []
  },
  onLoad: function (event) {
    var that = this;
    for (var i in httpsData.List)
      httpsData.getItem(httpsData.List[i], start, count, function (res) {
        if (res) {
          var list = that.data.List;
          var ix=that.Contained(list, res);
          if (ix!==-1) {
            list[ix]=res;
          } else {
            list.push(res)
          }
          that.setData({ List: list });
        }
      });
  },

  Contained: function (list, res) {
    for (var ix in list) {
      if (list[ix].title == res.title) {
        return ix;
      }
    }
    return -1;
  },
  onMoreTap:function(event){
    var typeKey=this.getTapData(event).typeKey;
    var typeTitle=this.getTapData(event).typeTitle;    
    wx.navigateTo({
      url: 'more-movies/more-movies?typeKey=' + typeKey + "&typeTitle=" + typeTitle
    })
  },
  onItemClik: function (evet) {
    var itemId= this.getTapData(evet).itemId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?itemId=' + itemId
    })
  },
  getTapData: function (event) {
    return event.currentTarget.dataset;
  }
})