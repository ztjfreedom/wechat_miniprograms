// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// db的获取必须在cloud.init()之后
const db = cloud.database();

const request = require('request-promise');

const APPID = '......';
const APPSECRET = '......';
const TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;
const CHECK_URL = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async (event, context) => {
  const content = event.content;
  const author = event.author;
  const location = event.location;
  const images = event.images;
  const video = event.video;
  const device = event.device;

  console.log(content);
  console.log(author);
  console.log(location);
  console.log(images);
  console.log(video);

  // TODO 图片安全性检查，可以使用腾讯云图像分析服务

  // 内容安全性检查
  const tokenResp = await request.get({
    uri: TOKEN_URL,
    json: true
  });
  // console.log(tokenResp);

  const token = tokenResp.access_token;
  // console.log(token);
  
  const checkResp = await request.post({
    uri: CHECK_URL + token,
    body: {
      content: content
    },
    json: true
  });

  if (checkResp.errcode === 0) {
    return await db.collection('weibo').add({
      data: {
        content: content,
        author: author,
        location: location,
        images: images,
        video: video,
        device: device,
        createtime: db.serverDate()
      }
    })
  } else {
    return {
      errcode: 1,
      errmsg: "您的微博有风险，请修改再发布"
    }
  }
}