// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openId = wxContext.OPENID;

  const start = event.start;
  let promise = db.collection("weibo");
  if (start > 0) promise = promise.skip(start);
  
  const result = await promise.limit(10).orderBy("createtime", "desc").get();
  const weibos = result.data;
  if(weibos.length > 0){
    weibos.forEach((weibo, windex) => {
      weibo.isPraised = false;
      if(weibo.praises && weibo.praises.length > 0){
        weibo.praises.forEach((praise, index) => {
          if(praise == openId){
            weibo.isPraised = true;
          }
        })
      }
    })
  }
  return {
    weibos
  }
}