/**
 * 手写模拟原生的bind实现
 * 1.bind返回的是函数调用
 * 2.bind的参数合并问题
 * 3.函数是否被new,this指向的问题
 * 4.函数的原型链是否存在方法
 */
Function.prototype.bind = function(onThis) {
    if (typeof this != 'function') {
        throw new Error('请使用函数调用')
    }
    // 把arguments转换成数组，带入1是因为bind之后的第一个参数是this
    var args = Array.prototype.slice.call(arguments, 1);
    var fToBind = this,
    fNOP = function () {}, // 干净的函数
    // fBound将要绑定的函数
    fBound = function () {
        var _args = args.concat(Array.prototype.slice.call(arguments))
        // this instanceof fBound == true 的时候说明fBound被当做new在调用
        // apply就是在模拟原生的bind的多个参数
        return fToBind.apply(this instanceof fBound ? this : onThis, _args)
    }
    // 维护一下自己的原型链
    if (fToBind.prototype) {
        // 指向的同一个堆地址
        fNOP.prototype = fToBind.prototype
    }
    // 修正函数名 和 构造函数
    // new fNOP()就是创建一个副本， new fNOP()为了避免原型链共享
    fBound.prototype = new fNOP()
    return fBound
}


this.age = 20
function test(data, data2) {
    this.age = 30
    console.log(this.yideng)
    console.log('data', data)
    console.log(data2, 'data2')
}
test.prototype.init = function () {
    console.log('init')
}
var result = test.bind(this, 'bind参数')
var fn = new result('result参数')
console.log(fn)
fn.init()