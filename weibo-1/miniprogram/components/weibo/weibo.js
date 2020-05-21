// components/weibo/weibo.js
Component({
  /**
   * Component properties
   */
  properties: {
    detailUrl: {
      type: String,
      value: null
    },
    weibo: {
      type: Object,
      value: null
    },
    handle: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onImageTap: function (event) {
      const index = event.target.dataset.index;
      wx.previewImage({
        urls: this.data.weibo.images,
        current: this.data.weibo.images[index]
      })
    }
  },

  lifetimes: {
    attached: function () {
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      const weiboWidth = windowWidth - 40;
      const twoImageSize = (weiboWidth - 2.5) / 2;
      const threeImageSize = (weiboWidth - 2.5 * 2) / 3;
      this.setData({
        twoImageSize: twoImageSize,
        threeImageSize: threeImageSize
      })
    }
  }
})