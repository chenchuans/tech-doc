const debug = require('debug')('static:config');
const path = require('path');

const config = {
    host: 'localhost', // 监听的主机
    port: 8080, // 监听的端口
    root: path.resolve(__dirname, '..', 'public') // 配置静态文件根目录
};
module.exports = config;