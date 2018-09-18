/*
* @Author: s
* @Date:   2018-09-05 15:52:15
* @Last Modified by:   s
* @Last Modified time: 2018-09-05 18:10:21
*/
require('./index.css')
let templatePagination= require('./index.string')
let _mm=require('util/mm.js')
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