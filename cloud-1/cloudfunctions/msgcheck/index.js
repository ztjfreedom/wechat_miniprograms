// 云函数入口文件
const cloud = require('wx-server-sdk');
const got = require('got');
const request = require('request-promise');

cloud.init();

const APPID = "......";
const APPSECRET = "......";
const tokenurl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;
let checkurl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async (event, context) => {
  const content = event.content;

  // const tokenResponse = await got(tokenurl);
  // const accessToken = JSON.parse(tokenResponse.body).access_token;
  const tokenResponse = await request.get({
    uri: tokenurl
  });
  const accessToken = tokenResponse.access_token;
  
  checkurl = checkurl + accessToken;

  // const checkResponse = await got.post(checkurl, {
  //   body: JSON.stringify({
  //     content: content
  //   })
  // });
  // return checkResponse.body;
  const checkResponse = await request.post({
    uri: checkurl,
    body: {
      content: content
    },
    json: true
  });
  return checkResponse;
}