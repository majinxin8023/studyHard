/**
 * promise
 * 1.三个状态，不可逆
 * 2.要么成功，要么失败
 * 3.promise 有多个状态，如果成功，则依次执行成功
 * 4.如果失败，则依次执行失败
 */
const PEDDING = 'pedding'
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
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
        if (this.status === SUCCESS) {
            onFulfilled(this.value)
        } 
        if (this.status === FAIL) {
            onRejected(this.reason)
        }
        if (this.status === PEDDING) { // pedding状态保存未返回的结果
            this.onFulfilledCallback.push(() => {
                this.onFulfilledCallback(this.value)
            })
            this.onRejectedCallback.push(() => {
                this.onRejectedCallback(this.reason)
            })
        }
    }
}

let p = new Promise((resolve, reject) => {
    // throw new Error('出错了')
    resolve('成功')
    reject('失败')
})
p.then((res) => {
    console.log('res✅', res)
}, (err) => {
    console.log('err❌', err)
})
p.then((res) => {
    console.log('res✅', res)
}, (err) => {
    console.log('err❌', err)
})