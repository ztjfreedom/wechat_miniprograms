// pages/search/search.js
import {network} from "../../utils/network.js";

Page({

  /**
   * Page initial data
   */
  data: {
    histories: []
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'searched',
      success: function (res) {
        var data = res.data;
        that.setData({
          histories: data
        });
      }
    })
  },

  onSearchInput: function (event) {
    var that = this;
    var value = event.detail.value;
    if (!value || value === "") {
      that.setData({
        subjects: []
      });
      return;
    }

    network.getSearch({
      q: value,
      success: function (subjects) {
        that.setData({
          subjects: subjects
        })
      }
    });
  },

  onItemTap: function (event) {
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;

    var histories = this.data.histories;
    var isExisted = false;
    for (var i = 0; i < histories.length; i ++) {
      var movie = histories[i];
      if (movie.id === id) {
        isExisted = true;
        break;
      }
    }
    if (!isExisted) {
      histories.push({id: id, title: title});
      wx.setStorage({
        data: histories,
        key: 'searched',
      });
    }

    wx.navigateTo({
      url: '/pages/detail/detail?type=movie&id=' + id
    });
  },

  onClearTap: function (event) {
    wx.removeStorage({
      key: 'searched',
    });
    this.setData({
      histories: []
    });
  }
})