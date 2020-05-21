// components/searchbar/searchbar.js
Component({
  /**
   * Component properties
   */
  properties: {
    isnavigator: {
      type: Boolean,
      value: false
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
    onInput: function (event) {
      var value = event.detail.value;
      var detail = {"value": value};
      var options = {};
      this.triggerEvent("searchinput", detail, options);
    }
  }
})
