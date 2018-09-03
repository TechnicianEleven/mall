
require('page/common/nav-simple/index.js')
require('./index.css')
let _mm=require('util/mm.js')
let _user=require('service/user-service.js')
let formError ={
  show : function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg)
  },
  hide: function(){
    $('.error-item').hide().find('.err-msg').text('')
  }
}
let page={
  init:function(){
    this.bindEvent()
  },
  bindEvent:function(){
    let _this= this
    // 登录按钮点击
    $("#submit").click(function(event) {
      _this.submit()
    });
    // 如果按下回车，也提交
    $('.user-content').keyup(function(e) {
      if(e.keyCode === 13){
        _this.submit()
      }
    });
  },
  // 提交表单
  submit: function(){
    let formData={
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    },
    validateResult =this.formValidate(formData)
    // 验证成功
    if (validateResult.status){
      _user.login(formData,function(res){
          window.location.href = _mm.getUrlParam('redirect') || './index.html'
      },function(errMsg){
          formError.show(errMsg)
      })
    }else{
      // 错误提示
        formError.show(validateResult.msg)
    }
  },
  // 验证表单
  formValidate:function(formData){
    let result ={
      status : false,
      msg: ''
    }
    if(!_mm.validate(formData.username,'require')){
      result.msg= '用户名不能为空'
      return result
    }    
    if(!_mm.validate(formData.password,'require')){
      result.msg= '密码不能为空'
      return result
    }
    // if (！_mm.validate(formData.username,'require')){
    //   result.msg = '用户名不能为空'
    //   return result
    // }
    // if (！_mm.validate(formData.password,'require')) {
    //   result.msg = '密码不能为空'
    //   return result
    // };
    result.status = true
    result.msg ='验证通过'
    return result
  }
}
$(function(){
  page.init()
})