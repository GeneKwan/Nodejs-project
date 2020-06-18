const express = require('express');
const Router = express.Router();
//数据模型引入
const Goodslists=require('../mongo/model/goodslists.js')

// 添加商品数据
/**  
 * @api {post} /goodslists/addGoodslists/ addGoodslists
 * @apiName addGoodslists
 * @apiGroup goodslists
 *
 * @apiParam {String} id  商品id
 * @apiParam {String} name  商品名称
 * @apiParam {String} type 商品类型
 * @apiParam {String} desc 商品描述
 * @apiParam {String} price 商品价格
 * @apiParam {String} imgpath 图片地址
 * @apiParam {Number} hot 人气销量
 * @apiParam {String} time 添加时间
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */


function resourceOrigin(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");        // 允许请求*
    next();
}

// 添加数据到数据库

Router.post('/addGoodslists',resourceOrigin, (req, res) => {

    let { id, name, type, desc, imgpath, price, hot, time } = req.body
    console.log(req.body)
    Goodslists.insertMany({ id, name, type, desc, imgpath, price, hot, time })
        .then((data) => {
            res.send({ err: 0, msg: '插入成功！', data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ err: -1, msg: '插入失败！', data: null })
        })

})

// 获取数据

Router.get('/gets',resourceOrigin,(req,res)=>{
	// 获取全部数据
  Goodslists.find()   
  .then((data)=>{
  	res.send({err:0,msg:'查询成功！',data:data})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误！',data:null})
  })

})


// 模糊查询 关键字查询

Router.post('/findGoodslist',(req,res)=>{

    let word=req.body.word;
  
     Goods.find({$or:[{type:{$regex:word}},{name:{$regex:word}}]})
    .then((data)=>{
        res.send({err:0,msg:'成功！',data:data})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:'失败！',data:null})
    })

  })


  // 获取特定 id 的数据

Router.post('/findById',resourceOrigin,(req,res)=>{
    
  let id=req.body.id;
//   console.log(req.body.id);

  Goodslists.find({id:id})   
  .then((data)=>{
  	res.send({err:0,msg:'查询成功！',data:data})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误！',data:null})
  })

})


module.exports=Router;