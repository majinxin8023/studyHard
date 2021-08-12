/**
 * AOP 面向切面编程
 * 埋点、乱插等
 */

function test() {
    console.log(2)
    return 'test'
}

Function.prototype.before = function (fn) {
    // before 先执行回调， 在执行本身
    var _self = this;
    return function () {
        fn.apply(_self, arguments)
        return _self.apply(_self, arguments)
    }
}


Function.prototype.after = function (fn) {
    // after 先执行本身this 在去执行回调
    var _self = this;
    return function () {
        var result = _self.apply(_self, arguments)
        console.log(result)
        fn.apply(_self, arguments)
        return result
    }
}

test.after(function () {
    console.log(3)
}).before(function() {
    console.log(1)
})()

// 1 2 test 3