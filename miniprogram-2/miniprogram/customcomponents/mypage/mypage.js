// customcomponents/mypage/mypage.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  options: {
    multipleSlots: true
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
    onBodyTap: function (event) {
      var index = event.target.dataset.index;
      var detail = {"index": index};
      var options = {};
      this.triggerEvent("bodytap", detail, options);  // 主动触发事件
    }
  },

  // 自定义组件本身的生命周期
  lifetimes: {
    created: function () {
      console.log("component created");
    },

    attached: function () {
      console.log("component attached");
    },

    detached: function () {
      console.log("component detached");
    }
  },

  // 监听page的生命周期，只可以监听show,hide和resize
  pageLifetimes: {
    show: function () {
      console.log("page show");
    },

    hide: function () {
      console.log("page hide");
    },

    resize: function () {
      console.log("page resize");
    }
  }
})
