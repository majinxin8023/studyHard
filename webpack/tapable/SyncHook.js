/**
 * 同步钩子
 */
class SyncHook {
    constructor() {
        this.taskList = []
    }
    tap(name, task) {
        this.taskList.push(task)
    }
    call(...args) {
        this.taskList.forEach((task) => task(...args))
    }
}


let hook = new SyncHook(['name'])
hook.tap('react', function(params) {
    console.log('react', params)
})
hook.tap('node', function(params) {
    console.log('node', params)
})
hook.call('hello')