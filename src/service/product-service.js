let _mm=require('util/mm.js')
let _product ={
  // 获取商品列表
  getProductList:function(listParam,resolve,reject){
    _mm.request({
      url: _mm.getServerUrl('/product/list.do'),
      data: listParam,
      method: 'POST',
      success: resolve,
      error: reject
    })

  },
  
}
module.exports=_product