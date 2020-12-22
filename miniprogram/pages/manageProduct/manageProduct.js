const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:''
  },
  update(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = [];
    for(var i = 0; i < that.data.product.length; i++){
      if(that.data.product[i]._id == id){
        array = JSON.stringify(that.data.product[i]);
      }
    }
    wx.redirectTo({
      url: '../addProduct/addProduct?data=' + array,
    })
  },
  delete(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var fileID = res.currentTarget.dataset.fileid;
    wx.showLoading({
      title: '处理中',
    })
    wx.cloud.callFunction({
      name:'deleteProduct',
      data:{
        id:id
      },
      success(res){
        console.log("商品信息删除成功");
        wx.cloud.deleteFile({
          fileList:[fileID],
          success(res){
            console.log("商品图片删除成功");
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '删除成功',
                })
                that.onLoad();
              },
            })
          },
          fail(res){
            console.log("商品图片删除失败",res);
          }
        })
      },
      fail(res){
        console.log("商品信息删除失败",res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name:'findProduct',
      success(res){
        that.setData({
          product:res.result.data
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