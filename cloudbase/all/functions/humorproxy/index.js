// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // check openID
    let { userInfo, action, payload } = event
    if (process.env.AUTH_OPENIDS.indexOf(userInfo.openId) === -1) {
        // 非授权用户
        return {
            response : {
                // UNAUTHORIZED
                code: 3
            }
        }
    }
    let url = "http://10.0.2.6:10003/" + action
    console.log(userInfo)
    console.log(url)
    console.log(payload)
    res = await got.post(url, {
        json: true,
        body: payload
    });
    return res.body
}