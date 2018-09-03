require('page/common/nav/index.js')
require('page/common/header/index.js')
let _user=require('service/user-service.js')
let navSide=require('page/common/nav-side/index.js')
require('./index.css')
let _mm = require('util/mm.js')
let templateIndex =require('./index.string')
let page={
  init:function(){
    this.onLoad()
  },
  onLoad: function(){
    // 初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    // 加载用户信息
    this.loadUserInfo()
  },
  loadUserInfo:function(){
    let uerHtml = ''
   _user.getUserInfo(function(res){
     userHtml = _mm.renderHtml(templateIndex,res)
     $('.panel-body').html(userHtml)
   },
    function(errMsg){
       _mm.errorTips(errMsg)
   })

  }
  
  
}
$(function(){
  page.init()
})