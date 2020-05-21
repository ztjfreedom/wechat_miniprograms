// pages/joke/joke.js
Page({

  /**
   * Page initial data
   */
  data: {
    hasmore: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getJokes(1);
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.getJokes(1);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.getJokes(this.data.page + 1);
  },

  getJokes: function (page) {
    var that = this;
    var timestamp = null;
    if (page === 1) {
      timestamp = parseInt((new Date()).getTime() / 1000);
    } else {
      timestamp = that.data.timestamp;
    }
    wx.request({
      url: 'http://v.juhe.cn/joke/content/list.php',
      data: {
        key: "858761facdacd4ec2e53fd0ceb8a937f",
        time: timestamp,
        page: page,
        pagesize: 10,
        sort: "desc"
      },
      success: function (res) {
        var jokes = res.data.result.data;
        if (!jokes) {
          that.setData({
            hasmore: false
          });
          return;
        }

        var oldJokes = that.data.jokes;
        var newJokes = [];
        if (!oldJokes || page === 1) {
          newJokes = jokes;
        } else {
          newJokes = oldJokes.concat(jokes);
        }
        console.log(jokes);
        that.setData({
          jokes: newJokes,
          timestamp: timestamp,
          page: page
        })
      }
    })
  }
})