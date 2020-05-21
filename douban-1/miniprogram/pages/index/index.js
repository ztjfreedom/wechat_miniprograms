import {network} from "../../utils/network.js"

Page({
  data: {

  },

  onLoad: function (options) {
    var that = this;
    // getMovieList的参数传递一个对象，里头包含一个success回调函数，请求成功时，会把movies回传给这个函数
    network.getMovieList({success: function (movies) {
      that.setData({
        movies: movies
      })
    }});

    network.getTVList({success: function (tvs) {
      that.setData({
        tvs: tvs
      })
    }});

    network.getShowList({success: function (shows) {
      that.setData({
        shows: shows
      })
    }});
  }
  
});