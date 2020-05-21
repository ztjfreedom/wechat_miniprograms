// pages/wweibo/wweibo.js
import {getUUID, getExt} from "../../utils/util.js"
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    location: null,
    tempImages: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const indexPage = getCurrentPages()[0];
    const tempImages = indexPage.data.tempImages;
    const tempVideo = indexPage.data.tempVideo;
    this.setData({
      type: options.type,
      tempImages: tempImages,
      tempVideo: tempVideo
    })
    this.initImageSize();
  },

  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 60;
    const imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    })
  },

  onLocationTap: function (event) {
    const that = this;
    wx.getSetting({
      success: (res) => {
        const userLocation = res.authSetting['scope.userLocation'];
        if (userLocation) {
          that.getLocation();
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              that.getLocation();
            },
          });
        }
      },
    })
  },

  getLocation: function () {
    const that = this;
    wx.chooseLocation({
      success: (res) => {
        if (res.name) {
          delete res['errMsg'];
          that.setData({
            location: res
          })
        }
      },
    });
  },

  onSubmit: function (event) {
    const that = this;
    const content = event.detail.value.content;
    const location = this.data.location;
    const author = app.getUserInfo();
    const device = wx.getSystemInfoSync().model.replace('/<.*>/', '');
    const weibo = {
      content: content,
      location: location,
      author: author,
      device: device
    }

    wx.showLoading({
      title: '正在发表...',
    })

    if (that.data.tempImages.length > 0) {
      // 上传图片到服务器
      const fileIdList = [];
      that.data.tempImages.forEach((value, index) => {
        wx.cloud.uploadFile({
          filePath: value,
          cloudPath: that.getCloudPath(value),  // 路径不存在时，cloud会自动创建文件夹
          success: res => {
            fileIdList.push(res.fileID);
            if (fileIdList.length === that.data.tempImages.length) {
              // 所有文件都已经上传完成
              weibo.images = fileIdList;
              that.publicWeibo(weibo);
            }
          }
        })
      })
    } else if (that.data.tempVideo) {
      // 上传视频到服务器
      wx.cloud.uploadFile({
        filePath: that.data.tempVideo,
        cloudPath: that.getCloudPath(that.data.tempVideo),  // 路径不存在时，cloud会自动创建文件夹
        success: res => {
          const fileID = res.fileID;
          weibo.video = fileID;
          that.publicWeibo(weibo);
        }
      })
    } else {
      that.publicWeibo(weibo);
    }
  },

  getCloudPath: function (fileName) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return "weibo/" + year + "/" + month + "/" + day + getUUID() + "." + getExt(fileName);
  },

  publicWeibo: function (weibo) {
    wx.cloud.callFunction({
      name: "wweibo",
      data: weibo,
      success: res => {
        if (res.result._id) {
          wx.hideLoading();
          wx.showToast({
            title: '发表成功！',
          });
          setTimeout(() => {
            wx.navigateBack({});
          }, 800);
        } else {
          wx.showToast({
            title: res.result.errmsg,
            icon: "none"
          });
        }
      }
    });
  },

  onAddImageTap: function (event) {
    const that = this;
    wx.chooseImage({
      success: (res) => {
        const tempImages = res.tempFilePaths;
        const oldImages = that.data.tempImages;
        const newImages = oldImages.concat(tempImages);
        that.setData({
          tempImages: newImages
        })
      },
    })
  },

  onRemoveTap: function (event) {
    const index = event.target.dataset.index;
    const tempImages = this.data.tempImages;
    tempImages.splice(index, 1);
    this.setData({
      tempImages: tempImages
    })
  },

  onImageTap: function (event) {
    const index = event.target.dataset.index;
    wx.previewImage({
      urls: this.data.tempImages,
      current: this.data.tempImages[index]
    })
  }

})