class Element {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}
function createElement(type, props, children) {
    return new Element(type, props, children)
}
function setAttr(node, key, value) {
    switch (key) {
        case 'value': // input / testarea
            if (node.tagName.toUpperCase === 'INPUT' || node.tagName.toUpperCase === 'TEXTAREA' ) {
                node.value = value
            } else if (key === 'className'){
                node.setAttribute('class' ,value)
            } else {
                node.setAttribute(key ,value)
            }
            break;
        case 'style': 
            node.style.cssText = value
            break;
        default: 
            node.setAttribute(key === 'className' ? 'class' : key ,value)
            break;
    }
}
function render(eleObj) {
    let el = document.createElement(eleObj.type)
    for (let key in eleObj.props) {
        setAttr(el, key, eleObj.props[key])
    }
    eleObj.children.forEach((child) => {
        child =  child instanceof Element ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el
}
function renderPage(el, traget) {
    traget.appendChild(el)
}

export {
    Element,
    createElement,
    render,
    renderPage,
    setAttr
}