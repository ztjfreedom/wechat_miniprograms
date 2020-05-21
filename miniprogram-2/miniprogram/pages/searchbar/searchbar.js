// pages/searchbar/searchbar.js
Page({

  /**
   * Page initial data
   */
  data: {
    value: ""
  },

  onClear: function (event) {
    this.setData({
      value: ""
    })
  }
})