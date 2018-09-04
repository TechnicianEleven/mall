require('page/common/nav/index.js')
require('page/common/header/index.js')
let _product=require('service/product-service.js')
require('./index.css')
let _mm = require('util/mm.js')
let templateIndex =require('./index.string')
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

  },
  loadList: function(){
    let _this=this
    let listHtml = ''
    let listParam = this.data.listParam
    _product.getProductList(listParam,function(res){
       listHtml=_mm.renderHtml(templateIndex,{
        list : res.list
       })
       $('.p-list-con').html(listHtml)
       _this.loadPagination(res.pageNum,res.pages)
    },function(errMsg){
      _mm.errorTips(errMsg)
    })
  },
  // 加载分页信息
  loadPagination:function(pageNum,pages){
  
  }

};
$(function(){
  page.init()
})