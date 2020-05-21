// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const {ImageClient} = require('image-node-sdk');

// 腾讯云设置
const AppId = "......";
const SecretId = "......";
const SecretKey = "......";

// 云函数入口函数
exports.main = async (event, context) => {
  const imageUrl = event.imageUrl;
  const imageClient = new ImageClient({AppId, SecretId, SecretKey});
  return await imageClient.imgPornDetect({
    data: {
      url_list: [
        imageUrl
      ]
    }
  });
}