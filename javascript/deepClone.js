/**
 * 实现深克隆
 * 1.采用Object.prototype.toString来判断
 * 2.循环遍历对象的每一项
 * 3.再次是复杂类型的进行递归
 */
function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments ')
    }
    let toStr = Object.prototype.toString
    let arrStr = '[object Array]'
    let target = (toStr.call(source) === arrStr ? [] : {})
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) { // 查询自身是否存在属性
            if (source[keys] && typeof source[keys] == 'object' ) {
                if (toStr.call(source[keys]) == arrStr) {
                    target[keys] = []
                } else {
                    target[keys] = {}
                }
                target[keys] = deepClone(source[keys]) // 递归
            } else {
                target[keys] = source[keys]
            }
        }
    }
    return target
}
var obj = ['1', 2, 'c', ['sds', 'vv'], [{a: '1', b: '2'}]]
let cloneObj = deepClone(obj)
console.log(obj == cloneObj)