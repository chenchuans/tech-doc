const {exec} = require('child_process');
// 开启子进程
exec('node a.js', function(err, stdout) {
    console.log(stdout);
});