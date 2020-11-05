# dps(draw-page-structure)

![NPM](https://img.shields.io/npm/l/draw-page-structure)
![npm (tag)](https://img.shields.io/npm/v/draw-page-structure/latest)
[![Package Quality](https://npm.packagequality.com/shield/draw-page-structure.svg)](https://packagequality.com/#?package=draw-page-structure)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/famanoder/dps/pulls)

> a way to make skeleton screen

* **automatic**: easy to use CLI to make skeleton screen
* **flexible**: just use javascript even in browser
* **simple**: some usefull config items do it well

---

* 该方案的大概思路图

![](https://raw.githubusercontent.com/famanoder/DrawPageStructure/master/imgs/mind.png)

---
* 京东PLUS会员正式中首页效果图

![](https://raw.githubusercontent.com/famanoder/DrawPageStructure/master/imgs/ezgif.com-resize.gif)

### Before start
---
我们提供两种方法来盛放生成的骨架屏节点：

1. 配置 `output.filepath`，如果配置的是目录，会写入到该目录里的 `index.html` (没有的话我们会创建)文件里；
2. 自定义写入的方式 `writePageStructure: (outputHtml: string) => void;`；
3. 如果前面两种方式您都没有提供，那么将会在您当前目录下创建 `index.html` ，并将骨架屏节点写入；

### Install
---
```bash
npm i draw-page-structure -g
```
### Usage
---
1. `dps init` 生成配置文件 `dps.config.js`
2. 修改 `dps.config.js` 进行相关配置
3. `dps start` 开始生成骨架屏

### Examples

---

* basic

```javascript
// dps.config.js
{
  url: 'https://baidu.com',
  output: {
    filepath: '/Users/famanoder/DrawPageStructure/example/index.html',
    injectSelector: '#app'
  },
  background: '#eee',
  animation: 'opacity 1s linear infinite;',
  // ...
}
```

* 根据节点自定义生成

```javascript
// dps.config.js
...
includeElement: function(node, draw) {
  // 定制某个节点画出来的样子，带上return false
  if(node.id == 'ui-alert') {
    // 跳过该节点及其子节点
    return false;
  }
  if(node.tagName.toLowerCase() === 'img') {
    // 对该图片生成宽100%，高8%，颜色为红色的色块
    draw({
      width: 100,
      height: 8,
      left: 0,
      top: 0,
      zIndex: 99999999,
      background: 'red'
    });
    return false;
  } 
}
...
```

* 开始生成前的初始化操作

```javascript
// dps.config.js
init: function() {
  // 生成骨架屏之前的操作
  
  // 比如删除干扰节点
  let toTop = document.querySelector('#to-top');
  if(toTop) {
    toTop.parentNode.removeChild(toTop);
  }
  // 比如适当的调整某个节点的样式
  let specil = document.querySelector('.specil');
  specil.style.visibility = 'hidden';
}
```

> 对于DOM结构比较复杂和图片比较多且分布密集的情况生成的骨架屏效果可能不尽如人意，这时候可以使用 `includeElement` 定制某个节点生成生成什么样子，或者使用 `init` 在生成骨架屏之前对DOM节点进行调整，这两个函数在面对相对复杂的DOM结构时会比较有用；

* 在浏览器中运行

```javascript
const createSkeletonHTML = require('draw-page-structure/evalDOM')

createSkeletonHTML({
  // ...
  background: 'red',
  animation: 'opacity 1s linear infinite;'
}).then(skeletonHTML => {
  console.log(skeletonHTML)
}).catch(e => {
  console.error(e)
})
```

> 可在控制台输出当前页面骨架屏节点，复制添加到应用页面；该做法目前来说最大的作用在于应对需要登录的页面，可在相应页面直接调用evalDOM函数生成该页面的骨架屏节点；

### 参数说明
| 参数 | 说明 | 默认值 | 是否必填
|----- | ----- | ----- | -----
| url | 待生成骨架屏的页面地址 | -- | 是
| output.filepath | 生成的骨架屏节点写入的文件 | -- | 否
| output.injectSelector | 骨架屏节点插入的位置 | #app | 否
| header.height | 主题header的高 | -- | 否
| header.background | 主题header的背景色 | -- | 否
| background | 骨架屏主题色 | #ecf0f2 | 否
| animation | css3动画属性 | -- | 否
| rootNode | 真对某个模块生成骨架屏 | document.body | 否-已废弃
| device | 设备类型，支持mobile, ipad, pc | mobile | 否
| extraHTTPHeaders | 添加请求头 | -- | 否
| init | 开始生成之前的操作 | -- | 否
| includeElement(node, draw) | 定制某个节点如何生成 | -- | 否
| writePageStructure(html, ?filepath) | 回调的骨架屏节点 | -- | 否
