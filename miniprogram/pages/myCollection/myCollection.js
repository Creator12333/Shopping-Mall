const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },

  // 跳转商品详情页
  goToProduct(res){
    var id = res.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../product/product?id=' +id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var array = [];
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        that.setData({
          openid:res.result.openid
        })
        db.collection('Collection').get({
          success(res){
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i]._openid == that.data.openid){
                array.push(res.data[i]);
                that.setData({
                  array:array
                })
                wx.hideLoading({
                  success: (res) => {},
                })
                console.log(that.data.array)
              }
            }
          }
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