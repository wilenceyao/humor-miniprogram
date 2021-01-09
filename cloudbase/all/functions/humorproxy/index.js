// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let { userInfo, action, payload} = event
    let url = "http://10.0.2.6:10003/" + action
    console.log(wxContext)
    console.log(userInfo)
    console.log(url)
    console.log(action)
    console.log(payload)
    res =  await got.post(url, {
        json: true, 
        body: payload
    });
    return res.body

    
}