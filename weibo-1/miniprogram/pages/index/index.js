//index.js

const app = getApp();
const db = wx.cloud.database();

Page({

  data: {
    tempImages: [],
    weibos: [],
    tempVideo: null,
    hasmore: true
  },

  onLoad: function (options) {
  },

  onShow: function () {
    this.loadWeibos();
  },

  loadWeibos: function (start = 0) {
    const that = this;
    wx.cloud.callFunction({
      name: "weibos",
      data: {
        start: start
      }
    }).then(res => {
      const weibos = res.result.weibos;
      let hasmore = true;
      if (weibos.length == 0) {
        hasmore = false
      }
      let newWeibos = [];
      if (start > 0) {
        newWeibos = that.data.weibos.concat(weibos);
      } else {
        newWeibos = weibos;
      }
      that.setData({
        weibos: newWeibos,
        hasmore: hasmore
      });
    })
  },

  onWriteWeiboBtnTap: function () {
    const that = this;
    if (app.isLogin()) {
      wx.showActionSheet({
        itemList: ['文字', '照片', '视频'],
        success: res => {
          const tapIndex = res.tapIndex;
          if (tapIndex === 0) {
            that.setData({
              tempImages: [],
              tempVideo: null
            })
            wx.navigateTo({
              url: '../wweibo/wweibo?type=' + tapIndex,
            })
          } else if (tapIndex === 1) {
            wx.chooseImage({
              success: (res) => {
                const tempImages = res.tempFilePaths;
                that.setData({
                  tempImages: tempImages,
                  tempVideo: null
                })
                wx.navigateTo({
                  url: '../wweibo/wweibo?type=' + tapIndex,
                })
              },
            })
          } else {
            wx.chooseVideo({
              success: res => {
                const tempVideo = res.tempFilePath;
                that.setData({
                  tempImages: [],
                  tempVideo: tempVideo
                })
                wx.navigateTo({
                  url: '../wweibo/wweibo?type=' + tapIndex,
                })
              }
            })
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '../login/login',
      });
    }
  },

  onReachBottom: function (event) {
    this.loadWeibos(this.data.weibos.length);
  },

  onPullDownRefresh: function (event) {
    this.loadWeibos();
  },

  onPraiseTap: function (event) {
    const that = this;
    const weiboIndex = event.currentTarget.dataset.weibo;
    const weibo = that.data.weibos[weiboIndex];
    const openId = app.globalData.userInfo.openId;

    // 通过云函数创建的数据也必须通过云函数来更新
    if (weibo.isPraised) {
      // 取消点赞
      wx.cloud.callFunction({
        name: "praise",
        data: {
          weiboId: weibo._id,
          praise: false
        },
        success: res => {
          const newPraises = [];
          weibo.praises.forEach((value, index) => {
            if (value != openId) {
              newPraises.push(value);
            }
          })
          weibo.praises = newPraises;
          weibo.isPraised = false;

          that.data.weibos[weiboIndex] = weibo;
          that.setData({
            weibos: that.data.weibos
          })
        }
      })
    } else {
      // 点赞
      wx.cloud.callFunction({
        name: "praise",
        data: {
          weiboId: weibo._id,
          praise: true
        },
        success: res => {
          if (!weibo.praises) {
            weibo.praises = [openId];
          } else {
            weibo.praises.push(openId);
          }

          weibo.isPraised = true;
          that.data.weibos[weiboIndex] = weibo;
          that.setData({
            weibos: that.data.weibos
          })
        }
      });
    }
  }

})