const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: event.openid,           //要发送用户的openid
        page: 'pages/index/index',        //用户通过消息通知点击进入小程序的页面
        lang: 'zh_CN',      //进入小程序查看”的语言类型，支持zh_CN(简体中文)、en_US(英文)、zh_HK(繁体中文)、zh_TW(繁体中文)，默认为zh_CN
        data: {           //要发送的数据，这里需要注意的事项，我在下面说
          name2:{
            value:event.name
          },
          phone_number3:{
            value:event.phoneNum
          },
          thing4:{
            value:event.address
          },
          thing5:{
            value:event.productName
          },
          character_string6:{
            value:event.id
          }
        },
        templateId: '00SOJKTCPHe2MKsXCRdevh___pgqPu6b6aG3-GOsINM',   //订阅消息模板ID
        miniprogramState: 'developer'   //跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版

      })
    return result
  } catch (err) {
    return err
  }
}
