
// 冒泡排序
function bubbleort(nums) {
  if (!Array.isArray(nums)) {
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
  if (!Array.isArray(nums)) {
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
  if (!Array.isArray(nums)) {
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
  if (!Array.isArray(nums)) {
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

// 快速排序
function quickSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }

  // 递归排序基数左右两边的序列
  function recursive(array, left, right) {
    if (left > right) {
      return;
    }
    let index = partition(array, left, right);
    recursive(array, left, index - 1);
    recursive(array, index + 1, right);
    return array;
  }
  // 将小于基数的数放到基数左边，大于基数的数放到基数右边，并返回基数的位置
  function partition(array, left, right) {
    // 取第一个数为基数
    let temp = array[left];
    while (left < right) {
      while (left < right && array[right] >= temp) {
        right--;
        array[left] = array[right];
      }
      while (left < right && array[left] < temp) {
        left++;
        array[right] = array[left];
      }
    }
    // 修改基数的位置
    array[left] = temp;
    return left;
  }
  recursive(nums, 0, nums.length - 1);
}
console.log(quickSort1([3 ,2, 10, 1, 7, 3]))
function quickSort1(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  function recursive(array, left, right) {
    if (left >= right) {
      return;
    }
    let index = partation(array, left, right);
    recursive(array, left, index - 1);
    recursive(array, index + 1, right);
    return array;
  }
  function partation(array, left, right) {
    let temp = array[left];
    let p = left + 1;
    let q = right;
    while (p <= q) {
      while (p <= q && array[p] < temp) {
        p++;
      } 
      while (p <= q && array[p] > temp) {
        q--;
      } 
      if (p <= q) {
        [array[p], array[q]] = [array[q], array[p]];
        // 交换值后两边各向中间推进一位
        p++;
        q--;
      }
    } 
    // 修改基数的位置
    [array[left], array[q]] = [array[q], array[left]];
    return q;
  }
  recursive(nums, 0, nums.length - 1);
}

// 归并排序
console.log(333, mergeSort[22, 3, 12, 1])
function mergeSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  // 有序合并两个数组
  function merge(l1, r1, l2, r2) {
    let array = [];
    let index = 0;
    let i = l1, j = l2;
    while (i <= r1 && j <= r2) {
      array[index++] = nums[i] < nums[j] ? nums[i++] : nums[j++];
    }
    while (i <= r1) {
      array[index++] = nums[i++];
    }
    while (j <= r2) {
      array[index++] = nums[j++];
    }
    // 将有序合并后的数组修改回原数组
    for(let t = 0; t < index; t++) {
      nums[l1 + t] = array[t];
    }
  }
  // 递归将数组分为两个序列
  function recursive(left, right) {
    if (left >= right) {
      return;
    }
    // 比起(left+right)/2，更推荐下面这种写法，可以避免数溢出
    let mid = parseInt((right - left) / 2) + left;
    recursive(left, mid);
    recursive(mid + 1, right);
    merge(left, mid, mid + 1, right);
    return nums;
  }
  recursive(0, nums.length - 1);
}