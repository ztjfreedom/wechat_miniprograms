// filedemo/pages/index/index.js
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

  onFileSelect: function (event) {
    wx.chooseImage({
      success: (res) => {
        var filePath = res.tempFilePaths[0];
        const uploadTask = wx.cloud.uploadFile({
          cloudPath: "pics/test1.png",
          filePath: filePath,
          success: res => console.log(res)
        });

        uploadTask.onProgressUpdate(callback => console.log(callback));
      }
    })
  }
})