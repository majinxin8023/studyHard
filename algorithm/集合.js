/**
 * 集合
 * 1. 无序的 - 表明不可以通过下标进行取值
 * 2. 不允许重复 - 相同的只存在一个
 */

function Set() {
    // 属性
    this.items = {}
    // 方法
    Set.prototype.add = function (value) {
        if (this.has(value))  return false
        this.items[value] = value
        return true
    }
    Set.prototype.remove = function (value) {
        if (!this.has(value))  return false
        delete this.items[value]
        return true
    }
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value)
    }
    Set.prototype.clear = function () {
        this.items = {}
    }
    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }
    Set.prototype.values = function () {
        return Object.keys(this.items)
    }

    /**
     * 集合间的操作
     */
    // 并集 - x元素存在于A中 或 x元素存在于B中
    Set.prototype.union = function (otherSet) {
        var unionSet = new Set()
        var values = this.values()
        for (let i = 0, l = values.length; i < l; i++) {
            unionSet.add(values[i])
        }
        values = otherSet.values()
        for (let j = 0, l = values.length; j < l; j++) {
            unionSet.add(values[j])
        }
        return unionSet
    }
    // 交集 - x元素存在于A中 且 x元素存在于B中
    Set.prototype.intersection = function (otherSet) {
        var intersectionSet = new Set()
        var values = this.values()
        for (let i = 0, l = values.length; i < l; i++) {
            if (otherSet.has(values[i]))
            intersectionSet.add(values[i])
        }
        return intersectionSet
    }
    // 差集
    Set.prototype.difference = function (otherSet) {
        var differenceSet = new Set()
        var values = this.values()
        for (let i = 0, l = values.length; i < l; i++) {
            if (!otherSet.has(values[i]))
            differenceSet.add(values[i])
        }
        return differenceSet
    }
    // 子集 - 集合A中包含集合B
    Set.prototype.subset = function (otherset) {
        var values = this.values()
        for (let i = 0, l = values.length; i < l; i++) {
            if (!otherSet.has(values[i])) {
                return false
            }
        }
        return true
    }
}

var setA = new Set()
setA.add('a')
setA.add('b')
setA.add('c')
var setB = new Set()
setB.add('a')
setB.add('b')
setB.add('d')
console.log(setA.union(setB));