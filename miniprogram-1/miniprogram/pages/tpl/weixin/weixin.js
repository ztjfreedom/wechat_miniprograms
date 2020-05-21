// miniprogram/pages/tpl/weixin/weixin.js
Page({

  /**
   * Page initial data
   */
  data: {
    articles: [
      {
        id: 0,
        title: "三国演义"
      },
      {
        id: 1,
        title: "钢铁是怎样炼成的"
      }
    ]
  },

  onViewClick: function(event) {
    console.log("Hello");
  },

  onArticleClick: function(event) {
    var dataset = event.currentTarget.dataset;
    var id = dataset.id;
    console.log(dataset);

    wx.navigateTo({
      url: '/pages/article/article?id='+id,
    })
  },

  onAdvertiseClick: function(event) {
    console.log("advertise click");
  },

  onOutterViewClick: function(event) {
    console.log("outter view click");
    console.log(event);
  },

  onInnerViewClick: function(event) {
    console.log("inner view click");
    console.log(event);
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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