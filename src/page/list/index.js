require('page/common/nav/index.js')
require('page/common/header/index.js')
let _product=require('service/product-service.js')
require('./index.css')
let _mm = require('util/mm.js')
let templateIndex =require('./index.string')
let Pagination =require('util/pagination/index.js')
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
    this.pagination? '' : (this.pagination = new Pagination())
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