// miniprogram/pages/movabledemo/movabledemo.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  onLoad: function (options) {
    var systemInfo = wx.getSystemInfoSync();
    var windowWidth = systemInfo.windowWidth;
    this.setData({
      windowWidth: windowWidth
    })
  },

  onMoveClick: function (event) {
    var x = 100;
    var y = 100;
    this.setData({
      x: x,
      y: y
    })
  },

  onChange: function (event) {
    // console.log(event);
  },

  onHTouchMove: function (event) {
    // console.log(event);
  },

  onTouchStart: function (event) {
    var startPageX = event.touches[0].pageX;
    this.setData({
      startPageX: startPageX
    })
  },

  onTouchEnd: function (event) {
    var endPageX = event.changedTouches[0].pageX;
    var startPageX = this.data.startPageX;
    var changeX = this.data.changeX;
    if (startPageX > endPageX) {
      // 向左滑动
      if (changeX < -20) {
        this.setData({
          x: -100
        })
      } else {
        this.setData({
          x: 0
        })
      }
    } else {
      // 向右滑动
      if (changeX > -80) {
        this.setData({
          x: 0
        })
      } else {
        this.setData({
          x: -100
        })
      }
    }
  },

  onChangeEvent: function (event) {
    var changeX = event.detail.x;
    this.setData({
      changeX: changeX
    })
  }
})