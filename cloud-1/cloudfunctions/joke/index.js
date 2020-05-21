// 云函数入口文件
const cloud = require('wx-server-sdk');
const got = require('got');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // got是异步的，await表示等待异步结果返回，await只能在async的函数中使用
  const response = await got("http://v.juhe.cn/joke/content/list.php?key=858761facdacd4ec2e53fd0ceb8a937f&page=2&pagesize=10&sort=asc&time=1418745237");
  console.log(response);
  // 要将字符串转换为js对象
  const body = JSON.parse(response.body);
  const jokes = body.result.data;
  return jokes;
}