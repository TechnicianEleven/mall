webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(20)
	__webpack_require__(29)
	let _product=__webpack_require__(32)
	__webpack_require__(50)
	let _mm = __webpack_require__(23)
	let templateIndex =__webpack_require__(52)
	let Pagination =__webpack_require__(53)
	let page = {
	  data:{
	    listParam:{
	      keyword: _mm.getUrlParam('keyword') || '',
	      categoryId : _mm.getUrlParam('categoryId') || '',
	      orderBy: _mm.getUrlParam('orderBy') || 'default',
	      pageNum: _mm.getUrlParam('pageNum') || 1,
	      pageSize: _mm.getUrlParam('pageSize') || 20
	    }
	  },
	  init: function(){
	    this.onLoad()
	    this.bindEvent()
	  },
	  onLoad:function(){
	    this.loadList()
	  },
	  bindEvent:function(){
	    let _this=this
	    // 排序的点击
	    // 每个sort-item都有这个事件
	    $('.sort-item').click(function(){
	        // console.log(1)
	        let $this=$(this)
	        _this.data.listParam.pageNum= 1
	        // 初始化数据的时候吧page只为一
	        if($this.data('type') === 'default'){
	          // 如果本来就是有默认排序，那么函数就直接返回
	          if ($this.hasClass('active')){
	             return
	          }else{
	            $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
	            _this.data.listParam.orderBy = 'default'
	          }
	          // console.log(112)
	        }
	        // console.log(111122)
	        // 点击价格排序
	        else if($this.data('type') === 'price'){
	          // active class 的处理
	          $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
	          // 升序降序处理
	          if(!$this.hasClass('asc')){
	            $this.addClass('asc').removeClass('desc')
	            _this.data.listParam.orderBy = 'price_asc'
	          }else{
	            $this.addClass('desc').removeClass('asc')

	            _this.data.listParam.orderBy = 'price_desc'
	          }
	        }
	        // 重新加载列表
	        _this.loadList()
	    })

	  },
	  loadList: function(){
	    let _this=this
	    let listHtml = ''
	    let listParam = this.data.listParam
	    $pListCon=$('.p-list-con')
	    $pListCon.html('<div class="loading"></div>')
	    // 删除参数中不必要的字段
	    listParam.categoryId ?( delete listParam.keyword) :( delete listParam.categoryId)
	    // 请求接口
	    _product.getProductList(listParam,function(res){
	       listHtml=_mm.renderHtml(templateIndex,{
	        list : res.list
	       })
	       $('.p-list-con').html(listHtml)
	       _this.loadPagination({
	        hasPreviousPage: res.hasPreviousPage,
	        prePage : res.prePage,
	        hasNextPage: res.hasNextPage,
	        nextPage: res.nextPage,
	        pageNum: res.pageNum,
	        pages: res.pages,
	       })
	    },function(errMsg){
	      _mm.errorTips(errMsg)
	    })
	  },
	  // 加载分页信息
	  loadPagination:function(pageInfo){
	    let _this=this
	    this.pagination ? '' : (this.pagination = new Pagination())
	    this.pagination.render($.extend({},pageInfo,{
	      container: $('.pagination'),
	      onSelectPage:function(pageNum){
	        _this.data.listParam.pageNum =pageNum;
	        _this.loadList()

	      }
	    }))
	  }

	};
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

/***/ 32:
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

/***/ 50:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 52:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n<li class=\"p-item\">\r\n  <div class=\"p-img-con\">\r\n    <a class=\"link\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">\r\n      <img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\">\r\n    </a>\r\n  </div>\r\n  <div class=\"p-price-con\">\r\n    <span class=\"p-price\">￥{{price}}</span>\r\n  </div>\r\n  <div class=\"p-name-con\">\r\n    <a class=\"p-name\"  href=\"./detail.html?productId={{id}}\" target=\"_blank\">{{name}}</a>\r\n  </div>\r\n</li>\r\n{{/list}}";

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: s
	* @Date:   2018-09-05 15:52:15
	* @Last Modified by:   s
	* @Last Modified time: 2018-09-09 18:58:40
	*/
	__webpack_require__(54)
	let templatePagination= __webpack_require__(56)
	let _mm=__webpack_require__(23)
	let Pagination = function(){
	  let _this =this
	  this.defaultOption={
	    container: null,
	    pageNum: 1,
	    pageRange:2,
	    onSelectPage: null
	  };
	  // 事件处理
	  $(document).on('click','.pg-item',function(){
	    let $this=$(this)
	    // 对于active和disabled按钮点击不做处理
	    if($this.hasClass('active') || $this.hasClass('disabled') ){
	      return
	    }
	    typeof _this.option.onSelectPage === 'function' ?
	    _this.option.onSelectPage($this.data('value')): null
	  })
	}
	// 渲染分页组件
	Pagination.prototype.render=function(userOption){
	  // 合并选项
	  this.option =$.extend({},this.defaultOption,userOption);
	  // 判断容器是否为合法的jquery对象,因为这个对象需要到dom操作
	  if(!(this.option.container instanceof jQuery)){
	    return
	  }
	  // 如果pages小于1，那么直接返回
	  if(this.option.pages <= 1){
	    return
	  }
	  // 渲染分页内容,container是一个jq对象，就会有html属性，
	  this.option.container.html(this.getPaginationHtml())  
	}
	// 获取分页的html/ / 上一页 12 3 45 6 下一页 5/6
	Pagination.prototype.getPaginationHtml=function(){
	  let html = '',pageArray = [],
	  option =this.option,
	  start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
	  end= option.pageNum + option.pageRange <  option.pages ? option.pageNum + option.pageRange:option.pages ;
	  // 上一页按钮的数据
	  pageArray.push({
	    name: '上一页',
	    value: this.option.prePage,
	    disabled: !this.option.hasPreviousPage
	  })
	  // 数字按钮的处理
	  for(let i =start; i<=end;i++){
	    pageArray.push({
	      name: i,
	      value: i,
	      active: (i=== option.pageNum)
	    })
	  }
	  // 下一页按钮的数据
	  pageArray.push({
	    name: '下一页',
	    value: this.option.nextPage,
	    disabled: !this.option.nextPage
	  })
	  html =_mm.renderHtml(templatePagination,{
	    pageArray: pageArray,
	    pageNum: option.pageNum,
	    pages: option.pages
	  })
	  return html
	}

	module.exports=Pagination

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\">\r\n    {{#pageArray}}\r\n    {{#disabled}}\r\n        <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span>\r\n    {{/disabled}}\r\n    {{^disabled}}\r\n        {{#active}}\r\n            <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n        {{^active}}\r\n            <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n    {{/disabled}}\r\n    {{/pageArray}}\r\n    <span class=\"pg-total\">{{pageNum}} / {{pages}}</span>\r\n</div>";

/***/ })

});