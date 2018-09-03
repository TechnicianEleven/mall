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
    this.bindEvent()
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

  },
  bindEvent:function(){
    let _this=this
    $(document).on('click','.btn-submit',function(){
       let userInfo={
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
       },
       validateResult = _this.validateForm(userInfo)
       if(validateResult.status){
        _user.updateUserInfo(userInfo,function(res){
          _mm.successTips('更新成功')
          window.location.href='./user-center.html'
        },
          function(errMsg){
          _mm.errorTips(errMsg)
          })
       }else{
        _mm.errorTips(validateResult.msg)
       }

    })
  },
  validateForm: function(){
    return {
      status: true,
      msg: ''
    }
  }
}
$(function(){
  page.init()
})