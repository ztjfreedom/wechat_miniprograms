// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;
  const weiboId = event.weiboId;
  const praise = event.praise;

  if (praise) {
    // 点赞
    return await db.collection("weibo").doc(weiboId).update({
      data: {
        praises: _.push(openId)
      }
    })
  } else {
    // 取消点赞
    const weiboRes = await db.collection("weibo").doc(weiboId).field({
      praises: true
    }).get();

    const praises = weiboRes.data.praises;
    const newPraises = [];
    praises.forEach((value, index) => {
      if (value != openId) {
        newPraises.push(value);
      }
    });

    return await db.collection("weibo").doc(weiboId).update({
      data: {
        praises: newPraises
      }
    })
  }
  
}