// cats = require('./cats.js')

// require ('./index.css')
// require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/header/index.js')
let navSide=require('page/common/nav-side/index.js')

let _mm = require('util/mm.js')
navSide.init({
  name: 'user-center'
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