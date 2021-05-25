function DoublyLinkedList() {
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }
    this.head = null
    this.tail = null
    this.length = 0
    DoublyLinkedList.prototype.append = function (data) {
        var newNode = new Node(data)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            var current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = newNode
            newNode.prev = current
        }
        this.length += 1
        return true
    }
    DoublyLinkedList.prototype.insert = function (position, data) {
        if (position < 0 || position > this.length) return false
        var newNode = new Node(data)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            if (position === 0) { // 最前面添加数据
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position === this.length) {
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                var current  = this.head
                var index = 0
                while(index++ < position) { // 找位置 
                    current = current.next
                }
                // 修改指针
                newNode.prev = current.prev // 新节点的prev
                newNode.next = current // 新节点的next
                current.prev.next = newNode // 当前节点的前节点的next
                current.prev = newNode // 当前节点的前节点
            }
            this.length += 1
            return true
        }
    }
    DoublyLinkedList.prototype.get = function (position) {
        // 边界判断
        if (position < 0 || position >= this.length) return null
        var index = 0 
        var current = this.head
        while( index++ < position) {
            current = current.next // 更新current
        }
        return current.data
    }
    DoublyLinkedList.prototype.indexOf = function (position) {
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
    DoublyLinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position >= this.length) return false
        var index = 0 
        var current = this.head
        while( index++ < position) {
            current = current.next // 更新current
        }
        current.data = newData
        return current
    }
    DoublyLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return null
        var current  = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            if (position === 0) { // 第一个节点
                this.head.next.prev = null
                this.head = this.head.next
            } else if (position === this.length - 1) { // 最后1个节点
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                var index = 0
                while(index++ < position) {
                    current = current.next
                }
                current.prev.next = current.next
                current.next.prve = current.prev
            }
        }
        this.length -= 1
        return 
    }
    DoublyLinkedList.prototype.remove = function (data) {
        return this.removeAt(this.indexOf(data))
    }
}


var list = new DoublyLinkedList()
list.append('aaaa')
list.insert(1, 'bbb')
list.insert(2, 'ccc')
console.log(list.get(1))
list.update(0, 'wwww')
list.removeAt(0)
console.log(list) 