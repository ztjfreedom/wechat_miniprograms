// components/stars/stars.js
Component({
  /**
   * Component properties
   */
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时会执行的函数
        // 有些页面请求数据会晚于组件加载，所以用这种方式更新数据
        this.updateRate();
      }
    },
    starsize: {
      type: Number,
      value: 20  // rpx
    },
    fontsize: {
      type: Number,
      value: 20  // rpx
    },
    fontcolor: {
      type: String,
      value: "gray"  // rpx
    },
    istext: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    updateRate: function () {
      var rate = this.properties.rate;
      var light = parseInt(rate / 2);
      var half = parseInt(rate % 2);
      var gray = 5 - light - half;

      // 在wxml中用wx:for渲染需要元素个数的数组，所以这里把数字转为对应数量元素的数组
      var lights = [];
      var halfs = [];
      var grays = [];
      for (var i = 0; i < light; i ++) lights.push(i);
      for (var i = 0; i < half; i ++) halfs.push(i);
      for (var i = 0; i < gray; i ++) grays.push(i);

      var ratetext = (rate && rate > 0) ? rate.toFixed(1) : "未评分"  // 保留一位小数或者显示未评分
      this.setData({
        lights: lights,
        halfs: halfs,
        grays: grays,
        ratetext: ratetext
      });
    }
  },

  lifetimes: {
    attached: function () {
      this.updateRate();
    }
  }
})
