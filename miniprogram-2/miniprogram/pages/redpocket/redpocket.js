// miniprogram/pages/redpocket/redpocket.js
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
    var systemInfo = wx.getSystemInfoSync();
    var windowHeight = systemInfo.windowHeight;
    var windowWidth = systemInfo.windowWidth;

    // 计算圆弧半径
    var width = windowWidth;
    var height = 100;
    var radius = (height / 2) + (width * width / 8 / height);
    var left = - (radius - width/2);

    this.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth,
      radius: radius,
      left: left
    });
  },

  scrollEvent: function(event) {
    var scrollTop = event.detail.scrollTop;
    if(scrollTop > 0 && scrollTop <= 100) {
      var height = 100 - scrollTop;
      var width = this.data.windowWidth;
      var radius = (height / 2) + (width * width / 8 / height);
      var left = - (radius - width / 2);
      this.setData({
        radius: radius,
        left: left
      })
    }
  }
  
})