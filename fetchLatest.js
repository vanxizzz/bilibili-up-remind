const axios = require("axios");
const delay = require("./delay")
const fsPromise = require("fs").promises;
const path = require("path")

const myReadFile = require("./myReadFile")
const { sendMail } = require('./sendMail.js'); //引入封装好的函数
/* 初始化配置 */
const initConfig = {
    delayTime: 60 * 5,
    recordJsonUrl: path.resolve(__dirname, "./bilibili.json"),
    targetUrls: [],
    emai: {},
    safeCode: '没问题，可以安全打开下边链接'
}
function parseUrl(urls) {
    const res = [];
    urls.forEach(it => {
        let userId = path.parse(it).base.replace(/\?.*/, "");
        let request = `https://api.bilibili.com/x/space/arc/search?mid=${userId}&pn=1&ps=25&index=1&jsonp=jsonp`
        res.push(request);
    })
    return res;
}

module.exports = async (config = {}) => {
    let { delayTime, recordFileUrl, targetUrls, email: { receiveEmail, sendEmail, sendPass, html }, safeCode } = {
        ...initConfig,
        ...config,
    }
    if (!sendPass) {
        throw "请传递sendPass参数"
    }
    const requestUrls = parseUrl(targetUrls);
    while (1) {
        console.log("开始查询")
        try {
            let proAll = requestUrls.map(it => {
                return axios.get(it);
            })
            let [logData, ...responses] = await Promise.all([myReadFile({
                autoCreate: true,//文件不存在是否自动创建
                autoCreateContent: "[]",//自动创建的内容
                fileUrl: recordFileUrl
            }), ...proAll]);
            let vlists = responses.map(it => it.data.data.list.vlist);
            vlists = vlists.map(it => it[0]);//映射成最新的一个
            logData = logData.toString();
            if (!logData) {
                logData = "[]";
            }
            logData = JSON.parse(logData);
            logData = vlists.map(item => {
                let target = logData.find(it => it.mid == item.mid);
                if (target && target.created == item.created) {
                    /* 无须更新，直接返回 */
                    return {
                        needRefresh: false,
                        data: item
                    };
                }
                /* 走到这，说明需要更新 */
                return {
                    needRefresh: true,
                    data: item
                };
            })
            let newRecord = logData.map(it => it.data);
            /* 修改记录 */
            await fsPromise.writeFile(recordFileUrl, JSON.stringify(newRecord));
            if (logData.filter(it => it.needRefresh).length > 0) {
                /* 发送邮件 */
                let myHtml = `
                    <h1>安全码：<span style="color:#f40;">${safeCode}</span>，请确认是不是你配置的安全码，防止钓鱼网站</h1>
                `;
                logData.filter(it => it.needRefresh).forEach(({ data: item }) => {
                    myHtml += html(item);
                })
                await sendMail({ receiveEmail, sendEmail, sendPass, html: myHtml });
                console.log('发送过去了')
            }
        } catch (error) {
            console.log("错误")
            console.log("" + error)
        }
        await delay(delayTime);
    }
}