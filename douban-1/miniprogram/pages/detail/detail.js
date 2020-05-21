// pages/detail/detail.js
import {network} from "../../utils/network.js"

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
    var that = this;
    var type = options.type;
    var id = options.id;

    that.setData({
      id: id,
      type: type
    });

    network.getItemDetail({
      type: type,
      id: id,
      success: function (item) {
        item.genres = item.genres.join("/");
        var actors = item.actors;
        if (actors.length > 3) actors = actors.slice(0, 3);
        var actorNames = [];
        for (var i = 0; i < actors.length; i++) actorNames.push(actors[i].name );
        actorNames = actorNames.join("/");
        var director = item.directors[0].name;
        item.authors = director + "(导演)/" + actorNames;

        that.setData({
          item: item
        })
      }
    });

    network.getItemTags({
      type: type,
      id: id,
      success: function (tags) {
        that.setData({
          tags: tags
        })
      }
    });

    network.getItemComments({
      type: type,
      id: id,
      success: function (data) {
        var total = data.total;
        var comments = data.interests;
        that.setData({
          total: total,
          comments: comments
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

})