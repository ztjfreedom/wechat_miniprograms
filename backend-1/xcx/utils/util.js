const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const myrequest = {
  request: function(params){
    const token = wx.getStorageSync('token')
    params.header = {
      "token": token
    }
    if(params.method == 'POST'){
      params.header['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    wx.request(params)
  },

  get: function(params){
    params.method = 'GET'
    this.request(params)
  },

  post: function(params){
    params.method = 'POST'
    this.request(params);
  }
}


module.exports = {
  formatTime: formatTime,
  myrequest: myrequest
}
