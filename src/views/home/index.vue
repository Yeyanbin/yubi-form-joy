<template>
  <h2>this is home page!</h2>
  <n-button>test</n-button>
  <n-switch>
    <template #checked>自然赠予你，树冠 微风 肩头的暴雨</template>
    <template #unchecked>片刻后生成，平衡 忠诚 不息的身体</template>
  </n-switch>
  <div>
    now Mouse index, x: {{ xRef  }}, y: {{ yRef }}
  </div>
</template>

<script setup lang="ts">
import { useMouseTrack } from "../../hooks/useMouseMove";


var construct2DArray = function(original, m, n) {
  if(original.length !== m*n) return [];
  let a = 0;
  const res = [];
  for(let i = 0 ; i<m ; ++i) {
    res[i] = [];
    for(let j = 0 ; j<n ; ++j) {
      res[i][j] = original[a];
      ++a
    }
  }
  return res;
};

/**
 * @param {string[]} nums
 * @param {string} target
 * @return {number}
 */
var numOfPairs = function(nums, target) {

  const startMap = {};
  const endMap = {};
  // find start
  // find end
  nums.forEach((element, index) => {
    if (target.startsWith(element)) {
      const start = element.length;
      if (startMap[start]) {
        startMap[start].push({ index })
      } else {
        startMap[start] = [{
          index
        }];
      }
    }

    if (target.endsWith(element)) {
      const end = target.length - element.length;
      if (endMap[end]) {
        endMap[end].push({index})
      } else {
        endMap[end] = [{index}];
      }
    }
  });

  console.log(startMap, endMap);
  let res = 0;
  const len = target.length;
  Object.keys(startMap).forEach((start) => {
    if(endMap[start]) {
      startMap[start].forEach((startItem) => {
        endMap[start].forEach((endItem) => {
          if (startItem.index !== endItem.index) {
            res+=1;
          }
        })
      })
    }
  })
  return res
};


// console.log(numOfPairs(["123","4","12","34"], '1234'));


var maxConsecutiveAnswers = function(answerKey, k) {

  if (answerKey.length === k) {
    return k;
  }

  const run = (sign) => {
    let len = answerKey.length;
    const arr = [];
    let sum = 0;

    for(let i = 0 ; i<len ; ++i) {
      if (answerKey[i] === sign) {
        ++sum;
      } else {
        arr.push(sum);
        sum = 0;
      }
    }
    if(sum > 0) {
      arr.push(sum);
      sum = 0;
    }
    let max = 0;
    // console.log(arr, sign);

    if (arr.length <= k) {
      return len;
    }

    for(let i = 0 ; i<=k ;++i) {
      sum += arr[i] - k;
    }
    max = sum;
    for(let i = k+1; i<len ; ++i) {
      sum += arr[i] - arr[i-(k+1)];

      if (sum > max) {
        max = sum;
      }
    }
    return max;
  }

  let t = run('T'), f = run('F')
  // console.log('T',t, 'F', f);
  return (t > f? t:f) + k;
};
// console.log(maxConsecutiveAnswers("FFTFTFTFFT", 6));


// dp[i][]
var waysToPartition = function(nums, k) {

  let sum = nums.reduce((a,b) => a+b), L = nums.length;
  const startSum = [sum];
  for(let i = 0, len = nums.length -1 ; i<len ; ++i) {
    sum -= nums[i];
    startSum[i+1] = sum;
  }

  console.log(startSum)

  const dfs = (preSum, index, has, sum) => {
    if (index === L-1) return 0;
    let l = 0, r = 0;
    console.log(preSum, index, startSum[index+1]);
    if ( preSum + nums[index] === startSum[index+1] ) {
      l = dfs(preSum + nums[index], index+1, has, sum+1) + 1;
    } else {
      l = dfs(preSum + nums[index], index+1, has, sum);
    }
    if (!has ) {
      // if ( preSum + k === startSum[index+1]) {
      
      const newSum = count(index);

      if (newSum >= sum) {
        console.log('NEW SUM',newSum, index, newSum+1);
        r = dfs(preSum+k, index+1, true, newSum+1) + newSum;
      }
      // console.log(newSum, index);
      // }
    }
    console.log(index, l, r)
    return Math.max(l,r);
  }

  const count = (index) => {
    let res = 0, sum = 0;
    // console.log('start count')
    for(let i = 0 ; i< index ; ++i) {
      sum += nums[i]; 
      if (sum === startSum[i+1] - nums[index] + k) {
        ++res
      }
    }
    if (sum + k === startSum[index] - nums[index] + k) {
      ++res;
    }
    return res;
  }

  return dfs(0, 0, false, 0);
};
// const { xRef, yRef } = useMouseTrack();[22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14]
// -33
// console.log(waysToPartition([22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], -33));

// console.log(waysToPartition([2,-1,2], 3));
// console.log(waysToPartition([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30827,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 0));
console.log(waysToPartition([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,0,0,0,0,-99,0]
, 0));


</script>

<style scoped>

</style>
