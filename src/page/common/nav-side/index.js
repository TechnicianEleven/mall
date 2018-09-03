require('./index.css')
let _mm =require('util/mm.js')
let templateIndex =require('./index.string')
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