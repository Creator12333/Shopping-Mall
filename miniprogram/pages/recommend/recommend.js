const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    openid:''
  },
  // 加入购物车
  addToShopping(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var x = 0;
    var array = [];
    for(var n = 0; n < that.data.product.length; n++){
      if(that.data.product[n]._id == id){
        array = that.data.product[n];
      }
    }
    console.log(array)
        db.collection('shopping_car').get({
          success(res){
            console.log(res);
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i]._openid == that.data.openid && res.data[i].id == id){
                wx.showToast({
                  title: '您已重复添加',
                })
                x = 1;
              }
            }
            if(x == 0){
              db.collection('shopping_car').add({
                data:{
                  name:array.name,
                  price:array.price,
                  detail:array.detail,
                  img_src:array.img_src,
                  checked:true,
                  num:1,
                  id:array._id
                },
                success(res){
                  console.log("上传成功");
                  wx.showToast({
                    title: '成功加入购物车',
                  })
                },
                fail(res){
                  console.log("上传失败",res);
                }
              })
            }
            }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var fenlei = ['水果','蔬菜','肉禽蛋品','海鲜水产','粮油调味','熟食卤味','冰品面点','牛奶面包','酒水冷饮','休闲零食'];
    var array = [];
    // var x = 0,i = 0;
    // console.log(x,i);
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findProduct',
      success(res){
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i].isRecommend == '是'){
            array.push(res.result.data[i])
          }
        }
        that.setData({
          product:array
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        that.setData({
          openid:res.result.openid
        })
      }
    })
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

  }
})