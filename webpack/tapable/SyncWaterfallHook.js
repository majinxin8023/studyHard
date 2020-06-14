/**
 * 第一个tap完事之后的返回值 下一个tap可以拿到上一个的返回值
 */
class SyncWaterfallHook {
    constructor() {
        this.taskList = []
    }
    tap(name, task) {
        this.taskList.push(task)
    }
    call(...args) {
        let [ firstCb, ...others ] = this.taskList
        let ret = firstCb(...args)
        others.reduce((name, cb) => {
            return cb(name)
        }, ret)
    }
}


let hook = new SyncWaterfallHook(['name'])
hook.tap('react', function(params) {
    console.log('react', params)
    return 'react'
})
hook.tap('node', function(params) {
    console.log('node', params)
    return 'node'
})
hook.tap('webpack', function(params) {
    console.log('webpack', params)
})
hook.call('hello')