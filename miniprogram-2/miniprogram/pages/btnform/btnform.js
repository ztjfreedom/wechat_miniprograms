// pages/btnform/btnform.js
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

  onSubmit: function (event) {
    console.log(event);
    var username = event.detail.value.username;
    var password = event.detail.value.password;
    if (username === "admin" && password === "admin") {
      wx.navigateTo({
        url: '/pages/btndemo/btndemo',
      });
    } else {
      console.log("登陆失败");
    }
  }
})