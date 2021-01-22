const nodemailer = require('nodemailer'); //引入模块

//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取smtp授权码

function sendMail({ sendEmail, receiveEmail, sendPass, html }) {
    let transporter = nodemailer.createTransport({
        service: 'qq', //类型qq邮箱
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: sendEmail, // 发送方的邮箱
            pass: sendPass // smtp 的授权码
        }
    });
    return new Promise((resolve, reject) => {
        // 发送的配置项
        let mailOptions = {
            from: '"B站up主更新啦，快快快！"<1050132079@qq.com>;',
            to: receiveEmail, //接收者邮箱，多个邮箱用逗号间隔
            subject: '我自己的消息来啦！！', // 标题
            html, //页面内容
        };

        //发送函数
        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        });
    })

}
exports.sendMail = sendMail;