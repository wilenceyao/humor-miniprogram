// miniprogram/pages/humor/tts/index.js
import humors from '../humors.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindFormSubmit: function (e) {
        if (!e.detail.value.textarea) {
            return
        }
        var req = {
            Text: e.detail.value.textarea,
            ClientID: "82:a9:10:86:38:01",
        }
        console.log(req)
        humors.callHumor("tts", req,
            (res => {
                console.log("消息发送成功")
            }),
            (res => {
                console.log("消息发送失败")
            }))
    }
})