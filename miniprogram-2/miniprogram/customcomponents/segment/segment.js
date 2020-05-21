// customcomponents/segment/segment.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * Component properties
   */
  properties: {
    items: {
      type: Array,
      value: []
    },
    defaultIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * Component initial data
   */
  data: {
    currentIndex: 0
  },

  lifetimes: {
    attached: function () {
      var that = this;
      this.setData({
        currentIndex: that.properties.defaultIndex
      });
    }
  },

  /**
   * Component methods
   */
  methods: {
    onItemTap: function (event) {
      var index = event.target.dataset.index;
      this.setData({  // properties也可以用这种方法设置
        currentIndex: index
      });
      var detail = {index: index};
      var options = [];
      this.triggerEvent("itemchanged", detail, options);
    }
  }
})
