
// 冒泡排序
function bubbleort(nums) {
  if (Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }

  let len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    // 如果一轮比较中没有需要交换的数据，则说明数组已经有序。主要是对[5,1,2,3,4]之类的数组进行优化
    let mark = true;
    for (let j = 0; j < len - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        mark = false;
      }
    }
    if (mark) return;
  }
}

function bubbleSort_twoWays(nums) {
  if (Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }

  let low = 0;
  let high = nums.length - 1;
  while(low < high) {
    let mark = true;
    // 找到最大值放到右边
    for(let i = low; i < high; i++) {
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        mark = false;
      }
    }
    high--;
    // 找到最小值放到左边
    for(let j = high; j > low; j--) {
      if (nums[j] < nums[j - 1]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
        mark = false;
      }
    }
    low++;
    if(mark) return;
  }
}

// 选择排序
function selectSort(nums) {
  if (Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }

  let len = nums.length;
  for(let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }
}


// 插入排序

function insertSort(nums) {
  if (Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }

  let len = nums.length;
  for(let i = 0; i < len; i++) {
    let temp = nums[i];
    let j = i;
    while(j >= 0 && temp < nums[j - 1]) {
      nums[j] = nums[j - 1];
      j--;
    }
    nums[j] = temp;
  }
}