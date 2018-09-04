require('./index.css')
let _mm = require('util/mm.js')
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