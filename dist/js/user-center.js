webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(20)
	__webpack_require__(29)
	let _user=__webpack_require__(27)
	let navSide=__webpack_require__(34)
	__webpack_require__(62)
	let _mm = __webpack_require__(23)
	let templateIndex =__webpack_require__(64)
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

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(21)
	let _mm =__webpack_require__(23)
	let _user=__webpack_require__(27)
	let _cart =__webpack_require__(28)
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

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

	let _mm=__webpack_require__(23)
	let _cart = {
	  // 獲取購物車數量
	  getCartCount: function(resolve, reject){
	    _mm.request({
	      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
	      success : resolve,
	      error  : reject
	    })
	  },
	  // 添加到購物車
	  addToCart:function(productInfo, resolve, reject){

	    _mm.request({
	      url: _mm.getServerUrl('/cart/add.do'),
	      data:productInfo,
	      success :resolve,
	      error  : reject
	    })
	  }
	}
	module.exports = _cart

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)
	let _mm = __webpack_require__(23)
	// 通用页面头部
	let header= {
	  init: function(){
	    this.bindEvent()
	    this.onLoad()
	  },
	  onLoad: function() {
	    let keyword = _mm.getUrlParam('keyword');
	    if(keyword){
	      $('#search-input').val(keyword)
	    }
	  },
	  bindEvent: function(){
	    let _this =this
	    // 点击搜索按钮的时候做搜索提交
	     $("#search-btn").click(function(){
	        _this.searchSubmit();
	     })
	     // 输入回车后也是做提交
	     $("#search-input").keyup(function(e){
	        if(e.keyCode === 13) {
	            _this.searchSubmit();
	        }

	     })
	     // $("#search-input").keyup(funciton(e){
	 
	     // })
	  },
	  // 搜索的提交
	  searchSubmit: function(){
	    let keyword = $.trim($('#search-input').val())
	    // 如果提交的有keyword跳转到list，为空返回首页
	    if(keyword) {
	       window.location.href='./list.html?keyword='+keyword
	    }else{
	      _mm.goHome()
	    }
	  }

	}
	header.init()

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(35)
	let _mm =__webpack_require__(23)
	let templateIndex =__webpack_require__(37)
	// 侧边导航
	let navSide={
	  option: {
	    name: '',
	    navList:[
	      {name: 'user-center',desc: '个人中心',href:'./user-center.html'},
	       {name: 'order-list',desc: '我的订单',href:'./order-list.html'},
	       {name: 'user-pass-update',desc: '修改密码',href:'./user-pass-update.html'},
	        {name: 'about',desc: '关于mall',href:'./about.html'}
	    ]
	    // navList: [
	    //   {name: 'user-center',desc: '个人中心'，href:'./user-center.html'},
	    //   {name: 'order-list',desc: '我的订单'，href:'./order-list.html'},
	    //   {name: 'pass-update',desc: '修改密码'，href:'./pass-update.html'},
	    //   {name: 'about',desc: '关于mall'，href:'./about.html'}
	    // ]
	  },
	  init: function(option){
	    $.extend(this.option,option)
	    this.renderNav()
	    // return this
	  },
	  // 渲染导航菜单
	  renderNav: function(){
	     for( let i=0,iLength=this.option.navList.length;i<iLength;i++ ){
	        if(this.option.navList[i].name === this.option.name){
	          this.option.navList[i].isActive =true
	        }
	     }
	     // 渲染list数据
	     let navHtml=_mm.renderHtml(templateIndex,{
	      navList: this.option.navList
	     })
	     // 把html放入容器
	     $('.nav-side').html(navHtml)
	     // console.log(navHtml)
	  }

	}
	module.exports=navSide

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\r\n</li>\r\n{{/navList}} \r\n";

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	module.exports = "  <div class=\"user-info\">\r\n    <div class=\"form-line\">\r\n      <span class=\"label\">用户名:</span>\r\n      <span class=\"text\">{{username}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n      <span class=\"label\">电 话:</span>\r\n      <span class=\"text\">{{phone}}</span>\r\n    </div> \r\n   <div class=\"form-line\">\r\n      <span class=\"label\">邮 箱:</span>\r\n      <span class=\"text\">{{email}}</span>\r\n    </div>\r\n   <div class=\"form-line\">\r\n      <span class=\"label\">问 题:</span>\r\n      <span class=\"text\">{{question}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n      <span class=\"label\">答 案:</span>\r\n      <span class=\"text\">{{answer}}</span>\r\n    </div>\r\n     <div class=\"form-line\">\r\n      <a class=\"btn btn-submit\" href=\"./user-center-update.html\">编辑</a>\r\n    </div>\r\n\r\n  </div>";

/***/ })

});