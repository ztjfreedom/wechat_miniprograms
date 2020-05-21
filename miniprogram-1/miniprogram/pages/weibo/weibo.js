// miniprogram/pages/weibo.js
Page({

  /**
   * Page initial data
   */
  data: {
    username: "Joker",  // 变量
    weather: "晴天",
    profile: {  // 类
      age: 15,
      job: "student"
    },
    books: [  // 数组
      "三国演义",
      "水浒传"
    ],
    lines: [
      {
        id: 1,
        name: "line1"
      },
      {
        id: 2,
        name: "line2"
      },
      {
        id: 3,
        name: "line3"
      },
      {
        id: 4,
        name: "line4"
      }
    ]
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

  },

  modifyLines: function(event) {
    var lines = this.data.lines;
    lines.splice(0, 0, {id: 5, name: "line5"});
    this.setData({  // 这样设置data中的数据，页面会自动更新
      lines: lines
    })
  }
})