
function callHumor(action, req, succCall, failCall) {
    req.request = {
        RequestID: "123",
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
                failCall(result);
            }
        }),
        fail: failCall
    });
}

module.exports.callHumor = callHumor;