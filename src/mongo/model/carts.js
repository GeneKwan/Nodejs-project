//创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema; 
let cartsSchema=new Schema({
  
    id:{type:String,required:true},
    name:{type:String,required:true},
    type:{type:String,required:true},
    desc:{type:String,required:true},
    imgpath:{type:String,required:true},
    price:{type:String,required:true},
    hot:{type:String,required:true},
    time:{type:String,required:true}

})
// 将schema 对象转化为数据模型  model
let carts=mongoose.model('carts',cartsSchema);

module.exports=carts
//抛出数据模型