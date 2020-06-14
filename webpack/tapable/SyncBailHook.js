/**
 * 只要有一个监听函数 返回了非undefined的值， 那就会停止执行
 */
class SyncBailHook {
    constructor() {
        this.taskList = []
    }
    tap(name, task) {
        this.taskList.push(task)
    }
    call(...args) {
        let ret = '' // tap的返回值
        let index = 0 // 默认取第一个数组
        do{
            ret = this.taskList[index++](...args)
        }while( ret === undefined && this.taskList.length >= index)
    }
}


let hook = new SyncBailHook(['name'])
hook.tap('react', function(params) {
    console.log('react', params)
    return 'stop'
})
hook.tap('node', function(params) {
    console.log('node', params)
})
hook.call('hello')