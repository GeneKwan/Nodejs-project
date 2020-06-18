//邮箱验证码的注册
//手机验证码
//a 获取验证码
// 1.接受用户发送邮箱
// 2.生成验证码 
// 3.将验证码 和邮箱保存在缓存里
// 4.将验证码发送邮箱
// 5. 通知用户验证码发送ok‘
// 6. 5分钟超时
//b 注册
  // 1.获取用户输入的信息
  // 2.验证验证码是否ok
  // 3.插入文件系统数据库
  // 4.通知用户注册ok
const express=require('express');
const Router=express.Router();
  const email=require('./sendmail.js')

//数据模型引入
const User=require('../mongo/model/user.js') 


  // console.log(email)

  let check={}
  //获取验证码
  Router.post("/getCode",(req,res)=>{
  	// console.log(req.body)
  	let mail=req.body.mail
	if (!mail) {return res.send('参数错误！')}
  	let code=parseInt(Math.random(0,1)*1000000)
  	check[mail]=code
  	//发送邮件是异步操作
  	 email.sendMail(mail,code,(state)=>{
  	  	    if (state) {
  	  	    	res.send('验证码发送失败！')
  	  	    }else{
  	  	       res.send('验证码发送成功！')
  	  	    }
  	  		
  	  })

  })

 // 验证码注册
Router.post("/reg",(req,res)=>{
   let {mail,password,code}=req.body
   console.log({mail,password,code})
   console.log(check[mail])
   if (check[mail]==code) {
       User.insertMany({mail,password})
 .then((data)=>{
  res.send('插入成功！')
 })
 .catch((err)=>{

  console.log(err)
    res.send('插入失败！')
 })
   }else{
   	  res.send('验证码错误！')
   }

 })

  // 判断账户是否已注册，即查询数据库中有无此账户
Router.post('/findMail',(req,res)=>{
  
  let mails=req.body.mail
  console.log(mails)
  User.find({mail: mails})
  .then((data)=>{
    if(data[0].mail=mails){
      res.send('该邮箱已被注册！')
    }else{
      res.send('该邮箱可以注册！')
    }
  })
  .catch((err)=>{
    // console.log(err)
    res.send('该邮箱可以注册！')
  })

})


 // 登录
 Router.post('/login',(req,res)=>{
  
  let {mail,password}=req.body
  console.log(req.body)
  User.find({mail: mail,password: password})
  .then((data)=>{
    if(data[0].length != {}){
      console.log(data)
      res.send('1')
    }else{
      res.send('0')
    }
  })
  .catch((err)=>{
    // console.log(err)
    res.send('0')
  })

})


module.exports=Router;



