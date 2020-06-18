const express=require('express');
const Router=express.Router();
//数据模型引入
const User=require('../mongo/model/user.js')
/**
 * @api {get} /admin/login/ login
 * @apiName login
 * @apiGroup admin
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

Router.post('/getUserInfo',(req,res)=>{
     User.find()
     .then((data)=>{
     	res.send(data)
     })
	 .catch((err)=>{
	 	console.log(err);
	 	res.send('失败')
	 })
})

//api接口  1. 接受数据 2.处理数据  3.返回结构
module.exports=Router;