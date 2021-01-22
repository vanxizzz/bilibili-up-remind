# bilibili-up-remind 

## 文档锚链接
##### [1. 该库用来干什么？](#oo)
##### [2. 主要文件描述](#aa)
##### [3. 配置描述](#bb)
##### [4. Installation安装](#cc)
##### [5. Usage使用方法](#dd)

## <span id=oo>1. 该库用来干什么？</span>
> 可以定时查看b站中的目标up主是否更新了，若更新了会通过发送邮箱的形式及时提醒
## <span id=aa>2. 主要文件描述</span>
- /index.js主入口文件
- /config.js主配置文件
- /initConfig.js下边配置的默认值文件
- /bilibili.json储存之前目标up主们的最新视频数据，可以在email.html中用到
## <span id=bb>3. 配置描述</span>
##### 主配置
| 参数名 | 数据类型 |  必填|默认值  |简单描述 |举例|
| :----:| :----:   | :----:  | :----: |  :----: |:----: |
| delayTime | Number|否⭕ |  60*5(五分钟) | 单位**秒**，间隔多久去抓取信息 |60*2（2分钟）|
| targetUrls | Array|是🐢 |  | up主们的主页地址列表 |["https://space.bilibili.com/517327498" , "..."]|
| safeCode | String |否🐢 | "not🎣网站！🐢" | 防止他人恶意链接的**安全码**，会附加到邮件内容里去 |我的安全码~~|
| email | Object|是🐢 |  | 配置邮箱信息（暂只支持**qq邮箱**），参考[主配置👉email配置](#jj) |

##### <span id=jj>主配置👉email配置</span>
| 参数名 | 数据类型 |  必填|默认值|简单描述 |举例|
| :----:| :----:   | :----: | :----: | :----: |  :----: |:----: |
| receiveEmail | String|是🐢  | | 接收者的邮箱(可以填sendEmail) |abc@qq.com|
| sendEmail | Array|是🐢 | |  发送者的邮箱(可以填receiveEmail) |abc@qq.com|
| sendPass | String |是🐢 ||   发送者的qq邮箱的SMTP授权码(需要自己去查询) |tahfpitbbgocnrag|
| html | Function|否🐢 |去initConfig.js看| 自定义配置输出到邮件的每个最新电影内容html模板 |参考[html配置](#kk)|

##### <span id=kk>主配置👉email👉html配置</span>
```js
{
    delayTime:xx,
    ...,
    email: {
        receiveEmail: xx,
        ...,
        html(item) {
            /* 
                author作者，bvid视频id，title视频标题，created更新的时间戳(单位秒)，time更新的时间（如：2小时前） ....
                还有很多其他属性可以去/bilibili.json文件自己摸索
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
    }
}
```

## <span id=cc>4. Installation安装</span>
```js
npm install bilibili-up-remind
或者
yarn add bilibili-up-remind
```




## <span id=dd>5. Usage使用方法</span>
##### 1.安装依赖
```js
npm install bilibili-up-remind
或者
yarn add bilibili-up-remind
```
##### 2.找到config.js文件，配置必要的属性targetUrls，email...具体可以看这：[配置描述](#bb)
##### 3.运行node程序（不能关闭程序，因为里边是一个死循环，定时去抓取数据）
```js
node ./index.js
```


