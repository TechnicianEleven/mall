/*
* @Author: s
* @Date:   2018-09-06 11:35:33
* @Last Modified by:   s
* @Last Modified time: 2018-09-07 22:05:25
*/
require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
let _product=require('service/product-service.js')
let _mm = require('util/mm.js')
let _cart = require('service/cart-service.js')
let templateIndex =require('./index.string')
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