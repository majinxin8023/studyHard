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
/**
 * 实现深克隆
 * 1.采用ES6实现各种存在的情况，还可以进行添加
 */
let obj = {
    bigInt: BigInt(12312),
    set:new Set([2]),
    map:new Map([['a',22],['b',33]]),
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
         name: '我是一个对象',
         id: 1
    },
     arr: [0, 1, 2],
     func: function () {
       console.log('我是一个函数')
     },
 
     date: new Date(0),
     reg: new RegExp('/我是一个正则/ig'),
     [Symbol('1')]: 1,
 };
 Object.defineProperty(obj, 'innumerable', {
   enumerable: false,
    value: '不可枚举属性'
 });
 obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
 obj.loop = obj
 let cloneObj = deepClone(obj);
 console.log('obj', obj);
 console.log('cloneObj', cloneObj);
 for (let key of Object.keys(cloneObj)) {
     if (typeof cloneObj[key] === 'object' || typeof cloneObj[key] === 'function') {
         console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
    }
 }