import Reaction from './reaction'

function deepProxy(data, handler) {
    if (data !== 'object') return data
    // 存在深层次的对象，先要对子里面的对象进行deepProxy
    for (let key in data) {
        data[key] = new Proxy(data[key], handler())
    }
    return new Proxy(data, handler())
}

function createObservable(data) {
    let handler = () => {
        return {
            get(target, key) {
                Reaction.collect() // 取值收集当前依赖
                return Reflect.get(target, key)
            },
            set(target, key, value) {
                // 如果是数组的length 直接返回值
                if (Array.isArray(target) && key === 'length') return true
                let result = Reflect.set(target, key, value)
                Reaction.run()
                return result
            }
        }
    }
    return deepProxy(data, handler)
}
function observable(traget, key, descritor){
    // 是通过装饰器来实现的，先把装饰器的值进行深层代理
    if (typeof key === 'string') {
        let val = descritor.initializer()
        val = createObservable(val)
        return {
            enumerable: true,
            configurable: true,
            get() {
                Reaction.collect() // 取值收集当前依赖
                return val
            },
            set(value) {
                val = value
                Reaction.run()
            }
        }
    }
    return createObservable(traget)
}
export default observable