 const webpack =require('webpack')
 const extractTextPlugin= require('extract-text-webpack-plugin')
 const htmlWebpackPlugin= require('html-webpack-plugin')
 // 环境变量配置，dev / online
 let WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
 let getHtmlConfig = function(name,title) {
   return {
      template: './src/view/'+name+'.html',
      filename: 'view/'+name+'.html',
      title: title,
      inject: true,
      hash: true,
      // 需要哪个index.js 上面entry有几个，只要common和index
      chunks : ['common',name]
    }
 }
 let config={
  entry:{
    // 公共样式
    common: './src/page/common/index',
    index: './src/page/index/index',
    list: './src/page/list/index',
    'user-login': './src/page/user-login/index',
    'user-register': './src/page/user-register/index',
    'user-pass-reset': './src/page/user-pass-reset/index',
    'user-center': './src/page/user-center/index',
    'user-center-update': './src/page/user-center-update/index',
    'user-pass-update': './src/page/user-pass-update/index',
    result: './src/page/result/index',
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
      test: /\.string$/, // 使用extract分离css
      loader: 'html-loader'
    },    
    { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
    ]
  }
  ,
  resolve: {
    alias : {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname+ '/src/image',
      node_modules    : __dirname + '/node_modules',
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // 把公共样式加载到每个页面
      name: 'common',
      filename: 'js/base.js'
    }),
    // 分离css
    new extractTextPlugin("css/[name].css"),
    // html模板的处理
    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
    new htmlWebpackPlugin(getHtmlConfig('list','商品列表')),
    new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new htmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new htmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new htmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new htmlWebpackPlugin(getHtmlConfig('user-center-update','更新信息')),
    new htmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
  ]
}
module.exports=config