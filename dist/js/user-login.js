webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(57)
	__webpack_require__(68)
	let _mm=__webpack_require__(23)
	let _user=__webpack_require__(27)
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

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

	let _mm=__webpack_require__(23)
	let _user ={
	  //用户登录
	  login:function(userinfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/login.do'),
	      data: userinfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  },  //检查登录状态
	  checkLogin:function(resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/get_user_info.do'),
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  },  
	  // 验证用户名字是否存在
	  checkUsername:function(username,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/check_valid.do'),
	      data:{
	        type: 'username',
	        str: username
	      },
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  }, 
	   // 用户注册
	  register:function(userinfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/register.do'),
	      data: userinfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  }, 
	  // 获取用户密码提示问题 
	  getQuestion:function(username,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_get_question.do'),
	      data: {
	        username : username
	      },
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  },
	  checkAnswer:function(userInfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_check_answer.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  }, 
	  // 重置密码
	  resetPassword:function(userInfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/forget_reset_password.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  },
	  // 获取用户信息  
	  getUserInfo: function(resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/get_information.do'),
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  },

	  updateUserInfo:function(userInfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/update_information.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  },
	  // 登录状态更新密码
	  updatePassword:function(userInfo,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/reset_password.do'),
	      data: userInfo,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })
	  },
	  // 登出
	  logout:function(resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/user/logout.do'),
	      method: 'POST',
	      success : resolve,
	      error : reject
	    })
	  },
	  
	}
	module.exports=_user

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(58)

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});