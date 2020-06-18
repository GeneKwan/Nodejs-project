
  const express=require('express');
  const app=express();
  const bodyParser=require('body-parser')
  // const email=require('./sendMail.js')
  const path=require('path')

 
  const db=require('./src/mongo/mongoose.js')
  //连接数据库
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // extended为false表示使用querystring来解析数据，这是URL-encoded解析器
 // 开启静态目录
  app.use(express.static(path.join(__dirname,'./public')))
  // 将静态文件目录设置为：项目根目录(__dirname) + /public (绝对路径)
  // 可以通过 localhost:3000/1541141648425.jpg 直接访问到 public文件夹下的图片 
  app.use('/admin',express.static(path.join(__dirname,'./admin')))
  app.use('/src',express.static(path.join(__dirname,'./src')))

  // 静态资源文件：对于不同的用户来说，无论谁访问，内容都不会变化的文件。

  //路由
  const adminRouter=require('./src/router/admin.js') 
  const uploadRouter=require('./src/router/upload.js')
  const goodsRouter=require('./src/router/goods.js')
  const goodslistsRouter=require('./src/router/goodslists.js')
  const cartsRouter=require('./src/router/carts.js')
  const mailRegRouter=require('./src/router/mailReg.js')

  app.use('/admin',adminRouter)
  app.use('/upload',uploadRouter)
  app.use('/goods',goodsRouter)
  app.use('/goodslists',goodslistsRouter)
  app.use('/carts',cartsRouter)
  app.use('/mailReg',mailRegRouter)

app.listen(3000,()=>{
	console.log('server start in port'+3000);
})