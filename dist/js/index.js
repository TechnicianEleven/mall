webpackJsonp([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// cats = require('./cats.js')

	// require ('./index.css')
	// require('page/common/nav-simple/index.js')
	__webpack_require__(20)
	__webpack_require__(29)
	let navSide=__webpack_require__(34)
	__webpack_require__(38)
	__webpack_require__(40)
	let _mm = __webpack_require__(23)
	let templateBanner =__webpack_require__(44)
	$(function(){
	  let bannerHtml = _mm.renderHtml(templateBanner)
	  $('.banner-con').html(bannerHtml)
	  navSide.init({
	  name: 'user-center'
	})
	 let $slider= $('.banner').unslider({
	    dots: true
	  })
	 // 前一张后一张操作事件
	 $('.banner-con .banner-arrow').click(function(){
	  let forward = $(this).hasClass('prev')? 'prev': 'next'
	    // console.log( $slider.data('unslider'))
	    $slider.data('unslider')[forward]();
	 })

	})
	// let html= '<div>{{data}}</div>'
	// let data ={
	//   data: 123
	// }

	// console.log(_mm.renderHtml(html,data))
	// _mm.request({
	//   url: 'product/list.do?keyword=1',
	//   success: function(res){
	//     console.log(res)
	//   },
	//   error: function(errMsg){
	//     console.log(errMsg)

	//   }
	// })
	// console.log(_mm.getUrlParam('test'))
	// console.log(cats)
	// $('body').html('jquery')

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
/* 18 */,
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
/* 32 */,
/* 33 */,
/* 34 */
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
/* 35 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */,
/* 37 */
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\r\n</li>\r\n{{/navList}} \r\n";

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-26 18:19:14
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-26 18:20:00
	*/

	'use strict';

	__webpack_require__(41);
	__webpack_require__(43);

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports) {

	window.console&&console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),function(t,s){if(!t)return s;var i=function(){this.el=s,this.items=s,this.sizes=[],this.max=[0,0],this.current=0,this.interval=s,this.opts={speed:500,delay:3e3,complete:s,keys:!s,dots:s,fluid:s};var i=this;this.init=function(s,i){return this.el=s,this.ul=s.children("ul"),this.max=[s.outerWidth(),s.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=t.extend(this.opts,i),this.setup(),this},this.calculate=function(s){var e=t(this),n=e.outerWidth(),h=e.outerHeight();i.sizes[s]=[n,h],n>i.max[0]&&(i.max[0]=n),h>i.max[1]&&(i.max[1]=h)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==s&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&t(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var e=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};e(),t(window).resize(e)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function(){t.isFunction(i[this.className])&&i[this.className]()}),t.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(s,e){this.items.eq(s).length||(s=0),0>s&&(s=this.items.length-1);var n=this.items.eq(s),h={height:n.outerHeight()},o=e?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+s+")").addClass("active").siblings().removeClass("active"),this.el.animate(h,o)&&this.ul.animate(t.extend({left:"-"+s+"00%"},h),o,function(){i.current=s,t.isFunction(i.opts.complete)&&!e&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(s){var e=s.which,n={37:i.prev,39:i.next,27:i.stop};t.isFunction(n[e])&&n[e]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var s='<ol class="dots">';t.each(this.items,function(t){s+='<li class="dot'+(1>t?" active":"")+'">'+(t+1)+"</li>"}),s+="</ol>",this.el.addClass("has-dots").append(s).find(".dot").click(function(){i.move(t(this).index())})}};t.fn.unslider=function(s){var e=this.length;return this.each(function(n){var h=t(this),o=(new i).init(h,s);h.data("unslider"+(e>1?"-"+(n+1):""),o)})}}(window.jQuery,!1);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"banner\">\r\n  <ul>\r\n    <li>\r\n      <a href=\"./list.html?categoryId=\"10021\" target=\"_blank\">\r\n        <!-- 使用相对路劲引入图片 -->\r\n        <img src=\"" + __webpack_require__(45) + "\">\r\n      </a>\r\n    </li>\r\n    <li>\r\n      <a href=\"./list.html?categoryId=\"10030\" target=\"_blank\">\r\n        <!-- 使用相对路劲引入图片 -->\r\n        <img src=\"" + __webpack_require__(46) + "\">\r\n      </a>\r\n    </li>\r\n    <li>\r\n      <a href=\"./list.html?categoryId=\"10016\" target=\"_blank\">\r\n        <!-- 使用相对路劲引入图片 -->\r\n        <img src=\"" + __webpack_require__(47) + "\">\r\n      </a>\r\n    </li>\r\n    <li>\r\n      <a href=\"./list.html?categoryId=\"10001\" target=\"_blank\">\r\n        <!-- 使用相对路劲引入图片 -->\r\n        <img src=\"" + __webpack_require__(48) + "\">\r\n      </a>\r\n    </li>\r\n    <li>\r\n      <a href=\"./list.html?categoryId=\"10021\" target=\"_blank\">\r\n        <!-- 使用相对路劲引入图片 -->\r\n        <img src=\"" + __webpack_require__(49) + "\">\r\n      </a>\r\n    </li>\r\n\r\n  </ul>\r\n  <div class=\"banner-arrow prev\">\r\n    <i class=\"fa fa-angle-left\"></i>\r\n  </div>\r\n  <div class=\"banner-arrow next\">\r\n    <i class=\"fa fa-angle-right\"></i>\r\n  </div>\r\n</div>";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })
]);