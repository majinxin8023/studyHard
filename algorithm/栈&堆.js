  // 栈
  function Stack() {
    // 栈的属性
    this.items = [] 
    // 栈的相关操作
    Stack.prototype.push = function (element) {
        this.items.push(element)
    }
    Stack.prototype.pop = function () {
        return this.items.pop()
    }
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1 ]
    }
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    Stack.prototype.size = function () {
        return this.items.length
    }
    Stack.prototype.toString = function () {
        return this.items.join(',')
    }
}
// 转二进制
function des2bin(number) {
    var s = new Stack()
    while(number > 0) {
        s.push(number % 2)
        number = Math.floor(number / 2)
    }
    
    var binaryString = ''
    while(!s.isEmpty()) {
        console.log(s)
        binaryString += s.pop()
    }
    return binaryString
}
// console.log(des2bin(100))


// 队列
function Queue() {
    // 属性
    this.items = []
    // 方法
    Queue.prototype.enqueue = function (element) {
        this.items.push(element)
     }
    Queue.prototype.dequeue = function () {
        return this.items.shift()
    }
    Queue.prototype.front = function () {
        return this.items[0]
    }
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    Queue.prototype.size = function () {
        return this.items.length
    }
    Queue.prototype.toString = function () {
        return this.items.join(',')
    }
}


// 击鼓传花  数数字
function passGame(array, curent) {
    var queue = new Queue()
    for(var i = 0, l = array.length; i < l; i++) {
        queue.enqueue(array[i]) // 全部放入队列
    }
    while(queue.size() > 1) {
        // curent 代表当前的数字， 他之前的数字都不被淘汰
        for (var j = 0; j < curent - 1; j++) {
            queue.enqueue(queue.dequeue()) // curent之前的数据全部放在依次末尾
        }
        // console.log(queue)
        // 淘汰数到current数字的人
        queue.dequeue() 
    }
    var endName = queue.front()
    var endNameIndex = array.indexOf(endName)
    return endName + '-下标-' + endNameIndex
}
var nameList = ['Lily', 'Tom', 'Lilei', 'Lucky']
console.log(passGame(nameList, 3))