const moment = require("moment")
module.exports = {
    targetUrls: [//up主们的主页
        "https://space.bilibili.com/517327498",
        "https://space.bilibili.com/10119428?from=search&seid=5012720997961462621",
        "https://space.bilibili.com/391679",
        "https://space.bilibili.com/546195?spm_id_from=333.788.b_765f7570696e666f.1"
    ],
    email: {//邮箱配置，暂且只支持qq邮箱
        receiveEmail: "abc@qq.com",//⭐必填，接收者的邮箱，可以和发送者邮箱一致
        sendEmail: "abc@qq.com",//⭐必填，发送者的邮箱
        sendPass: "tgocnrahfpitbbag",//⭐必填，发送者邮箱的授权码，需要去找下
    },

}