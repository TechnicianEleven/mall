require('./index.css')
let _mm =require('util/mm.js')
let _user=require('service/user-service.js')
let _cart =require('service/cart-service.js')
let nav={
  init: function(){
    this.bindEvent()
    this.loadUserInfo()
    this.loadCartCount()
    return this
  },
  bindEvent: function(){
    // 登录点击事件
    $('.js-login').click(function(){
      _mm.doLogin()
    })
    //注册点击事件
    $('.js-login').click(function(){
      window.location.href = './user-login.html'
    })
    //点击退出事件
    $('.js-logout').click(function(){
      _user.logout(function(res){
         window.location.reload()
      },function(errMsg){
          _mm.errorTips(errMsg)
      })
    })

  },
  // 加载用户信息
  loadUserInfo: function(){
    _user.checkLogin(function(res){
        $('.user.not-login').hide().siblings('.user.login').show()
        .find('.username').text(res.username)
      },function(errMsg){
          // _mm.errorTip(errMsg)
      })
    
  },
  // 加载用户数量
  loadCartCount:function(){
    _cart.getCartCount(function(res){
       $('.nav .cart-count').text(res|| 0)

      },function(errMsg){
          $('nav .cart-count').text(0)
      })
  }
}
module.exports = nav.init()