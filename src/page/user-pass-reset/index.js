
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
  // 内部缓存变量
  data:{
    username: '',
    question: '',
    answer: '',
    token: '',
  },
  init:function(){
    // 进来需要显示第一个页面
    this.onload();
    this.bindEvent()
  },
  onload:function(){
    this.loadStepUsername()
  },
  bindEvent:function(){
    let _this= this
    // 登录按钮点击
    $("#submit-username").click(function(event) {
      let username =$.trim($('#username').val()) 
      if(username){
        _user.getQuestion(username,function(res){
          _this.data.username= username
          _this.data.question =res
          _this.loadStepQuestion()
        },
          function(errMsg){
            formError.show(errMsg)
          })
      }else{
        formError.show('请输入用户名')
      }
    });   
    // 输入密码提示问题的按钮点击 
    $("#submit-question").click(function(event) {
      let answer =$.trim($('#answer').val()) 
      if(answer){
        // 检查密码提示问题答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        },function(res){
           _this.data.anser =answer
           _this.data.token =res
            _this.loadStepPassword()
        },
          function(errMsg){
             formError.show(errMsg)
          })
      }else{
        formError.show('问题答案')
      }
    });
    // 输入新密码后的按钮点击   
    $("#submit-password").click(function(event) {
      let password =$.trim($('#password').val()) 
      if(password && password.length >= 6){
        // 密码不为空
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        },function(res){
          window.location.href ='./result.html?type=pass-reset'
        },
          function(errMsg){
             formError.show(errMsg)
          })
      }else{
        formError.show('请输入不少于6位新密码')
      }
    });

  },
  // 加载输入用户名的第一步
  loadStepUsername: function(){
    $('.step-username').show()
  }, 
  // 加载输入密码提示问题答案的第一步
  loadStepQuestion: function(){
    let _this=this
    formError.hide()
    $('.step-username').hide().siblings('.step-question').show().find('.question').text(_this.data.question)
  }, 
  // 加载输入password的第一步
  loadStepPassword: function(){
    formError.hide()
    $('.step-question').hide().siblings('.step-password').show()
  },
}
$(function(){
  page.init()
})