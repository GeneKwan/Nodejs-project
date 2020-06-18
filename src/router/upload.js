//图片上传
//1.传给后端，后端接受
//2.将文件放到服务器目录下 通过文件的读取与写入
//3.将生成的路径放到数据库
//4.传给前端 服务器路径
const express=require('express');
const multer=require('multer') //解析图片的插件
 const fs=require('fs')
 const path=require('path')
const Router=express.Router();

var upload = multer({ dest: 'uploads/' }) //文件在服务器保存的临时路径
//数据模型引入
Router.post('/img',upload.single('test'),(req,res)=>{ //保存图片的formdata 对象的key值
	// console.log(req.file)
    fs.readFile(req.file.path,(err,data)=>{
    	if (err) { return res.send('上传失败！')}
    	//为了保障图片不被覆盖 采用 时间戳+随机方式生成文件名
        let name=new Date().getTime()+parseInt(Math.random(0,1)*10000)+path.extname(req.file.originalname);
        console.log(name)
    	fs.writeFile(path.join(__dirname,'../../public/img/'+name), data, (err)=>{
    		//保存数据库的应该是  相对的图片路径
    		if (err) {console.log(err)}
    		res.send({err:0,msg:'上传成功！',data:'/img/'+name})
    	});

    });

})
module.exports=Router;