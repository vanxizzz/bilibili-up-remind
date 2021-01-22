const moment  = require("moment")
module.exports = {
    targetUrls: [//up主们的主页
        "https://space.bilibili.com/517327498",
        "https://space.bilibili.com/10119428?from=search&seid=5012720997961462621",
        "https://space.bilibili.com/391679",
        "https://space.bilibili.com/546195?spm_id_from=333.788.b_765f7570696e666f.1"
    ],
    email: {//邮箱配置，暂且只支持qq邮箱
        // receiveEmail: "abc@qq.com",//⭐必填，接收者的邮箱，可以和发送者邮箱一致
        // sendEmail: "abc@qq.com",//⭐必填，发送者的邮箱
        // sendPass: "tgocnrahfpitbbag",//⭐必填，发送者邮箱的授权码，需要去找下
        html(item) {//配置邮箱内容模板
            /* 
                author作者，bvid视频id，title视频标题，time更新的时间
            */
            const { author, bvid, title, created } = item;
            const time = moment(created * 1000).fromNow();
            return `
                <div>
                    <h1>
                        UP主：<span style="color:#008c8c;">${author}</span>
                    </h1>
                    <h2>最新视频：<a href='https://www.bilibili.com/video/${bvid}'>${title}(点击打开)</a></h2>
                    <h2>更新时间：<span style="color:#f40;">${time}</span></h2>
                    <h2 style="word-break: break-all;">链接：https://www.bilibili.com/video/${bvid}</h2>
                    <hr />
                </div>
            `
        }
    },

}