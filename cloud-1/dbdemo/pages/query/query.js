// pages/query/query.js

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
    this.regexpdemo();
    // this.fielddemo()
    // this.skipdemo();
    // this.limitdemo();
    // this.orderdemo();
    // this.countdemo();
  },

  regexpdemo: function () {
    // 正则表达式不适用于长文本匹配，效率很低，建议使用Elasticsearch，腾讯云Elasticsearch + 云函数可以解决
    db.collection("article").where({
      title: /^TEST/i  // ^表示以什么开头，i表示大小写不敏感，m表示跨行匹配，s表示可以让.匹配包括换行符在内的所有字符
    }).get().then(res => console.log(res));

    db.collection("article").where({
      title: db.RegExp({
        regexp: "te.t",
        options: "is"  // i和s同时使用，只有用db.RegExp才可以使用s
      })
    }).get().then(res => console.log(res));;
  },

  fielddemo: function () {
    db.collection("article").field({
      title: true,
      author: true
    }).get().then(res => console.log(res));
  },

  skipdemo: function () {
    // skip多用于分页的场景，跳过几条数据，从后面开始检索
    db.collection("article").skip(2).get().then(res => console.log(res));
    // 假设一页2条数据，当需要获取第2页的数据时
    db.collection("article").skip(2).limit(2).get().then(res => console.log(res));
  },

  limitdemo: function () {
    // get默认最多一次取得20条数据
    db.collection("article").limit(1).get().then(res => console.log(res));
  },

  orderdemo: function () {
    // orderby只有排序，没有筛选功能，如果字段不存在，就会被当作最小的数据排在后面
    db.collection("article").orderBy("pub_date", "desc").orderBy("author.age", "asc").get().then(res => console.log(res));
  },

  countdemo: function () {
    db.collection("article").where({
      author: /网/  // JS中的正则表达式
    }).count().then(res => console.log(res));
  }

})