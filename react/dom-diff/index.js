/**
 * DOM Diff
 * 1.比较两个虚拟dom的区别， 也就是说比较两个对象的区别
 * 2.根据两个对象比较的区别创建出补丁(patcher)，描述改变的内容，将补丁更新dom
 * 3.采用深度遍历
 * 4.平级元素有互换，导致重新渲染，新增节点不会被更新（后续可继续扩展）
 */

import { createElement, render, renderPage } from './element'
import diff from './diff'
import patch from './patch'
let virtualDom = createElement('ul', { className: 'list'},[
    createElement('li', { className: 'item' }, ['item1']),
    createElement('li', { className: 'item' }, ['item2']),
    createElement('li', { className: 'item' }, ['item3']),
])
let newVirtualDom = createElement('ul', {},[
    createElement('li', { className: 'item' }, ['222']),
    createElement('li', { className: 'item' }, ['item2']),
    createElement('div', { className: 'item' }, ['222']),
])
let el = render(virtualDom)
renderPage(el, window.root)
let patcher = diff(virtualDom, newVirtualDom)
// 给元素打补丁，重新更新视图
patch(el, patcher)