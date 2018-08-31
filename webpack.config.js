 const webpack =require('webpack')
 const extractTextPlugin= require('extract-text-webpack-plugin')
 const htmlWebpackPlugin= require('html-webpack-plugin')
 // 环境变量配置，dev / online
 let WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
 let getHtmlConfig = function(name) {
   return {
      template: './src/view/'+name+'.html',
      filename: 'view/'+name+'.html',
      inject: true,
      hash: true,
      // 需要哪个index.js 上面entry有几个，只要common和index
      chunks : ['common',name]
    }
 }
 let config={
  entry:{
    // 公共样式
    common: ['./src/page/common/index','webpack-dev-server/client?http://localhost:8088'],
    index: './src/page/index/index',
    login: './src/page/login/index',
  },
  output: {
    path: './dist',
    publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
    {
      test: /\.css$/, // 使用extract分离css
      loader: extractTextPlugin.extract('style-loader','css-loader')
    },    
    {
      test: /\.(gif|png|jpg)\??.*$/, // 图片有些 是带参数的图片所以得修改正则
      loader: 'url-loader?limit=100&name=resource/[name].[ext]'
    }
    ]
  }
  ,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // 把公共样式加载到每个页面
      name: 'common',
      filename: 'js/base.js'
    }),
    // 分离css
    new extractTextPlugin("css/[name].css"),
    // html模板的处理
    new htmlWebpackPlugin(getHtmlConfig('index')),
    new htmlWebpackPlugin(getHtmlConfig('login'))
  ]
}
module.exports=config