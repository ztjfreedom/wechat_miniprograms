// pages/checkboxdemo/checkboxdemo.js
Page({

  /**
   * Page initial data
   */
  data: {
    languages: [
      {
        id: 1,
        name: "Python"
      },
      {
        id: 2,
        name: "Java"
      },
      {
        id: 3,
        name: "PHP"
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },


  onChange: function (event) {
    console.log(event);
  },

  onSubmit: function (event) {
    console.log(event);
  }
})