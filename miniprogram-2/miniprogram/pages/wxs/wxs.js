// miniprogram/pages/wxs/wxs.js
var util = require('../../utils/util');

Page({

  /**
   * Page initial data
   */
  data: {
    day: 4
  },

  onLoad: function (options) {
    var time = util.formatTime(new Date(2018,9,20,11,0,0));
    this.setData({
      time: time
    })
  }
})