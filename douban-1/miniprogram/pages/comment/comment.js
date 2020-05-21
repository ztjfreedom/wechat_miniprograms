// pages/comment/comment.js
import {network} from "../../utils/network.js"

Page({

  /**
   * Page initial data
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData(options);
    this.setData({
      preLoading: true,
      nextLoading: true
    });
    this.getComments(1, this.data.count);
  },

  onItemTap: function (event) {
    wx.navigateBack({});
  },

  onPrePageTap: function (event) {
    var preStart = this.data.start;
    if (preStart - this.data.count > 0) {
      var start = preStart - this.data.count;
      this.setData({
        preLoading: true
      });
      this.getComments(start, this.data.count);
    }
  },

  onNextPageTap: function (event) {
    var preStart = this.data.start;
    var start = preStart + this.data.count;
    this.setData({
      nextLoading: true
    });
    this.getComments(start, this.data.count);
  },

  getComments: function (start, count) {
    var that = this;
    network.getItemComments({
      type: that.data.type,
      id: that.data.id,
      start: start,
      count: count,
      success: function (data) {
        var total = data.total;
        var comments = data.interests;
        that.setData({
          total: total,
          comments: comments,
          start: start,
          preLoading: false,
          nextLoading: false
        });
        wx.pageScrollTo({
          scrollTop: 0
        });
      }
    })
  }
})