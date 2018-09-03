
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
    // 验证username
    $("#username").blur(function(){
      let username =$.trim($(this).val())
      // 没有名字就返回
      if(!username){
        return
      }
      // 异步验证用户名是否存在
      _user.checkUsername(username,function(res){
        // 隐藏错误显示
        formError.hide()

      },
        function(errMsg){
           formError.show(errMsg)
        })
    })
    // 注册按钮点击
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
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#passwordConfirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val()),
    },
    validateResult =this.formValidate(formData)
    // 验证成功
    if (validateResult.status){
      _user.register(formData,function(res){
          window.location.href = './result.html?type=register'
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
    // 验证用户名不能为空
    if(!_mm.validate(formData.username,'require')){
      result.msg= '用户名不能为空'
      return result
    }  
    // 验证密码不能为空  
    if(!_mm.validate(formData.password,'require')){
      result.msg= '密码不能为空'
      return result
    } 
     // 验证密码不能为空  
    if(!_mm.validate(formData.question,'require')){
      result.msg= '提示问题不能为空'
      return result
    }  
     // 验证答案不能为空
    if(!_mm.validate(formData.answer,'require')){
      result.msg= '答案不能为空'
      return result
    } 
    // 验证密码长度不能少于6位   
    if(formData.password.length<6){
      result.msg= '密码长度不能少于6位'
      return result
    }
    // 验证两次输入密码是否一致  
    if(formData.password !== formData.passwordConfirm){
      result.msg= '两次输入密码不一致'
      return result
    }
    // 验证手机号
    if(!_mm.validate(formData.phone,'phone')){
      result.msg= '手机号格式不合符规范'
      return result
    }
    if(!_mm.validate(formData.email,'email')){
      result.msg= '邮箱格式不符合规范'
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
// 非常重要等jq加载完成再执行
$(function(){
  page.init()
})