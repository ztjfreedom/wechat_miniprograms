// miniprogram/pages/btndemo/btndemo.js
Page({

  /**
   * Page initial data
   */
  data: {
    sources: [
      '国务院发文支持自贸区深化改革创新 具有五项特点',
      '特朗普再替沙特辩护：卡舒吉之死可能是世界的错',
      '我国成功验证大型航天器回收技术 回收重量超7吨',
      '江苏落马副省长：执政风格霸道 被指是仇和影子',
      '茅台清查电商公司 业内：专卖店或是下步调整重点',
      '奥运冠军何姿买房被坑 法院判决退定金70万+赔160万',
      '足协未来或派审计机构入驻各队 俱乐部耍小聪明将受严厉处罚',
      '曼联新款特制球衣谍照爆出 野性与美感并存 博格巴这下开心了',
      '马拉松神童！中国9岁男孩3小时47分完赛 你能跑过他吗？',
      '英媒盘点穆帅在曼联的11笔引援 花费3.7亿却鲜有成功典型',
      '中超俱乐部要改中性名再次被提出 恒大上港可以改哪些队名？',
      '120+得分成为火箭“制胜密码”？达到场次胜率高达98.1%',
      '金球奖赔率魔笛大幅领先已无悬念 皇马名宿：今年非他莫属',
      '因伤缺席国家队 赵睿：不甘心 伤愈后争取再入选',
      '穆帅强硬回击卡西：嘴上说不对抗我 暗中没少搞事情',
      '索拉里转正后的三大挑战：逆袭巴萨 世俱杯三连冠',
      'iG副总裁藏马微博晒中奖信息 网友：iG夺冠的原因找到了！',
      '金英权下家曝光：已与大阪钢巴接触 恒大外援一下走仨？',
      '韩国羽毛球内讧继续再出黑料 羽协高管被曝挥霍+推卸责任',
      '里皮对国足哀莫大于心死？突然发布工资帽打击国脚状态',
      '谦逊的坎特终于有了缺点 遵纪守法的好公民却爱吃霸王餐',
    ],
    newses: [],
    hasMoreData: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(() => {
      var sources = that.data.sources;
      var newses = []
      for (var i = 0; i < 10; i ++) {
        var news = sources[i];
        newses.push(news);
      }

      that.setData({
        newses: newses
      })
    }, 1000);
  },

  onReachBottom: function () {
    console.log("111");
    var that = this;
    setTimeout(() => {
      var newses = that.data.newses;
      var newsesLen = newses.length;
      var sources = that.data.sources;
      var sourcesLen = sources.length;
      if (newsesLen === sourcesLen) {
        that.setData({
          hasMoreData: false
        })
        return;
      }

      var start = newsesLen;
      var end = Math.min(start + 9, sourcesLen - 1);
      for (var i = start; i <= end; i ++) {
        var news = sources[i];
        newses.push(news);
      }
      that.setData({
        newses: newses
      })
    }, 1000);
  }
})