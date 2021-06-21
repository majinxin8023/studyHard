
interface A {
    <T>(age: T) : void
}
const getData: A  = <T>(str: T) => {
    console.log(str)
}
getData<string>('测试')

type Test = <T>(age: T) => number
const newGetData: Test = <T>(age) => {
    return age as unknown as number
    // return <number>age as unknown
}
console.log(newGetData('11'))

// 元祖 获取里面的参数  (1, '1', true)
function tuplify<T extends unknown[]>(...element:T ) :T {
    return element
}
// 获取对象中某个key的value
function get<T extends object, K extends keyof T>(o: T, name: K) {
    return o[name]
}
// 对象中是否存在某个key
function hasKey<O extends Record<string, any>>(
    obj: O,
    key: keyof any
  ): key is keyof O {
    return obj.hasOwnProperty(key);
  }





export {
    tuplify,
    get,
    hasKey
}