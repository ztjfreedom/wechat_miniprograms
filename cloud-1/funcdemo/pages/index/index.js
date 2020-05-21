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
    // wx.cloud.callFunction({
    //   name: "login",
    //   success: res => console.log(res),
    //   fail: err => console.log(err)
    // });

    // wx.cloud.callFunction({
    //   name: "add",
    //   data: {
    //     a: 1,
    //     b: 2
    //   },
    //   success: res => console.log(res),
    //   fail: err => console.log(err)
    // });

    // database
    // wx.cloud.callFunction({
    //   name: "article",
    //   success: res => console.log(res)
    // });

    // http request
    // wx.cloud.callFunction({
    //   name: "joke",
    //   success: res => console.log(res)
    // });

    // msg check
    // wx.cloud.callFunction({
    //   name: "msgcheck",
    //   data: {
    //     content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"
    //   },
    //   success: res => console.log(res),
    //   fail: err => console.log(err)
    // });

    // image porn check
    wx.chooseImage({
      success: function (res) {
        const filePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: "test.jpg",
          filePath: filePath,
          success: res => {
            const fileID = res.fileID;
            wx.cloud.getTempFileURL({
              fileList: [fileID],
              success: res => {
                const imageUrl = res.fileList[0].tempFileURL;
                wx.cloud.callFunction({
                  name: "imagecheck",
                  data: {
                    imageUrl: imageUrl
                  },
                  success: res => console.log(res)
                })
              }
            })
          }
        });
      }
    })
  },

})