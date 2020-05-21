// pages/requestdemo/requestdemo.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://v.juhe.cn/weather/index',
      data: {
        cityname: "无锡",
        key: "2e0c47926592b3237e20848c8824a2fc"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data.result.today);
      }
    })
  }


})