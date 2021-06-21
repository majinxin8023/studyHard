
function BinarySearchTree() {
    // 属性
    this.root = null

    function Node (key) {
        this.key = key
        this.left = null
        this.right = null
    }
    // 方法
    // 对外暴露的添加方法
    BinarySearchTree.prototype.insert = function (key) {
        var newNode = new Node(key)
        if (this.root !== null) {
            this.insertNode(this.root, newNode)
        } else {
            this.root = newNode
        }
    }
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        console.log(node, newNode)
        if (node.key < newNode.key) { // 向左查找
            if (node.left === null) {
                node.left = newNode
            }
            // 递归
            this.insertNode(node.left, newNode)
        } else { // 向右查找
            if (node.right === null) {
                node.right = newNode
            }
            this.insertNode(node.right, newNode)
        }
    }
}


var bst = new BinarySearchTree()
bst.insert(11)
bst.insert(3)
bst.insert(8)
bst.insert(2)
console.log(bst)
