// pages/login/login.js

const app = getApp();

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

  onGetUserInfoTap: function (event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      app.setUserInfo(userInfo);
      wx.showToast({
        title: '恭喜授权成功！',
      });

      setTimeout(() => {
        wx.navigateBack({});
      }, 1500);
    }
  }
})