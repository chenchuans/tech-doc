// 创建服务器
const config = require('./config');
const http = require('http');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');
const {promisify, inspect} = require('util');
const handlebars = require('handlebars');
const stat = promisify(fs.stat);
// 代码内部可以读写环境变量
console.log(process.env);

// 编译模板，得到一个渲染的方法，然后传入实际数据就可以得到渲染后的HTML了
function list() {
    const tmpl = fs.readFileSync(patg.resolve(__dirname, 'template', 'list.html'), 'utf8');
    return handlebars.compile(tmpl);
}

// 每个实例都有一个名字，第一部分是项目名，第二部分是模块名
const debug = require('debug')('app.js');
class Server {
    constructor(argv) {
        this.list = list();
        this.config = Object.assign({}, this.config, argv);
    }
    start() {
        const server = http.createServer();
        const {port, host} = this.config;
        server.on('request', this.request.bind(this));
        server.listen(port, () => {
            debug(`server started at ${chalk.green('http://' + host + ':' + port)}`)
        });
    }
    async request(req, res) {
        const {pathname} = url.parse(req.url);
        if (pathname === '/favicon.ico') return this.sendError(req, res);
        const filepath = path.join(this.config.root, pathname);
        try {
            const statObj = await stat(filepath);
            if (statObj.isDirectory()) {
                // 如果是目录应显示目录下面的文件列表
                let files = await readdir(filepath);
                files = files.map(item => ({
                    name: item,
                    url: path.join(pathname, file)
                }));
                // 给list.html添加数据
                let html = this.list({
                    title: pathname,
                    files
                });
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            } else {
                this.sendFile(req, res, filepath, statObj);
            }
        } catch (error) {
            debug(inspect(e)); // inspect把一个对象转为字符
            this.sendError(req, res);
        }
    }
    sendFile(req, res, filepath, statObj) {
        res.setHeader('Content-Type', mime.getType(filepath)); // 通过拿到文件类型设置
        fs.createReadStream(filepath).pipe(res);
    }
    senError(req, res) {
        res.statusCode = 500;
        res.end(`there is something wrong in the server! please try later!`);
    }
}


// const server = new Server();
// server.start(); // 启动服务

module.exports = Server;
