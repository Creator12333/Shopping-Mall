const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('shopping_car').doc(event.id).remove({
    })
  } catch (e) {
    console.log(e)
  }
}