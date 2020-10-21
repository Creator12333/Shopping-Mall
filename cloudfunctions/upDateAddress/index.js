const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  try {
    return await db.collection('address').doc(event.id).update({
      data:{
        _openid:event.openid,
        name:event.name,
        selectSex:event.selectSex,
        phoneNum:event.phoneNum,
        address:event.address,
        address_leixing:event.address_leixing
      }
    })
  } catch (e) {
    console.log(e)
  }
}