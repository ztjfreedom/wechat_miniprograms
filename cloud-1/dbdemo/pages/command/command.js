// pages/command/command.js

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
    this.arraycommand();
    // this.inccommand();
    // this.removecommand();
    // this.setcommand();
    // this.orcommand();
    // this.andcommand();
    // this.incommand();
    // this.ltcoomand();
    // this.eqcommand();
  },

  arraycommand: function () {
    // db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
    //   data: {
    //     tags: _.push(["学习"])
    //   }
    // }).then(res => console.log(res));

    // db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
    //   data: {
    //     tags: _.pop()
    //   }
    // }).then(res => console.log(res));

    // 删除第一个元素
    // db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
    //   data: {
    //     tags: _.shift()
    //   }
    // }).then(res => console.log(res));

    // 插入第一个元素
    db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
      data: {
        tags: _.unshift(["城市"])
      }
    }).then(res => console.log(res));
  },

  inccommand: function () {
    // 自增长，提升效率并解决原子性问题
    // mul是自乘指令
    db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
      data: {
        count: _.inc(1)
      }
    }).then(res => console.log(res));
  },

  removecommand: function () {
    // 删除了content字段
    db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
      data: {
        content: _.remove()
      }
    }).then(res => console.log(res));
  },

  setcommand: function () {
    // db.collection("article").add({
    //   data: {
    //     title: "上海美食一览",
    //     author: {
    //       name: "北京日报",
    //       age: 20
    //     },
    //     pub_date: new Date(),
    //     content: "小笼包。",
    //     tags: ["生活", "美食"]
    //   }
    // }).then(res => console.log(res))

    // author字段下的name字段会更新，age字段不会被删除
    // db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
    //   data: {
    //     author : {
    //       name: "上海日报"
    //     }
    //   }
    // }).then(res => console.log(res));

    // author字段下的age字段会被删除
    db.collection("article").doc("5feb61565ea9156300105f4e2edce47b").update({
      data: {
        author : _.set({
          name: "上海日报"
        })
      }
    }).then(res => console.log(res));
  },

  orcommand: function () {
    // db.collection("article").where({
    //   pub_date: _.lt(new Date("2020/04/28")).or(_.gt(new Date("2020/04/29")))
    // }).get().then(res => console.log(res));

    // 多字段
    db.collection("article").where(_.or([
        {
          pub_date: _.gt(new Date("2020/04/29"))
        },
        {
          author: /新华/  // 正则表达式
        }
    ])).get().then(res => console.log(res));
  },

  andcommand: function () {
    // db.collection("article").where({
    //   pub_date: _.and(_.gte(new Date("2020/04/27")), _.lt(new Date("2020/04/28")))
    // }).get().then(res => console.log(res));

    // 链式调用
    // db.collection("article").where({
    //   pub_date: _.gte(new Date("2020/04/27")).and(_.lt(new Date("2020/04/28")))
    // }).get().then(res => console.log(res));

    // 多字段
    db.collection("article").where({
      author: "新华网",
      pub_date: _.gte(new Date("2020/04/27")).and(_.lt(new Date("2020/04/28")))
    }).get().then(res => console.log(res));
  },

  incommand: function () {
    // db.collection("article").where({
    //   author: _.in(["新华网", "财经网"])
    // }).get().then(res => console.log(res));

    db.collection("article").where({
      tags: _.in(["教育", "女性"])
    }).get().then(res => console.log(res));
  },

  ltcoomand: function () {
    db.collection("article").where({
      pub_date: _.lte(new Date("2020/04/28"))
    }).get().then(res => console.log(res));
  },

  eqcommand: function () {
    // db.collection("article").where({
    //   author: "新华网"
    // }).get().then(res => console.log(res));

    // db.collection("article").where({
    //   author: _.eq("新华网")
    // }).get().then(res => console.log(res));

    // db.collection("article").where({
    //   author: {
    //     name: "北京日报",
    //     age: 18
    //   }
    // }).get().then(res => console.log(res));

    // eq必须要完全相等，如果author字段里，除了name和age还有其他字段，则不会被检索到
    db.collection("article").where({
      author: _.eq({
        name: "北京日报",
        age: 18
      })
    }).get().then(res => console.log(res));
  }
})