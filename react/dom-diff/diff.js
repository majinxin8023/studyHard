const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0
function diff(oldTree, newTree) {
    let patches = {} // 对比之后返回的补丁包
    let index = 0 // 标示
    walk(oldTree, newTree, index, patches)
    return patches
}
function diffAttr(oldAttr, newAttr) {
    let patch = {}
    for (let key in oldAttr) {
        if (oldAttr[key] !== newAttr[key]) { // 判断新老的attr的值
            patch[key] = newAttr[key] // 有可能存在undefined
        }
    }
    for (let key in newAttr) {
        if (!oldAttr.hasOwnProperty(key)) { // 老节点上没有新节点的属性
            patch[key] = newAttr[key]
        }
    }
    return patch
}
function isString(node) {
    return  Object.prototype.toString.call(node) === '[object String]'
}
function diffChildren(oldChildren, newChildren, index, patches) {
    // 老节点 与 新节点进行对比
    // 采用全局index是为了防止节点未变化， index对应不上
    oldChildren && oldChildren.forEach((child, ind) => {
        walk(child, newChildren[ind], ++Index, patches)
    })
}
function walk(oldNode, newNode, index, patches) {
    let currentPatch = []
    if (!newNode) {
        currentPatch.push({ type: REMOVE, index })
    } else if (isString(oldNode) && isString(newNode)) { // 可以扩展数字等等
        console.log(oldNode)
        if (oldNode !== newNode) { // 文本是否一致
            currentPatch.push({ type: TEXT, text: newNode})
        }
    } else if (oldNode.type === newNode.type) { // 类型是否一致
        let attr = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attr).length > 0) {
            currentPatch.push({type: ATTRS, attr})
        }
        // 存在儿子节点 就遍历儿子节点
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else { // 节点被替换
        currentPatch.push({type: REPLACE, newNode })
    }
    if (currentPatch.length > 0) {
        console.log(patches)
        patches[index] = currentPatch
        console.log(patches)
    }
}
export default diff