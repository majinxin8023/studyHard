/**
 * promise
 * 1.三个状态，不可逆
 * 2.要么成功，要么失败
 * 3.promise 有多个状态，如果成功，则依次执行成功
 * 4.如果失败，则依次执行失败
 * 5.promise的链式调用 靠的不是返回this，则是返回了一个新的promise
 * 6.考虑存在死循环的情况，promise返回值还是自己
 * 7.考虑promise有n种实现，要兼容别人的promise
 * 8.有可能resolve方法又是一个promise, 拿promise的值,递归调用
 * 9.值穿透的问题
 */

const PEDDING = 'pedding'
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
function resolvePromise(newPromise, result, resolve, reject) {
    if (newPromise === result) { // 解决问题6
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }
    let called
    if (typeof result === 'function' || (typeof result === 'object' && result != null )) {
        try{
            let then = result.then
            if (typeof then === 'function') { // { then: null }
                // 不要使用result.then 否则会再次取值 defineProperties的get方法假设报错
                then.call(result, (success) => {
                    if (called) return // 1）
                    called = true
                    // resolve有可能又是一个priomse 递归调用让他成为常量返回
                    resolvePromise(newPromise, success, resolve, reject) 
                }, (err) => {
                    if (called) return // 2）
                    called = true
                    reject(err)
                }) 
            } else {
                resolve(result)
            }
        }catch(e) {
            if (called) return // 3） 为了让这个promise不可调用多次， 要么成功 要么失败
            called = true
            reject(e)
        }
    } else {    // result则为常量
        resolve(result)
    }
}

class Promise {
    constructor(executor) {
        this.status = PEDDING // 默认等待态
        this.value = undefined // 成功的值
        this.reason = undefined // 失败的值
        this.onFulfilledCallback = []
        this.onRejectedCallback = []
        let resolve = (value) => { // 成功
            if (this.status === PEDDING) {
                this.value = value
                this.status = SUCCESS
                this.onFulfilledCallback.forEach(fn => fn()) // 保存的执行
            }
        }
        let reject = (reason) => { // 失败
            if (this.status === PEDDING) {
                this.reason = reason
                this.status = FAIL
                this.onRejectedCallback.forEach(fn => fn()) // 保存的执行
            }
        }
        try { // 在promise 里自己抛错 要到err
            executor(resolve, reject) 
        }catch(e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        typeof onFulfilled  === 'function' ? onFulfilled : val => val
        typeof onRejected === 'function' ? onRejected : err => { throw err }
        let newPromise
        // 可以不停的调用then方法，返回了一个新的promise
        newPromise = new Promise((resolve, reject) => {
            if (this.status === SUCCESS) {
                setTimeout(() => { // 指newPromise就拿到了结果
                    try {
                        let result = onFulfilled(this.value)
                        resolvePromise(newPromise, result, resolve, reject) 
                    }catch(e) {
                        reject(e)
                    }
                })
            } 
            if (this.status === FAIL) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.reason)
                        resolvePromise(newPromise, result, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                })
            }
            if (this.status === PEDDING) { // pedding状态保存未返回的结果
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try{
                            let result = onFulfilled(this.value)
                            resolvePromise(newPromise, result, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try{
                            let result = onRejected(this.reason)
                            resolvePromise(newPromise, result, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return newPromise
    }
}

// function read() {
//     return new Promise((resolve, reject) => {
//         resolve(3)
//         // reject(1)
//     })
// }
// let p = read().then((res) => {
//     console.log('res✅----', res)
//     throw new Error('错误')
// },(e) => {
//     console.log(e)
//     throw 'err❌'
// })
// p.then(data=>  {
//     console.log('data', data)
//     return 1000
// }, (err) => {
//     console.log('err', err)
// })


/**
 * 问题5
 * promise的链式调用，靠的不是返回this，下面例子第一次返回失败 第二次成功，足以证明。
 */
// let p = new Promise((resolve, reject) => {
//     throw new Error() // 抛错走到catch
// }).catch(err => {
//     return 'err❌' // promise已经是失败态，把返回的值再给了下次的then
// }).then(data => { // then是返回了一个新的promise
//     console.log(data) // data == 'err❌
// })

/**
 * 问题6
 */
// let promise = new Promise((resolve, reject) => {
//     resolve()
// })

// 运行成功，newPromise拿到的是第二个then的结果
// let newPromise = promise.then(() => {
//     return newPromise 
// }).then(() => {
    
// })

// 返回了自己，promsie只有调用resolve/reject拿到值，永远等不到，判断类型错误
// let newPromise = promise.then(() => {
//     return newPromise 
// })
// // TypeError: Chaining cycle detected for promise #<Promise>
// newPromise.then(() => {
//     console.log('success')
// }, (e) => {
//     console.log('err', e)
// })


/**
 * 问题7
 */
// let promise = new Promise((resolve, reject) => {
//     resolve(1)
// })
// let newPromise = promise.then((data) => {
//     // 此处测试引用原生的promise, 在一个文件没改名
//     return new Promise((resolve, reject) => { 
//         resolve('✅')
//     })
// })
// newPromise.then((data) => {
//     console.log(data, 'data')
// }, (err) => {
//     console.log('err', err)
// })

/**
 * 问题9
 */
// let promise = new Promise((resolve, reject) => {
//     // resolve(100)
//     reject('❌')
// })
// // throw err 这样写是为了避免then的错误结果给到了下次then的结果
// promise.then(val => val, err => {
//     throw err
// }).then(val => val, err => {
//     throw err
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log(err)
// })