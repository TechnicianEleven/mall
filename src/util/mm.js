const config = {
  serverHost: ''
}
let Hogan = require('hogan.js');
let _mm = {
  request: function (param) {
    let _this = this
    $.ajax({
      type   : param.method || 'get',
      url    : param.url || '',
      dataType: param.type || 'json',
      data   : param.data  || '',
      success : function(res) {
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data,res.msg)
        }else if (10=== res.status){
          // 需要登录
          _this.doLogin()
        }else if (1 === res.status) {
          // 请求的参数错误
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error    : function (err) {
          typeof param.error === 'function' && param.error(err.statusText)
      }

    })
  },
  getServerUrl: function(path){
     return config.serverHost + path
  },

  // getServerUrl：function (path) {
  //   return config.serverHost + path
  // },
  // 获取url中的参数
  getUrlParam: function (name) {
    // 比如说  http.happymall.com?keyword =1
     let reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)')
     console.log(reg)
     let result = window.location.search.substr(1).match(reg)
     // console.log(window.location.search.substr(1))
     return result? decodeURIComponent(result[2])  : ''

  },
  // 渲染html模板
  renderHtml :function(htmlTeplate, data){
    let template = Hogan.compile(htmlTeplate),
    result = template.render(data);
    return result
  },
  // 成功提示
  successTiops: function(msg) {
    alert(msg || '操作成功' )
  },
  // 错误提示
  errorTip: function(msg) {
   alert(msg || '哪里不对了')
  },
  // 字段验证
  validate: function(value, type) {

     let value =$.trim(value)
     if ('require' === type) {
          // 支持非空判断
        return !!value
     }
     // 手机号验证
     if ('phone' === type) {
        return /^1[3|5|8]\d{9}$/.test(value)
     }
    // 邮箱格式验证
    if('email' === type){
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  // 统一登录处理
  doLogin : function() {
    // 防止url的字符截断，使用encode编码
    window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href)
  },
  // 跳回主页
  goHome: function () {
    window.location.href = './index.html'
  }

}
module.exports = _mm