// pages/weibod/weibod.js

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * Page initial data
   */
  data: {
    mask: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const windex = options.index;
    const weibos = getCurrentPages()[0].data.weibos;
    const weibo = weibos[windex];
    this.setData({
      weibo: weibo
    });

    this.loadComments();
  },

  loadComments: function () {
    const that = this;
    db.collection('comment').where({
      weiboid: that.data.weibo._id
    }).orderBy("createtime", "desc").get().then(res => {
      const comments = res.data;
      comments.forEach((value, index) => {
        value.createtime = value.createtime.getTime()
      })
      that.setData({
        comments: comments
      })
    })
  },

  onFocusEvent: function (event) {
    this.setData({
      mask: true
    })
  },

  onBlurEvent: function (event) {
    this.setData({
      mask: false
    })
  },

  onConfirmEvent: function (event) {
    const that = this;
    const content = event.detail.value;
    db.collection('comment').add({
      data: {
        content: content,
        author: app.getUserInfo(),
        createtime: db.serverDate(),
        weiboid: that.data.weibo._id
      }
    }).then(res => {
      that.loadComments();
    })
  }
})