/**
 * vue router
 * router-link
 * router-view
 */

class HistoryRoute {
    constructor() {
        this.current = null
    }
}
class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute
        this.init()
    }
    listenerFn(type, callback) {
        window.addEventListener(type, callback)
    }
    init() {
        if ( this.mode === 'hash') {
            // 先判断当前有没有hash  没有跳转到#/
            location.hash ? '' : location.hash = '/'
            listenerFn('load',  () => {
                this.history.current = location.hash.slice(1)
            })
            listenerFn('hashchange',  () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            location.pathname ? '' : location.pathname = '/'
            listenerFn('load',  () => {
                this.history.current = location.pathname
            })
            listenerFn('popstate',  () => {
                this.history.current = location.pathname
            })
        }
    }
    createMap(routes) {
        return routes.reduce((mode, current) => {
            mode[current.path] = current.component
            return mode
        }, {})
    }
    go() {

    }
    back() {

    }
    push() {

    }
}

// 使用了Vue的use方法就会调用install 方法
VueRouter.install = function(Vue, options) {
    // 每一个组件上都就会有this.$router  this.$route
    // 在所有组件中 获取所有组件的实例
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) { // 表示为根组件
                this._root = this // 当前实例挂载_root
                this._router = this.$options.router
                // history的current属性发生变化 要及时得到更新，刷新视图
                Vue.util.defineReactive(this, 'MJX', this._router.history)
            } else { 
                // 子 / 孙子 都拿到的是 父亲的_root
                this._root = this.$parent._root; // 获取唯一的路由实例
            }
            Object.defineProperties(this, '$router', { // Router的实例
                get() {
                    return this._root._router
                }
            })
            Object.defineProperties(this, '$route', {
                get() {
                    // 当前路由所在的状态
                    return this._root._router.history.current
                }
            })
        }
    })
    Vue.component('route-link', {
        props: {
            to: String
        },
        render(h) {
            let mode = this._self._root._router.mode
        return <a href={mode === hash ? `3${this.to}` : this.to}>{this.$slot.default}</a>
        }
    })
    Vue.component('route-view', {
        render(h) {
            let current = this._self._root._router.history.current
            let routerMap = this._self._root._router.routesMap
            return h(routerMap[current])
        }
    })
}


export default VueRouter