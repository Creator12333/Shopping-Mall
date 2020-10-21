const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'',
    selectSex:'',
    address_leixing:'',
    name:'',
    phone:'',
    address:'',
    selectSex_arr : ['先生','女士'],
    address_leixing_arr : ['家','父母家','朋友家','公司','学校'],
    array:[],
    productAll:null
  },

  // 保存当前编写的收货地址信息
  baocun(res){
    var that = this;
    if(that.data.state == '新建'){
      db.collection('address').add({
        data:{
          name:that.data.name,
          selectSex:that.data.selectSex,
          phoneNum:that.data.phone,
          address_leixing:that.data.address_leixing,
          address:that.data.address
        },
        success(res){
          console.log("上传地址成功");
          wx.showToast({
            title: '保存成功',
            success(res){
              wx.navigateTo({
                url: '../address/address?state='+'新建'+'&productAll='+that.data.productAll,
              })
            }
          })
        },
        fail(res){
          console.log("上传地址失败");
        }
      })
    }else if(that.data.state == '修改'){
      wx.cloud.callFunction({
        name:'upDateAddress',
        data:{
          openid:that.data.array._openid,
          id:that.data.array._id,
          name:that.data.name,
          selectSex:that.data.selectSex,
          phoneNum:that.data.phone,
          address:that.data.address,
          address_leixing:that.data.address_leixing
        },
        success(res){
          console.log("更改地址成功");
          wx.navigateTo({
            url: '../address/address?productAll='+that.data.productAll,
          })
        },
        fail(res){
          console.log("更改地址失败",res);
        }
      })
    }
  },

  // 获取收货地址
  address(res){
    this.setData({
      address:res.detail.value
    })
  },
  // 获取手机号
  phone(res){
    // console.log(res.detail.value)
    this.setData({
      phone:res.detail.value
    })
  },

  // 获取地址类型
  select(res){
    var that = this;
    var name = res.currentTarget.dataset.name;
    console.log(name);
    that.setData({
      address_leixing:name
    })
  },

  // 获取收货人性别
  man(res){
    this.setData({
      selectSex:'先生'
    })
  },
  woman(res){
    this.setData({
      selectSex:'女士'
    })
  },

  // 获取收货人姓名
  name(res){
    // console.log(res.detail.value)
    this.setData({
      name:res.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = options.data;
    console.log(options);
    var productAll = options.productAll;
      that.setData({
        productAll:productAll
      })
      if(data == undefined){
        that.setData({
          state:'新建'
        })
      }else{
        that.setData({
          state:'修改'
        })
        var array = JSON.parse(data);
        console.log(array);
        that.setData({
          array:array[0],
          name:array[0].name,
          selectSex:array[0].selectSex,
          phone:array[0].phoneNum,
          address:array[0].address,
          address_leixing:array[0].address_leixing
        })
      }
    
 
    // console.log(id)
    // db.collection('address').where({
    //   _id:id
    // }).get({
    //   success(res){
    //     console.log("获取成功",res.data[0]);
    //     array = res.data[0];
    //     that.setData({
    //       name:array.name,
    //       selectSex:array.selectSex,
    //       phone:array.phoneNum,
    //       address_leixing:array.address_leixing
    //     })
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