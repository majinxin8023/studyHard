/**
 * 链表操作
 * head: {
 *    data: 'adc',
 *    next: {
 *       data: 'egf',
 *       next: null
 *    }
 * }
 */
function LinkedList () {
    function Node(data) {
        this.data = data
        this.next = null
    }
    this.head = null
    this.length = 0
    // 链表追加元素
    LinkedList.prototype.append = function(element) {
        var newNode = new Node(element)
        if (this.head === null) { // 第一个节点
            this.head = newNode
        } else {
            var current = this.head
            while(current.next) { 
                current = current.next // 找到最后一个节点
            }
            current.next = newNode
        }
        this.length += 1
    }
    // toString
    LinkedList.prototype.toString = function () {
        var current = this.head
        let resultString = ''
        while(current) {
            resultString += current.data + '-'
            current = current.next
        }
        return resultString
    }
    // insert 添加
    LinkedList.prototype.insert = function (element, position) {
        // 不能为负数, 对position不能越界,若等于则是尾部追加
        if (position < 0 || position > this.length) return false
        var newNode = new Node(element)
        if (position === 0) { // 表示放在第一位
            newNode.next = this.head
            this.head = newNode
        } else {
            var index = 0
            var current = this.head // 当前的节点
            var previous = null // 前一个节点
            while(index++ < position) {
                previous = current // 更新前一个指向
                current = current.next // 更新当前的node
            }
            newNode.next = current
            previous.next = newNode
        }
        this.length += 1
        return true
    }
    // 获取对应位置的元素
    LinkedList.prototype.get = function(position) {
        // 边界判断
        if (position < 0 || position >= this.length) return null
        var index = 0
        var current = this.head
        while( index++ < position) {
            current = current.next // 更新current
        }
        return current.data
    }
    // indexOf 返回对应的索引
    LinkedList.prototype.indexOf = function (data) {
        var current = this.head
        var index = 0
        while(current) {
            if (current.data === data) {
                return index
            }
            index += 1
            current = current.next
        }
        return -1 // 找不到
    }
    // update
    LinkedList.prototype.update = function (newData, position) {
        if (position < 0 || position >= this.length) return false
        var current = this.head
        var index = 0
        while( index++ < position) {
            current = current.next // 更新current
        }
        current.data = newData
        return true
    }
    // 删除特定位置的元素
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return false
        var current = this.head
        if (position === 0) { // 是否是第一个
            this.head = this.head.next
        } else {
            var index = 0
            var previous = null
            while (index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length -= 1
        return true
    }
    // 删除某个数据
    LinkedList.prototype.remove = function (data) {
        return this.removeAt(this.indexOf(data))
    }
}

var list = new LinkedList()
list.append('abc')
list.append('def')
list.insert('ghi', 0) 
list.insert('kls', 3)
list.get(3)
list.indexOf('abc')
list.update('update', 0) 
console.log(list)