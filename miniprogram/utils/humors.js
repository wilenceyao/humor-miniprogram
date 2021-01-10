function callHumor(action, req, succCall, failCall) {
    req.request = {
        RequestID: Math.random().toString(36).slice(-8),
    }
    wx.cloud.callFunction({
        name: 'humorproxy',
        data: {
            action: action,
            payload: req
        },
        success: (res =>  {
            var result = res.result
            if (result.response.code === undefined) {
                result.response.code = 0;
            }
            if (result.response.code === 0) {
                succCall(result);
            } else {
                
                if (result.response.code === 3) {
                    // 未授权
                    wx.redirectTo({
                        url: '/pages/unauthorized/unauthorized'
                    })
                }
                failCall(result);
            }
        }),
        fail: failCall
    });
}

module.exports.callHumor = callHumor;
module.exports.toastDuration = 1000;
module.exports.toastErrText = "数据获取失败";
module.exports.toastSuccText = "数据发送成功";