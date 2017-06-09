function getItem(typeKey, start, count, success, fail) {
  var requestUrl = getRequestUrl(typeKey, start, count);
  if (!start>0){
  wx.getStorage({
    key: typeKey + count,
    success: function (res) {
      if (res) {
        success(res.data)
      }
    },
  });
  }

  http(requestUrl, "GET", function (res) {
    if (!res.data.code) {
      var data = decomposeData(res.data, typeKey);
      success(data);
      if (!start > 0) {
        wx.setStorage({
          key: typeKey + count,
          data: data
        });
      }
    }else{
      fail(res)
    }
  }, fail);
};

function decomposeData(data, typeKey) {
  var dataList = data.subjects;
  var subjects = [];
  for (var inx in dataList) {
    var item = dataList[inx];
    var title=item.title;
    var obj = {
      rating: item.rating,
      title: title.length > 6 ? title.substring(0, 6) + "..." : title,
      collect_count: item.collect_count,
      images:  item.images.medium ,
      id: item.id
    }
    subjects.push(obj);
  }
  data.subjects = subjects;
  data.typeKey = typeKey;
  return data;
}
function http(requestUrl, method, success, fail){
  wx.request({
    url: requestUrl,
    header: {
      "Content-Type": "json"
    },
    method: method,
    success: success,
    fail: fail
  })
}

function getRequestUrl(code, start, count) {
  return "https://api.douban.com/v2/movie/" + code + "?start=" + start + "&count=" + count;
}
const List = ["in_theaters", "coming_soon", "top250"];

module: exports.getItem = getItem;
module: exports.List = List;
