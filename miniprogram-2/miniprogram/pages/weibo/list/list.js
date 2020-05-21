// pages/weibo/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {
    contents: []
  },

  write: function (event) {
    wx.navigateTo({
      url: '/pages/weibo/detail/detail',
    })
  }
})