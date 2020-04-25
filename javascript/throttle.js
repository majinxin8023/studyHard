/**
 * 节流
 * 连续触发事件，只是在n秒钟执行一次函数
 */
let btn = document.createElement('button')
btn.innerHTML = '点击'
document.body.appendChild(btn)
// trailing true -> 用户输入完最后一次的时候在执行一次
// leading false -> 延迟第一次点击是不生效的
btn.addEventListener('click', throttle(logger, 1000, { trailing: true, leading: true, maxWait: 1000 }))

function logger() {
    console.log('logger')
}

// function throttle(callback, time, options) {
//     let args, context, timeout, previous = 0
//     let later = function () { // 延迟之后 最后一次要执行
//         previous = options.leading === false ? 0 : Date.now()
//         callback.apply(context, args)
//         args = context = null
//     }
//     let fn = function () {
//         args = arguments
//         context = this
//         let now = Date.now()
//         if (!previous && options.leading === false) previous = Date.now()
//         let remaning = time - (now - previous)
//         if (remaning <= 0) { // 表示是第一次点击
//             if (timeout) {
//                 clearTimeout(timeout)
//                 timeout = null
//             }
//             callback.apply(context, args)
//             previous = now
//         } else if (!timeout &&  options.trailing !== false) {
//             timeout = setTimeout(later, time)
//         }
//     }
//     return fn
// }   



function throttle(callback, wait, options) {
    // leading第一次点击要触发 ， trailing最后一次也要触发
    let maxWait // 最大的等待时间
    if ('maxWait' in options) {
        maxWait = options.maxWait
    } 
    let { leading, trailing } = options
    let lastCallTime // 最后调用的时间
    let lastThis // 返回函数的this
    let lastArgs // 返回函数的参数
    let timeout // 定时器
    let lastInvokeTime // 最终的调用时间
    // 是否应该调用
    let shouldInvoke = function (time) {
        // 第一次 lastCallTime === undefined
        // 当前时间-上一次的时间 time - lastCallTime > wait 说明时间到了。
        // 当前时间 - 上一次调用的时间 now - lastInvokeTime > maxWait
        return lastCallTime === undefined || time - lastCallTime > wait || time - lastInvokeTime >= maxWait
    }
    // 是否第一次执行
    let leadingEdge = function (time) {
        lastInvokeTime = time
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
    let invokeFn = function (time) {
        lastInvokeTime = time
        callback.apply(lastThis, lastArgs)
    }
    let throttled = function(...args) {
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
    return throttled
}