const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    array:[],
    productAll:[]
  },

  // 选中地址
  selectAddress(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = [];
    var product = [];
    var productAll = [];
    for(var i = 0; i < that.data.array.length; i++){
      if(that.data.array[i]._id == id){
        array = JSON.stringify(that.data.array[i]);
      }
    }
    for(var j = 0; j < that.data.productAll.length; j++){
      product.push(JSON.stringify(that.data.productAll[j]));
    }
    productAll = JSON.stringify(product);
    console.log("转化完的商品为:",productAll);
    console.log(array)
    wx.navigateTo({
      url: '../shop_order/shop_order?array='+array+'&productAll='+productAll,
    })
  },

  // 修改当前地址
  changeAddress(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var testArr = [];
    console.log(id);
    for(var i = 0; i < that.data.array.length; i++){
      if(that.data.array[i]._id == id){
        testArr.push(that.data.array[i])
      }
    }
    var array = JSON.stringify(testArr);
    var productAll = JSON.stringify(this.data.productAll);
    wx.navigateTo({
      url: '../address_detail/address_detail?data='+array+'&productAll='+productAll,
    })
  },

  // 添加新地址
  address(res){
    var productAll = JSON.stringify(this.data.productAll);
    wx.navigateTo({
      url: '../address_detail/address_detail?productAll=' + productAll,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var state = options.state;
    var array = [];
    console.log(options);
    // console.log(state);
    // if(state == '新建'){
    //   wx.cloud.callFunction({
    //     name:'OpenId',
    //     success(res){
    //       that.setData({
    //         openid:res.result.openid
    //       })
    //       db.collection('address').get({
    //         success(res){
    //           for(var n = 0; n < res.data.length; n++){
    //             if(res.data[n]._openid == that.data.openid){
    //               array.push(res.data[n]);
    //               that.setData({
    //                 array:array
    //               })
    //             }
    //           }
    //         }
    //       })
    //     }
    //   })
    // }else {

    // }
    var productAll = JSON.parse(options.productAll);
    console.log(productAll);
    wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        console.log(res.result.openid);
        that.setData({
          openid:res.result.openid
        })
        db.collection('address').get({
          success(res){
            console.log("获取地址成功",res.data);
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i]._openid == that.data.openid){
                  array.push(res.data[i]);
                  that.setData({
                    array:array,
                  })
              }
            }
            that.setData({
              productAll: productAll
            })
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