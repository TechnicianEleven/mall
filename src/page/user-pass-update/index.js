/*
* @Author: s
* @Date:   2018-09-03 22:11:15
* @Last Modified by:   s
* @Last Modified time: 2018-09-03 23:12:43
*/
require('page/common/nav/index.js')
require('page/common/header/index.js')
let _user=require('service/user-service.js')
let navSide=require('page/common/nav-side/index.js')
require('./index.css')
let _mm = require('util/mm.js')

let page={
  init:function(){
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function(){
    // 初始化左侧菜单
    navSide.init({
      name: 'user-pass-update'
    })
    // 加载用户信息
    this.loadUserInfo()
  },
  loadUserInfo:function(){
    let uerHtml = ''
   _user.getUserInfo(function(res){
     // $('.panel-body').html(userHtml)
   },
    function(errMsg){
       _mm.errorTips(errMsg)
   })

  },
  bindEvent:function(){
    let _this=this
    $(document).on('click','.btn-submit',function(){
       let userInfo={
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val()),
       },
       validateResult = _this.validateForm(userInfo)
       if(validateResult.status){
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew

        },function(res){
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