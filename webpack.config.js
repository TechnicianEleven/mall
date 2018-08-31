 let config={
  entry:{
    index: './src/page/index/index',
    login: './src/page/login/index',
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }
}
module.exports=config