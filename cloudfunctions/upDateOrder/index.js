const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  try {
    return await db.collection('order').doc(event.id).update({
      data:{
        state:event.state
      }
    })
  } catch (e) {
    console.log(e)
  }
}