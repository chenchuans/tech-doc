
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

// 桶排序
function bucketSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  // 桶的个数，只要是正数即可
  let num = 5;
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  // 计算每个桶存放的数值范围，至少为1，
  let range = Math.ceil((max - min) / num) || 1;
  // 创建二维数组，第一维表示第几个桶，第二维表示该桶里存放的数
  let array = Array.from(Array(num)).map(() => Array().fill(0));
  nums.forEach(val => {
    // 计算元素应该分布在哪个桶
    let index = parseInt((val - min) / range);
    // 防止index越界，例如当[5,1,1,2,0,0]时index会出现5
    index = index >= num ? num - 1 : index;
    let temp = array[index];
    // 防止index越界，例如当[5,1,1,2,0,0]时index会出现5
    let j = temp.length - 1;
    while (j > 0 && val < temp[j]) {
      temp[j + 1] = temp[j];
      j--;
    }
    temp[j + 1] = val;
  });
  // 修改回原数组
  let res = [].concat.apply([], array);
  nums.forEach((val, i) => {
    nums[i] = res[i];
  });
}

// 基数排序
function radixSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  // 计算位数
  function getDigits(n) {
    let sum = 0;
    while (n) {
      sum++;
      n = parseInt(n / 10);
    }
    return sum;
  }
  // 第一维表示位数即0-9，第二维表示里面存放的值
  let array = Array.from(Array(10).map(() => Array()));
  let max = Math.max(...nums);
  let maxDigits = getDigits(max);
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    // 用0把每一个数都填充成相同的位数
    nums[i] = (nums[i] + '').padStart(maxDigits, 0);
    // 先根据个位数把每一个数放到相应的桶里
    let temp = nums[i][nums[i].length - 1];
    array[temp].push(nums[i]);
  }
  // 循环判断每个位数
  for (let i = maxDigits - 2; i >= 0; i--) {
    // 循环每一个桶
    for (let j = 0; j <= 9; j++) {
      let temp = array[j];
      let len = temp.length;
      // 根据当前的位数i把桶里的数放到相应的桶里
      while (len--) {
        let str = temp[0];
        temp.shift();
        array[str[i].push(str)];
      }
    }
  }
  // 修改回原数组
  let res = [].concat.apply([], array);
  nums.forEach((val, index) => {
    nums[index] = +res[index];
  });
}

// 计数排序
function countingSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  let array = [];
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  // 装桶
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let temp = nums[i];
    array[temp] = array[temp] + 1 || 1;
  }
  let index = 0;
  // 还原原数组
  for (let i = 0; i <= max; i++) {
    while (array[i] > 0) {
      nums[index++] = i;
      array[i]--;
    }
  }
}
// 计数排序2
function countingSort2(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  let array = [];
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  // 加上最小值的相反数来缩小数组范围
  let add = -min;
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let temp = nums[i];
    temp += add;
    array[temp] = array[temp] + 1 || 1;
  }
  let index = 0;
  for (let i = min; i <= max; i++) {
    let temp = array[i + add];
    while (temp > 0) {
      nums[index++] = i;
      temp--;
    }
  }
}

// 堆排序
function heapSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  // 调整最大堆，使index的值大于左右节点
  function adjustHeap(nums, index, size) {
    // 交换后可能会破坏堆结构，需要循环使得每一个父节点都大于左右结点
    while (true) {
      let max = index;
      let left = index * 2 + 1; // 左节点
      let right = index * 2 + 2; // 右节点
      if (left < size && nums[max] < nums[left]) {
        max = left;
      }
      if (right < size && nums[max] < nums[right]) {
        max = right;
      }
      // 如果左右结点大于当前的结点则交换，并再循环一遍判断交换后的左右结点位置是否破坏了堆结构（比左右结点小了）
      if (index !==  max) {
        [nums[index], nums[max]] = [nums[max], nums[index]];
        index = max;
      }
      else {
        break;
      }
    }
  }
  // 建立最大堆
  function buildHeap(nums) {
    if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
    // 注意这里的头节点是从0开始的，所以最后一个非叶子结点是 parseInt(nums.length/2)-1
    let start = parseInt(nums.length / 2) - 1;
    let size = nums.length;
    // 从最后一个非叶子结点开始调整，直至堆顶。
    for (let i = start; i >= 0; i--) {
      adjustHeap(nums, i, size);
    }
  }

  buildHeap(nums);
  // 循环n-1次，每次循环后交换堆顶元素和堆底元素并重新调整堆结构
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    [nums[i], nums[0]] = [nums[0], nums[i]];
    adjustHeap(nums, 0, i);
  }
}

// 希尔排序
function shellSort(nums) {
  if (!Array.isArray(nums)) {
    return new TypeError('not a array');
  }
  if (nums.length < 2) {
    return nums;
  }
  let len = nums.length;
  // 初始步数
  let gap = parseInt(len / 2);
  // 逐渐缩小步数
  while (gap) {
    // 从第gap个元素开始遍历
    for (let i = gap; i < len; i++) {
      // 逐步其和前面其他的组成员进行比较和交换
      for (let j = i - gap; j >= 0; j++) {
        if (nums[j] > nums[j + gap]) {
          [nums[j], nums[j + gap]] = [nums[j + gap], nums[j]];
        } 
        else {
          break;
        }
      }
    }
    gap = parseInt(gap / 2);
  }
}