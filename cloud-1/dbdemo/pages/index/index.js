// dbdemo/pages/index/index.js

const db = wx.cloud.database();
const _ = db.command;

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
    
    // db.collection("article").get().then(res => {
    //   console.log(res);
    // });

    // this.addDemo();
    // this.getDemo();
    // this.delDemo();
    // this.updateDemo();
  },

  addDemo: function () {
    db.collection("article").add({
      data: {
        title: "\"大批蝗虫进军上海”？这么吓人？\"",
        author: "新民晚报",
        pub_date: new Date(),
        content: "记者从上海海关了解到，目前上海海关确实已经发现有藏在货物中的蝗虫，但是，只有1只。",
        tags: ["生活", "农业"]
      }
    }).then(res => {
      console.log(res);
    })
  },

  getDemo: function () {
    db.collection("article").doc("87017e375ea7ceb2005b1a0252bbe9bf").get().then(res => console.log(res));
    db.collection("article").where({
      pub_date: _.lt(new Date("2020/04/28"))
    }).get().then(res => console.log(res));
  },

  // 删除多条数据只能在服务器端通过云函数执行
  // 通过控制台手动添加的数据权限属于管理员，不能够通过代码删除
  delDemo: function () {
    db.collection("article").doc("3f8c212f5ea8123a007a99d458990fad").remove().then(res => console.log(res));
  },

  // 一次更新多条数据只能在服务器端通过云函数执行
  updateDemo: function() {
    // 更新数据用update
    db.collection("article").doc("f10018335ea8272400018a8264ee9a62").update({
      data: {
        author: "财经网"
      }
    }).then(res => console.log(res));

    // 重置数据用set
    db.collection("article").doc("f10018335ea8272400018a8264ee9a62").set({
      data: {
        title: "蝗虫进军",
        author: "财经网",
        content: "记者从上海海关了解到，目前上海海关确实已经发现有藏在货物中的蝗虫，但是，只有1只。"
      }
    }).then(res => console.log(res));
  }
})