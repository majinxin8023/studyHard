// 数组的缺陷
/**
 * 数组进行插入操作，后面的数据依次往后排，效率低
 * 数组进行查找操作，基于索引查找效率高，基于内容查找效率低
 * 数组进行删除，效率也低
 */
/**
 * 哈希表是基于数组进行实现。
 * 优点：
 * 1.提供快速增删改查
 * 2.无论数据量，O(1)的时间级
 * 缺点：
 * 1.数据没有顺序
 * 2.key不可以重复
 */
/**
 * 哈希方式实现： 
 * 1. 数字相加 - 不唯一
 * 2. 幂的连乘 - 数字过大，导致空间浪费
 * 哈希化： 将大数字转换成数组范围内的下标
 * 哈希函数：把单词转成大数字，大数字进行哈希化 压缩到数组范围之内
 * 哈希表： 姜数据插入到这个数组，对整个结构进行封装
 */ 

// 冲突： 重复
// 链地址法 / 开放地址法（寻找空白的单元格）


// 哈希表类
function hashTable() {
    // 属性
    this.srtoage = []
    this.count = 0
    this.limit = 7 // 质数
    // 方法
    // 判断某个数字是否是质数
    hashTable.prototype.isPrime = function (num) {
        let temp = parseInt(Math.sqrt(num)) // 开平方
        for(let i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    // 获取质数
    hashTable.prototype.getPrime = function (num) {
        console.log(this.isPrime(num))
        while(!this.isPrime(num)) { // 不是质数  一直累加1
            num++
        }
        return num
    }
    // 哈希函数
    hashTable.prototype.hashfunc = function(str, size) {
        var hashCode = 0
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode % size 
    }
    // 插入修改
    hashTable.prototype.put = function (key, value) {
        // 1.根据key获取相应的下标
        var index = this.hashfunc(key, this.limit)
        // 2. 根据index取出相应的bucket
        var bucket = this.srtoage[index]
        // 判断是否为空的数据
        if (bucket == null) {
            bucket = []
            this.srtoage[index] = bucket
        }
        // 判断是否为修改数据
        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }
        // 添加数据
        bucket.push([key, value])
        this.count += 1
        // 临界值 进行扩容
        if (this.count > this.limit * 0.75) {
            var newPrime = this.getPrime(this.limit * 2)
            this.resize(newPrime)
        }
    }
    // 获取元素
    hashTable.prototype.get = function (key) {
        // 1.根据key获取相应的下标
        var index = this.hashfunc(key, this.limit)
        // 2. 根据index取出相应的bucket
        var bucket = this.srtoage[index]
        if (bucket == null ) return null
        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                return tuple[1]
            }
        }
        return null
    }
    // 删除操作 
    hashTable.prototype.remove = function(key) {
        // 1.根据key获取相应的下标
        var index = this.hashfunc(key, this.limit)
        // 2. 根据index取出相应的bucket
        var bucket = this.srtoage[index]
        if (bucket == null ) return null
        for (let i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--
                // 缩容 最小的limit == 7
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    var newPrime = this.getPrime(Math.floor(this.limit / 2)) // 获取质数
                    this.resize(newPrime) 
                }
                return tuple[1]
            }
        }
        return null
    }
    // 扩容 - 原先的内容全部重新更新一次 保证index的唯一
    hashTable.prototype.resize = function (newLimit) {
        var oldStroage = this.srtoage
        // 重置属性
        this.srtoage = []
        this.count = 0
        this.limit = newLimit
        for(let i = 0; i < oldStroage.length; i++) {
            var bucket = oldStroage[i]
            if (bucket == null) {
                continue
            }
            for (let j = 0; j < bucket.length; j++) {
                var tuple = bucket[i]
                this.put(tuple[0], tuple[1])
            }
        }
    }
}

var hashTabel = new hashTable()
hashTabel.put('abc', '‘123')
hashTabel.put('nba', '哈登')
hashTabel.put('cba', '姚明')
hashTabel.put('abc', '詹姆斯')
console.log(hashTabel.get('abc'))
console.log(hashTabel.get('cba'))
hashTabel.remove('cba')
console.log(hashTabel)
console.log(hashTabel.getPrime(12))