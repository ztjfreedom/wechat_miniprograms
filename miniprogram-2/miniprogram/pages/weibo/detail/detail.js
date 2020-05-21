// pages/weibo/detail/detail.js
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

  },

  submitEvent: function (event) {
    var content = event.detail.value.content;
    var pages = getCurrentPages();
    var page = pages[pages.length - 2];
    var contents = page.data.contents;
    contents.push(content);
    page.setData({
      contents: contents
    });
    wx.navigateBack({});
  }
})