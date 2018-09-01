/*
* @Author: s
* @Date:   2018-09-01 18:27:41
* @Last Modified by:   s
* @Last Modified time: 2018-09-01 18:46:18
*/
require('page/common/nav-simple/index.js')
require('./index.css')
let _mm=require('util/mm.js')
$(function(){
  let type = _mm.getUrlParam('type') || 'default',
  // 根据type参数来修改show的显示
  $element=$('.'+type+'-success').show()
})