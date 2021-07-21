const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    openid:'',
    Money:0
  },

  // 结算
  jiesuan(res){
    var that = this;
    var product = [];
    for(var i = 0; i < that.data.array.length; i++){
      if(that.data.array[i].checked == true){
        product.push(that.data.array[i]);
      }
    }
    console.log("已选商品有",product);
    var productAll = JSON.stringify(product);
    wx.navigateTo({
      url: '../address/address?productAll='+productAll,
    })
  },

  // 一键清空
  deleteAll(res){
    var that = this;
    var array = that.data.array;
    for(var i = 0; i < array.length; i++){
      wx.cloud.callFunction({
        name:'delete',
        data:{
          id:array[i]._id
        },
        success(res){
          console.log("删除成功");
          that.onLoad();
          wx.showToast({
            title: '删除成功',
          })
        },
        fail(res){
          console.log("删除失败",res);
        }
      })
    }
  },

  // 选中或不选
  checked(res){
    var that = this;
    console.log(res.detail.value);
    var checked = res.detail.value;
    var id = res.currentTarget.dataset.id;
    if(checked.length == 0){
      for(var i = 0; i < that.data.array.length; i++){
          if(that.data.array[i]._id == id){
            that.data.array[i].checked = false;
            console.log(that.data.array)
            that.setData({
              array:that.data.array
            })
            that.countMoney();
          }
      }
    }else {
      for(var i = 0; i < that.data.array.length; i++){
        if(that.data.array[i]._id == id){
          that.data.array[i].checked = true;
          console.log(that.data.array)
          that.setData({
            array:that.data.array
          })
          that.countMoney();
        }
    }
    }
  },

  // 减少商品数量
  reduce(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = that.data.array;
    for(var i = 0; i < array.length; i++){
      if(array[i]._id == id){
        if(array[i].num <= 1 ){
          wx.showToast({
            title: '客官不能再少了',
          })
          break;
        }
        array[i].num = array[i].num - 1;
        console.log(array[i].num)
        that.setData({
          array:array
        })
        that.countMoney();
      }
    }
  },

  // 增加商品数量
  add(res){
    var that  = this;
    var id = res.currentTarget.dataset.id;
    var array = that.data.array;
    for(var i = 0; i < array.length; i++){
      if(array[i]._id == id){
        array[i].num = array[i].num + 1;
        console.log("+++++++",array[i].num)
        that.setData({
          array:array
        })
        that.countMoney();
      }
    }
  },
  countMoney(){
    var that = this;
    var array = that.data.array;
    var Money = 0;
    for(var i = 0; i < array.length; i++){
      if(array[i].checked == true){
        Money += array[i].price * array[i].num;
      }
    }

    that.setData({
      Money:Money.toFixed(1)
    })
    console.log(that.data.Money);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        console.log(res.result.openid);
        that.setData({
          openid:res.result.openid
        })
        db.collection('shopping_car').where({
          _openid:that.data.openid
        }).get({
          success(res){
            wx.hideLoading({
              success: (res) => {},
            })
            console.log("获取购物车成功",res.data);
            that.setData({
              array:res.data
            })
            that.countMoney();
          },
          fail(res){
            console.log("失败");
          }
        })
      }
    })
    // var id = app.globalData.id;
    // console.log(id);
    // wx.cloud.callFunction({
    //   name:'selectProduct',
    //   data:{
    //     id:id
    //   },
    //   success(res){
    //     console.log(res.result.data);
    //     that.setData({
    //       array:res.result.data
    //     })
    //   },
    //   fail(res){
    //     console.log("失败",res)
    //   }
    // })
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
    this.onLoad();
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