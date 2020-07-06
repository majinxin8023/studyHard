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
        if (nums.includes(surplusNum) && nums.indexOf(surplusNum) !== -1) {
            return [nums.indexOf(surplusNum), i]
        }
    }
}

const nums = [1,2,34,67,22,11]
console.log(twoSum(nums, 68))