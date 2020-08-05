const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

console.log(process.cwd()); // current working directory 当前工作目录
// 用于实现压缩 transform转换流，继承于duplex双攻流
function gzip(src) {
    fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(src + '.gz'));
}
// __dirname找到当前路径下 name.txt是示例文件名称
// gzip(path.join(__dirname, 'name.txt'));

// basename 从一个路径中得到文件名，包括扩展名，可以传一个扩展名字符参数，去掉扩展名
//extname 是获取扩展名
function gunzip(src) {
    // 解压
    fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))));
}
gunzip(path.join(__dirname, 'name.txt.gz'));