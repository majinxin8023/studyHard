let nowFn = null
let counter = 0
class Reaction {
    constructor() {
        this.id  = ++counter
        this.store = {} // 存储当前可观察对象对应的nowFn
    }
    start (handler) {
        nowFn = handler
    }
    collect() {
        if (nowFn) { // 判断是否有需要绑定的函数
            this.store[this.id] = this.store[this.id] || []
            this.store[this.id].push(nowFn)
        }
    }
    run() {
        if (this.store[this.id]) {
            this.store[this.id].forEach(watch => {
                watch()
            })
        }
    }
    end () {
        nowFn = null
    }
}
export default Reaction