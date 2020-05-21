// miniprogram/pages/pagedemo/pagedemo.js

function hello() {
  return "hello";
}

Page({

  /**
   * Page initial data
   */
  data: {
    username: "Joker",
    person: {
      name: "Toby",
      age: 18
    },
    books: [
      "西游记",
      "三国演义"
    ],
    hello: hello
  },

  /**
   * Lifecycle function--Called when page load
   * 一个页面只会触发一次，一般建议在这个函数中做一些页面的数据初始化工作
   */
  onLoad: function (options) {
    // this.data.username = "Tom"  // 这样只能修改数值，页面并不会重新渲染

    // 这样修改数值会重新渲染页面
    let person = this.data.person;
    person.name = "Tom";
    this.setData({
      person: person
    })

    // 上一种方式的简写
    this.setData({
      "person.name": "Jim"
    })

    // 数组的简化修改方式
    this.setData({
      "books[0]": "红楼梦"
    })

    // 设置轮播图尺寸
    var systemInfo = wx.getSystemInfoSync();
    var width = systemInfo.windowWidth;
    var height = width / 4;
    this.setData({
      width: width,
      height: height
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   * 一个页面只会触发一次，代表页面已经准备妥当，可以和视图层进行交互了。对界面内容进行设置的API如wx.setNavigationBarTitleText，比较合适在这个里面执行
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   * 页面显示/切入前台时触发
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   * 页面隐藏/切入后台时触发
   */
  onHide: function () {
    console.log("PageDemo onHide");
  },

  /**
   * Lifecycle function--Called when page unload
   * 页面卸载时触发。如redirectTo或navigateBack到其他页面时
   */
  onUnload: function () {
    console.log("PageDemo onUnload");
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

  goToNextPage: function (event) {
    // switchTab用于tab之间切换
    // navigateTo隐藏当前页面并跳转
    // redirectTo关闭当前页面并跳转
    // wx.switchTab({
    //   url: '/pages/index/index',
    // });
    wx.navigateTo({
      url: '/pages/nextpage/nextpage',
    })
  },

  onChange: function (event) {
    console.log(event);
  },

  onAnimationFinish: function (event) {
    console.log(event);
  }
})