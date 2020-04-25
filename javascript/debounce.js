/**
 * 防抖
 * 在n秒中函数只能执行一次，在n秒时间段中重新触发了函数，则会重新开始计算函数的执行时间
 */

let btn = document.createElement('button')
btn.innerHTML = '点击'
document.body.appendChild(btn)
btn.addEventListener('click', debounce(logger, 1000, { leading: true, trailing: true }))

function logger() {
    console.log('logger')
}
// function debounce(callback, time, inmediate = true) {
//     let timeout
//     let fn = function () {
//         clearTimeout(timeout)
//         if (inmediate) {
//             let flag = !timeout
//             flag ? callback.apply(this, arguments) : ''
//         }
//         timeout = setTimeout(() => {
//             callback.apply(this, arguments)
//             timeout = null
//         }, time)
//     }
//     return fn
// }   

// 先开启一个定时器，只要一只点击，到时间什么都不做，就在开一个定时器
function debounce(callback, wait, options) {
    // leading第一次点击要触发 ， trailing最后一次也要触发
    let { leading, trailing } = options 
    let lastCallTime // 最后调用的时间
    let lastThis // 返回函数的this
    let lastArgs // 返回函数的参数
    let timeout
    // 是否应该调用
    let shouldInvoke = function (time) {
        // 第一次 lastCallTime === undefined
        return lastCallTime === undefined || time - lastCallTime > wait
    }
    // 是否第一次执行
    let leadingEdge = function (time) {
        if (leading)  invokeFn(time)
        startTimer(timerExpire, wait) // 第一次触发过一秒在执行开启定时器
    }
    // 就是开启了定时器
    let startTimer = function (timerExpire, wait) {
        timeout = setTimeout( timerExpire, wait)
    }
    let timerExpire = function() {
        let now = Date.now() // 当前定时器时间到了，看看是否需要执行这个函数
        if (shouldInvoke(now)) { // 需要调用函数
            return trailingEdge(now) // 触发结束的方法
        }
        startTimer(timerExpire, wait - (now - lastCallTime))
    }
    let trailingEdge = function (time) {
        timeout = undefined
        if (trailing) invokeFn(time)
    }
    // 方法执行
    let invokeFn = function () {
        callback.apply(lastThis, lastArgs)
    }
    let debounced = function(...args) {
        lastThis = this
        lastArgs = args
        let now = Date.now()
        // 判断当前的debounced是否需要执行
        let isInvokeing = shouldInvoke(now)
        lastCallTime = now
        if (isInvokeing) {
            if (timeout === undefined) {
                leadingEdge(now)
            }
        }
    }
    return debounced
}
