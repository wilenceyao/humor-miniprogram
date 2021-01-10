//index.js
const app = getApp()
import humors from '../../utils/humors.js';

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    authorized: false,
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true,
                openid: getApp().globalData.openid
              })
            }
          })
          wx.getOpenid
        } else {
          wx.showToast({
            title: '请登陆后使用',
            icon: 'none',
            duration: humors.toastDuration
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../index',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  onWeatherBtn: function (e) {
    var req = {}
    humors.callHumor("weather", req,
      (res => {
        wx.showToast({
          title: '正在播报本地天气',
          icon: 'none',
          duration: humors.toastDuration
        })
      }),
      (res => {
        wx.showToast({
          title: humors.toastErrText,
          icon: 'none',
          duration: humors.toastDuration
        })
      }))
  }
})
