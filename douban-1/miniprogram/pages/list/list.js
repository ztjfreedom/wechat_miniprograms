// pages/list/list.js
import {network} from "../../utils/network.js"

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
    var that = this;
    var type = options.type;
    that.setData({
      type: type
    })

    var title = "";
    wx.showLoading({
      title: '正在加载中...',
    })
    if (type === "movie") {
      title = "电影";
      network.getMovieList({
        success: function (items) {
          // 为了调整合适的flex布局
          var itemscount = items.length;
          if (itemscount % 3 === 2) {
            items.push(null);
          }
          that.setData({
            items: items
          })
          wx.hideLoading();
        },
        count: 100
      })
    } else if (type === "tv") {
      title = "电视剧";
      network.getTVList({
        success: function (items) {
          var itemscount = items.length;
          if (itemscount % 3 === 2) {
            items.push(null);
          }
          that.setData({
            items: items
          })
          wx.hideLoading();
        },
        count: 100
      })
    } else {
      title = "综艺";
      network.getShowList({
        success: function (items) {
          var itemscount = items.length;
          if (itemscount % 3 === 2) {
            items.push(null);
          }
          that.setData({
            items: items
          })
          wx.hideLoading();
        },
        count: 100
      })
    }

    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})