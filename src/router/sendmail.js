
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user:'2403460125@qq.com', // 发送方的邮箱
        pass: 'jpjropmbxfcydigb' // smtp 的授权码
    }
});


function sendMail(mail,code,call){
    // 发送的配置项
    let mailOptions = {
        from: '"GeneKwan 👻" <2403460125@qq.com>', // 发送方
        to: mail, // 接收方
        subject: '欢迎注册！', // 标题
        text: 'Hello world', // 文本内容
        html: `<h3>【后台管理系统】验证码为: ${code} （请勿随意将验证码告知他人），请在页面中输入完成验证，验证码1个小时内有效。</h3>`//页面内容
    };

   //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
       call(-1)
    }
     call(0)//因为是异步 所有需要回调函数通知成功结果

    });

}

module.exports={sendMail}
