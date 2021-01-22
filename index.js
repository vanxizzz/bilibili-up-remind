const fetchLatest = require("./fetchLatest");
require("moment/locale/zh-cn");

const config = require("./config")
const initConfig = require("./initConfig")
fetchLatest({
    ...initConfig,
    ...config,
    email: {
        ...initConfig.email,
        ...config.email
    }
});