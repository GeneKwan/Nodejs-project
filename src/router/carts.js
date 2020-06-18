const express=require('express');
const Router=express.Router();
//数据模型引入
const Carts=require('../mongo/model/carts.js') 
//增加商品
//添加商品信息

/**  
 * @api {post} /carts/addCarts/ addCarts
 * @apiName addCarts
 * @apiGroup carts
 *
 * @apiParam {String} name  商品名称
 * @apiParam {String} type 商品类型
 * @apiParam {String} desc 商品描述
 * @apiParam {String} price 商品价格
 * @apiParam {String} imgpath 图片地址
 * @apiParam {Number} stock 商品余额
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
Router.post('/addCarts',resourceOrigin, (req, res) => {

    let { id, name, type, desc, imgpath, price, hot, time } = req.body
    // {id:'1', name:'翠鸟', type:'分类名称', desc:'翠鸟属（学名：Alcedo）的鸟类，属中型水鸟。', imgpath:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3888135046,4041525941&fm=26&gp=0.jpg', price:'125', hot:'999', time:'2018-11-09 20:23:54'}
    console.log(req.body)
    Carts.insertMany({ id, name, type, desc, imgpath, price, hot, time })
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
  Carts.find()   
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
  
     Carts.find({$or:[{type:{$regex:word}},{name:{$regex:word}}]})
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

  Carts.find({id:id})   
  .then((data)=>{
  	res.send({err:0,msg:'查询成功！',data:data})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误！',data:null})
  })

})

module.exports=Router;