const fsPromise = require("fs").promises;
const initConfig = {
    autoCreate: true,//文件不存在是否自动创建
    autoCreateContent: "[]",//自动创建的内容
    fileUrl: ""
}

module.exports = async (config = {}) => {
    let { autoCreate, autoCreateContent, fileUrl } = {
        ...initConfig,
        ...config
    }
    try {
        return await fsPromise.readFile(fileUrl);
    } catch (error) {
        /* 不存在该文件 */
        if (!autoCreate) {
            throw new Error(`${fileUrl}该文件不存在`);
        }
        /* 允许自动创建 */
        await fsPromise.writeFile(fileUrl, autoCreateContent);
        return autoCreateContent;
    }

}