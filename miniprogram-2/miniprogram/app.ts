// app.ts
App<IAppOption>({
  globalData: {},

  // 小程序被加载完毕后只会被调用一次
  onLaunch(options) {
    console.log("onLaunch");
    console.log(options);  // path, query, referrerInfo, scene, shareTicket
  },

  // 每当小程序从后台进入到前台时都会调用onShow
  // 实时动态数据的更新适合放在onShow方法中
  onShow(options) {
    console.log("onShow");
    console.log(options);
  },

  // 小程序进入后台时调用的方法
  // 当小程序进入后台需要保存一些相关的数据时，适合使用onHide方法
  onHide() {
    console.log("onHide");
    // console.log(this.globalData.userInfo);
    // console.log(username);
  },

  onError(msg) {
    console.log("onError");
    console.log(msg);
  }
})