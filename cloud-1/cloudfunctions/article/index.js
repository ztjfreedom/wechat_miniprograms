// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 云函数一次最多获取100条数据

  // get()返回一个Promise对象
  // return db.collection("article").get();

  // 云函数可以批量更新
  return db.collection("article").where({
    title: /test/
  }).update({
    data: {
      tags: ["test"]
    }
  });
}