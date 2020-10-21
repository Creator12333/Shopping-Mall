const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },
  getuserinfo(res){
    var that = this;
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(res){
              console.log(res.userInfo.avatarUrl);
              console.log(res.userInfo.nickName);
            }
          })
        }
      }
    })
  },
  search(res){
    console.log(res.detail.value);
    this.setData({
      value:res.detail.value
    })
  },
  button(res){
    var that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['yjuzdXbNS8SW_fQzoKbRyGHKCRemiWi0AL59HkPn2sY'],
      success(res){
        wx.cloud.callFunction({
          name:'WxTuiSong',
          data:{
            openid:'o1rUR5b3fGHnkadb4GQujYdLEL_c',
            id:1234567890,
            time:'2020-10-10 10:19:46',
            address:'北京交通大学海滨学院15号楼B105',
            name:'iphone12',
            price:9999
          },
          success(res){
            console.log("推送成功");
          },
          fail(res){
            console.log("推送失败",res);
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var util = require('../util.js');
    var time = util.formatTime(new Date());
    console.log(time)
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