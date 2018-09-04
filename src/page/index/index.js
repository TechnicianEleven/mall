// cats = require('./cats.js')

// require ('./index.css')
// require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/header/index.js')
let navSide=require('page/common/nav-side/index.js')
require("./index.css")
require("util/slider/index.js")
let _mm = require('util/mm.js')
let templateBanner =require('./index.string')
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