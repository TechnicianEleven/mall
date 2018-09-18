webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(57)
	__webpack_require__(74)
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

/***/ 74:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});