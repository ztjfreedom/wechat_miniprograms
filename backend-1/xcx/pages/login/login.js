// pages/login/login.js

import { myrequest } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onLoginEvent: function(event){
    const userInfo = event.detail.userInfo;
    if(!userInfo){
      wx.showModal({
        title: '注意',
        content: '您拒绝了授权，后续功能将无法使用！',
      })
      return;
    }

    wx.login({
      success: res => {
        const code = res.code;
        wx.request({
          url: 'http://127.0.0.1:8000/login/',
          method: 'POST',
          header: {
            "Content-Type": 'application/x-www-form-urlencoded'
          },
          data: {
            code: code,
            userinfo: JSON.stringify(userInfo)
          },
          success: res => {
            const token = res.data.token;
            wx.setStorageSync("token", token);
          }
        })
      }
    })
  },

  onSendWeibo: function(event){
    myrequest.post({
      url: "http://127.0.0.1:8000/aweibo/",
      data: {
        content: "abc"
      },
      success: res => {
        console.log(res)
      }
    })
  }
})