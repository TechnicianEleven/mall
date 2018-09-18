webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: s
	* @Date:   2018-09-06 11:35:33
	* @Last Modified by:   s
	* @Last Modified time: 2018-09-07 22:05:25
	*/
	__webpack_require__(18)
	__webpack_require__(20)
	__webpack_require__(29)
	let _product=__webpack_require__(32)
	let _mm = __webpack_require__(23)
	let _cart = __webpack_require__(28)
	let templateIndex =__webpack_require__(33)
	let page = {
	  data:{
	     productId: _mm.getUrlParam('productId') || '',
	  },
	  init: function(){
	    this.onLoad()
	    this.bindEvent()
	  },
	  onLoad:function(){
	    // 没有id跳转首页
	    if (!this.data.productId) {
	      _mm.goHome()
	    }
	    this.loadDetail()
	  },
	  bindEvent:function(){
	    let _this =this
	    // 因為hover在這個版本jq不會生效
	    $(document).on('mouseenter','.p-img-item',function(){
	      let imageUrl = $(this).find('.p-img').attr('src')
	      $('.main-img').attr('src',imageUrl)
	    })
	    // count的操作
	    $(document).on('click ','.p-count-btn',function(){
	      let type = $(this).hasClass('plus') ? 'plus': 'minus',
	      $pCount= $('.p-count'),
	      currCount = parseInt($pCount.val()),
	      minCount = 1,
	      maxCount = _this.data.detailInfo.stock || 1;
	      if(type==='plus'){
	        $pCount.val(currCount< maxCount ? currCount + 1 :maxCount )
	      }else if(type === 'minus'){
	        $pCount.val(currCount > minCount ? currCount -1 :minCount)
	      }
	    })
	    // 加入購物車
	    $(document).on('click','.cart-add',function(){
	      _cart.addToCart({
	        productId :  _this.data.productId,
	        count: $('.p-count').val()
	      },function(res){
	        window.location.href='./result.html?type=cart-add'
	      },function(errMsg){
	        _mm.errorTips(errMsg)
	      })
	    })
	  },
	  // 加载商品详情的数据
	  loadDetail: function(){
	    let html = ''
	    let _this= this
	    let $pageWrap = $('.page-wrap')
	    $pageWrap.html('<div class="laoding"></div>')
	    _product.getProductDetail(this.data.productId,function(res){
	      _this.filer(res)
	      // 緩存住detail的數據
	      _this.data.detailInfo = res
	      // console.log(111)
	      html=_mm.renderHtml(templateIndex,res)
	      $('.page-wrap').html(html)
	    },function(errMsg){
	      $('.page-wrap').html('<p class="err-tip">此商品太淘氣了，找不到了</p>')
	    })
	  },
	  filer: function(data){
	    data.subImages = data.subImages.split(',')
	  }


	};
	$(function(){
	  page.init()
	})

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */,
/* 20 */
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
/* 21 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	let _mm=__webpack_require__(23)
	let _product ={
	  // 获取商品列表
	  getProductList:function(listParam,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/product/list.do'),
	      data: listParam,
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  },
	  // 獲取商品詳細信息
	  getProductDetail:function(productId,resolve,reject){
	    _mm.request({
	      url: _mm.getServerUrl('/product/detail.do'),
	      data: {
	        productId :productId
	      },
	      method: 'POST',
	      success: resolve,
	      error: reject
	    })

	  },
	  
	}
	module.exports=_product

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = "    <div class=\"intro-wrap\">\r\n      <div class=\"p-img-con\">\r\n        <div class=\"main-img-con\">\r\n          <img class=\"main-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\">\r\n        </div>\r\n        <ul class=\"p-img-list\">\r\n          {{#subImages}}\r\n          <li class=\"p-img-item\">\r\n            <img class=\"p-img\" src=\"{{imageHost}}{{.}}\">\r\n          </li>\r\n          {{/subImages}}\r\n  \r\n        </ul>\r\n      </div>\r\n      <div class=\"p-info-con\">\r\n        <h1 class=\"p-name\">{{name}}</h1>\r\n        <p class=\"p-subtitle\">{{subtitle}}</p>\r\n        <div class=\"p-info-item p-price-con\">\r\n          <span class=\"label\">价格:</span>\r\n          <span class=\"info\">￥{{price}}</span>\r\n        </div>\r\n        <div class=\"p-info-item\">\r\n          <span class=\"label\">库存:</span>\r\n          <span class=\"info\">{{stock}}</span>\r\n        </div>\r\n        <div class=\"p-info-item p-count-con\">\r\n          <span class=\"label\">数量:</span>\r\n          <input class=\"p-count\" value=\"1\" readonly=\"\"/>\r\n          <span class=\"p-count-btn plus\">+</span>\r\n          <span class=\"p-count-btn minus\">-</span>\r\n        </div>\r\n\r\n\r\n        <div class=\"p-info-item\">\r\n          <a class=\"btn cart-add\">加入购物车</a>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"detail-wrap\">\r\n      <div class=\"detail-tab-con\">\r\n        <ul class=\"tab-list\">\r\n          <li class=\"tab-item active\">詳細描述</li>\r\n\r\n        </ul>\r\n      </div>\r\n      <div class=\"detail-con\">\r\n        {{{detail}}}\r\n      </div>\r\n    </div>\r\n";

/***/ })
]);