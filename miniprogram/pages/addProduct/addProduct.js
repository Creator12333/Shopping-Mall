const util = require('../util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    price:'',
    classify:'',
    detail:'',
    stock:'',
    isRecommend:'',
    fileID:'',
    recommendObject:[{name:'是',checked:false},
                     {name:'否',checked:false}],
    classifyObject:[{name:'水果',checked:false},
                    {name:'蔬菜',checked:false},
                    {name:'肉禽蛋品',checked:false},
                    {name:'海鲜水产',checked:false},
                    {name:'粮油调味',checked:false},
                    {name:'熟食卤味',checked:false},
                    {name:'冰品面点',checked:false},
                    {name:'牛奶面包',checked:false},
                    {name:'酒水冷饮',checked:false},
                    {name:'休闲零食',checked:false}],
    now:'',
    array:[]
  },
  getName(res){
    this.setData({
      name:res.detail.value
    })
  },
  getClassify(res){
    this.setData({
      classify:res.detail.value
    })
  },
  getPrice(res){
    this.setData({
      price:res.detail.value
    })
  },
  getDetail(res){
    this.setData({
      detail:res.detail.value
    })
  },
  getStock(res){
    this.setData({
      stock:res.detail.value
    })
  },
  isRecommend(res){
    this.setData({
      isRecommend:res.detail.value
    })
  },
  getPicture(res){
    var that = this;
    var num = Math.floor(Math.random()*10000);
    var time = Date.parse(new Date());
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res);
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath:'shop/' + time + '-' + num,
          filePath:res.tempFilePaths[0],
          success(res){
            console.log("上传成功",res);
            that.setData({
              fileID:res.fileID
            })
            wx.hideLoading({
              success: (res) => {},
            })
          },
          fail(res){
            console.log("上传失败",res);
          }
        })
      }
    })
  },
  submit(res){
    var that = this;
    console.log(that.data.name,that.data.classify,that.data.price,that.data.detail,that.data.isRecommend,that.data.fileID);
    if(that.data.name == '' || that.data.classify == '' || that.data.price == '' || that.data.detail == '' ||that.data.isRecommend == '' || that.data.fileID == ''){
      wx.showToast({
        title: '请完整填写信息',
      })
    }else{
      if(that.data.now == '修改'){
        wx.cloud.callFunction({
          name:'updateProduct',
          data:{
            id:that.data.array._id,
            name:that.data.name,
            fenlei:that.data.classify,
            price:that.data.price,
            detail:that.data.detail,
            isRecommend:that.data.isRecommend,
            fileID:that.data.fileID
          },
          success(res){
            console.log("信息修改成功");
            wx.redirectTo({
              url: '../admin/admin',
              success(res){
                wx.showToast({
                  title: '修改成功',
                  duration:3000
                })
              }
            })
          },
          fail(res){
            console.log("信息修改失败",res);
          }
        })
      }else{
        db.collection('product_shopping').add({
          data:{
            detail:that.data.detail,
            fenlei:that.data.classify,
            img_src:that.data.fileID,
            name:that.data.name,
            price:that.data.price,
            pinglun:[],
            isRecommend:that.data.isRecommend
          },
          success(res){
            console.log("上传成功");
            wx.showToast({
              title: '上传成功',
              success(res){
                wx.redirectTo({
                  url: '../admin/admin',
                })
              }
            })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var classifyObject = that.data.classifyObject;
    var recommendObject = that.data.recommendObject;
    console.log(options.data);
    if(options.data == undefined){

    }else{
      var array = JSON.parse(options.data);
      console.log(array);
      for(var i = 0; i < classifyObject.length; i++){
        if(classifyObject[i].name == array.fenlei){
          classifyObject[i].checked = true;
        }
      }
      for(var j = 0; j < recommendObject.length; j++){
        if(recommendObject[j].name == array.isRecommend){
          recommendObject[j].checked = true;
        }
      }
      that.setData({
        classifyObject:classifyObject,
        recommendObject:recommendObject,
        classify:array.fenlei,
        isRecommend:array.isRecommend,
        now:'修改',
        name:array.name,
        price:array.price,
        detail:array.detail,
        fileID:array.img_src,
        array:array
      })
    }
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