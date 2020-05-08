import { Element, render, setAttr } from './element'
let allPatcher;
let index = 0
function patch(node, patcher) {
    allPatcher = patcher
    walk(node, allPatcher)
}
function walk(node) {
    // 从下往上进行打补丁
    let currentPacth = allPatcher[index++]
    let childNodes = node.childNodes
    childNodes && childNodes.forEach(child => walk(child))
    if (currentPacth) {
        doPacth(node, currentPacth)
    }
}
function doPacth(node, pacthes) { // 继续扩展更多的可能性
    pacthes.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS': 
                for (let key in patch.attr) {
                    let value = patch.attr[key]
                    console.log(value)
                    if (value) {
                        setAttr(node, key, value)
                    } else {
                        node.removeAttribute(key === 'className' ? 'class' : '')
                    }
                }
                break;
            case 'TEXT': 
                node.textContent = patch.text
                break;
            case 'REPLACE':
                let newNode = ( patch.newNode instanceof Element ) ? render(patch.newNode) : document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(newNode, node)
                break;
            default:
                break;
        }
    })
}
export default patch