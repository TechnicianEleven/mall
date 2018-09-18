webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(57)
	__webpack_require__(70)
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

/***/ 70:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});