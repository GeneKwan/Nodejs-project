//数据库的连接
 const mongoose = require('mongoose');

 mongoose.connect('mongodb://127.0.0.1:27017/demo',{ useNewUrlParser: true });
 // 要加数据库的名字
 let  db = mongoose.connection;
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

 //创建schema 对象（理解为创建表结构）

 
//获得schema 对象
// 实例化schema 对象 schemaobj=new Schema（{option}）
//option  字段名
 let Schema = mongoose.Schema;
 let userSchema=new Schema({
 	_id:{type:Number,required:true},
 	name:{type:String,required:true},
 	pass:{type:String,required:true}
 })
 // 将schema 对象转化为数据模型  model
 //var Blog = mongoose.model('Blog', blogSchema);
 //var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
 let user=mongoose.model('child',userSchema);
 //mongoose 默认集合名都是复数

 // console.log(user)
//  user.insertMany({_id:3,name:'网易',pass:'童谣300曲',age:'26'})
//  .then((data)=>{
//  	console.log(data)
//  })
// .catch((err)=>{
// 	console.log(err)
// })

//mongoose 用法和mongod 类似  直接返回promise 对象   查询函数 看api文档

