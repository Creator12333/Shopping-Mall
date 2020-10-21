const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_name:[
              {id:1,name:'水果'},
              {id:2,name:'蔬菜'},
              {id:3,name:'肉禽蛋品'},
              {id:4,name:'海鲜水产'},
              {id:5,name:'粮油调味'},
              {id:6,name:'熟食卤味'},
              {id:7,name:'冰品面点'},
              {id:8,name:'牛奶面包'},
              {id:9,name:'酒水冷饮'},
              {id:10,name:'休闲零食'}
              // {id:11,name:'日用清洁'},
    ],
    all:[],
    product:[],
    id:0,
    num:0,
    name:''
  },

  // 跳转商品详情页
  GoToProduct(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
    // for(var i = 0; i < that.data.all.length; i++){
    //   if(that.data.all[i]._id == id){

    //   }
    // }
  },

  // 显示对应分类的商品
  selectId(res){
    var that = this;
    var name = res.currentTarget.dataset.name;
    var name_1 = '';
    var array = [];
    console.log(name);
    that.setData({
      name:name
    })
    // for(var i = 0; i < that.data.left_name.length;i++){
    //   if(that.data.left_name[i].name == name){
    //     console.log("当前选择的分类是",that.data.left_name[i].name)
    //     name_1 = that.data.left_name[i].name;
    //   }
    // }
    for(var j = 0; j < that.data.all.length; j++){
      if(that.data.all[j].fenlei == name){
        array.push(that.data.all[j]);
      }
    }
    that.setData({
      product:array
    })
    console.log(that.data.product)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var array = [];
    var name = app.globalData.name;
    wx.showLoading({
      title: '加载中',
    })
    console.log(name);
    if(name == ''){
      console.log("执行if");
      wx.cloud.callFunction({
        name:'findProduct',
        success(res){
          that.setData({
            product:res.result.data,
            all:res.result.data
          })
          wx.hideLoading({
            success: (res) => {},
          })
          console.log("所有商品为",that.data.product)
        }
      })
    }else {
      console.log("执行else");
      that.setData({
        name:name
      })
      wx.cloud.callFunction({
        name:'findProduct',
        success(res){
          that.setData({
            product:res.result.data,
            all:res.result.data
          })
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(that.data.product)
          for(var i = 0; i < that.data.product.length; i++){
            if(that.data.product[i].fenlei == name){
              console.log("-------")
              array.push(that.data.product[i]);
            }
          }
          console.log(array);
          that.setData({
            product:array
          })
        }
      })
    }
    // that.setData({
    //   id:1
    // })

    // wx.cloud.callFunction({
    //   name:'OpenId',
    //   success(res){
    //     console.log(res)
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