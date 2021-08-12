/**\
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 */
// 解题一
function twoSum(nums, target) {
    const recordObj = {} // 空对象 存放遍历过的数字以及索引
    for (let i = 0, l = nums.length; i < l; i++) { // 循环此数组
        const curNum = nums[i] // 拿取当前项
        const surplusNum = target - curNum // 目标值于当前值的相差
        const targetNumIndex = recordObj[surplusNum] // 看之前缓存的是否存在
        if (targetNumIndex !== undefined) { // 看值之前是否存在
            return [targetNumIndex, i]
        }
        recordObj[curNum] = i // 往缓存对象存放当前的值以及索引
    }
}
// 解题二
// 数组的api
function twoSum(nums, target) {
    for (let i = 0, l = nums.length; i < l; i++) {
        let surplusNum = target - nums[i]
        // includes 是否包含 indexOf查到返回下标 查不到-1
        if ( nums.indexOf(surplusNum) !== -1) {
            return [nums.indexOf(surplusNum), i]
        }
    }
}

const nums = [1,2,34,67,22,11]
console.log(twoSum(nums, 68))


/**
 * 整数反转
 * 123 -> 321
 */
function reverse(x) {
    if (x === 0) return 0
    let x2 = x < 0 ? Math.abs(x) : x // 负数取绝对值
    let res = 0
    while(x2) {
        res = res * 10 + x2 % 10 // 拿取个位数
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) return 0 // 边界
        x2 = Math.floor(x2 / 10) // 缩减x2
    }
    if (x < 0)  return ~res + 1
    return  res * 1
}
console.log(reverse(123))


/**
 * 回文数
 * 121 true  -121 false
 */
function isPalindrome(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false // 能被10整除或者负数直接false
    let res = 0 // 结果做反转
    while(x > res) {
        res = res * 10 + x % 10
        x = Math.floor(x / 10)
    }
    return x === res || x === Math.floor(res / 10)
}

/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * nums = [1,3,5,6], target = 5  -> 2
 * nums = [1,3,5,6], target = 7  -> 4
 */

function searchInsert(nums, target) {
    for (let i = 0, l = nums.length; i < l; i++) {
        if (nums[i] === target || nums[i] > target) { // 找到合适的位置
            return i
        }
    }
    return nums.length // 最末尾
};
console.log(searchInsert([1,3,5,6], 7))


/**
 * 
 * 最大子序和
 * nums = [-2,1,-3,4,-1,2,1,-5,4] ->  [4,-1,2,1] 的和最大，为 6 
 */
function maxSubArray(nums) {
    let pre = 0; maxVal = nums[0]
    nums.forEach(ele => {
        pre = Math.max(pre + ele, ele) // 前一个数+当前数 和 当前数 取最大
        maxVal = Math.max(pre, maxVal) // 算中循环中的最大值
    })
    return maxVal
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))