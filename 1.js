let arr = [];
for (let index = 0; index <100; index++) {
  arr.push(index);
}
arr.sort((a, b) => {
  return 0.5 - Math.random();
});
console.log(arr);