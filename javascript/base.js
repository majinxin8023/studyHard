/**
 * 如果一个函数名和变量名字相同，变量的值如何是undefined，浏览器引擎会忽略掉变量的undefined
 */
function test() {
    console.log('测试')
}
var test
console.log('test', test) // function 

// 函数体原地不动 将fn 提取出来 先定义后赋值
if (false) {
    function fn() {
        console.log('测试')
    }
}
console.log(fn()) // undefined

/**
 * 1.this -> 谁调用 this则指向谁
 * 2.若不调用，则直接指向window
 * 3.箭头函数，this绑定在父级作用域上
 */

"use strict"
this.a = 20
console.log(this.a) // 20 


// 构造函数里面要比原型链的优先级高 
// "use strict" 写在顶部

/**
 * 分三步走，按照；分割
 * let块级作用域，每一步自己管辖自己的i
 */
for(let i = (setTimeout(() => console.log('a ->', i)), 0); setTimeout(() => console.log('b ->', i)), i < 4; setTimeout(() => console.log('c ->', i)), i++) {
    i++
    // ++i
}
/**
 * 将字符串转换为数组
 */
var a = 'abcx'
console.log(Array.prototype.slice.call(a))
console.log(Array.from(a))
console.log([...a])
console.log(new Set(a))

/**
 * 混合式继承
 */
"use strict"
function Car(color) {
    this.color = color;
}
Car.age = '5';
function BWM(color) {
    Car.call(this, color);
}
// 按引用传递，子类的方法会修改掉父类的方法
// BWM.prototype = Car.prototype
// // Car的构造函数被执行了2次 call一次 new Car一次，导致资源浪费
// BWM.prototype = new Car() // BWM.constructor 指向了Car
// BWM.prototype.constructor = BWM // 做修正

// // constructor会被修改
// var __proto  = Object.create(Car.prototype)
// __proto.constructor = BWM
// BWM.prototype = __proto

// constructor锁定，别人不可修改
BWM.prototype = Object.create(Car.prototype, {
    constructor: {
        value: BWM,
        writeable: false // 
    }
})
// 取静态属性
var staticKey = Object.entries(Car)
for (var i = 0; i < staticKey.length; i++) {
    var key = staticKey[i][0]
    var value = staticKey[i][1]
    BWM[key] = value
}
console.log(BWM.age)
const bwm = new BWM()
console.log(bwm)

/**
 * 深度克隆
 */
var regex = /test/g // lastIndex
console.log(regex.test('test')) // true
console.log(regex.test('test')) // false
console.log(regex.test('test')) // true
console.log(regex.test('test')) // false
// 正则的深度克隆
function cloneReg(target, isDeep) {
    var regFlag = /w*$/;
    var result = new target.constructor(target.source, regFlag.exec(target))
    if (isDeep) {
        result.lastIndex = 0
    } else {
        result.lastIndex = target.lastIndex
    }
    return result
}
console.log(regex.test('test')) // true
console.log(cloneReg(regex, true).test('test')) // true