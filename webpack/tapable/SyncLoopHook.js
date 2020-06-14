/**
 * 遇到某个tap不返回undefined会反复执行
 */
class SyncLoopHook {
    constructor() {
        this.taskList = []
    }
    tap(name, task) {
        this.taskList.push(task)
    }
    call(...args) {
        let ret;
        this.taskList.forEach((task) => {
            do{
                ret = task(...args)
            }while(ret !== undefined)
        })
    }
}


let hook = new SyncLoopHook(['name'])
let num = 0
hook.tap('react', function(params) {
    console.log('react', params)
    return ++num === 3 ? undefined : '哈哈哈哈'
})
hook.tap('node', function(params) {
    console.log('node', params)
})
hook.call('hello')