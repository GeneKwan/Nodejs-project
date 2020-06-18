//数据库的连接
 const mongoose = require('mongoose'); 

 mongoose.connect('mongodb://127.0.0.1:27017/gene',{ useNewUrlParser: true });
 // 要加数据库的名字
 let db = mongoose.connection;
 // 实例化连接对象
 db.on("error", function (error) {
     console.log("Database connection failure：" + error);
 });

 db.on("open", function () {
     console.log("数据库连接成功");
 })

 db.on('disconnected', function () {
     console.log('数据库连接断开');
 })