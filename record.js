// Array.from() 的使用
// 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
// 生成一个1-1000的数组，不使用循环、迭代器
console.log(Array.from({length: 10}, (v, i) => i))