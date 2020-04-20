import { observable, autorun, action } from './mobxFn'
// observable 把普通的数据变成可观察的数据
// autorun 自动运行，值改变也会运行

/**
 * 简单实现
 */
// let obj = observable({fruit: '🍎'})
// console.log(obj.fruit)
// autorun(() => {
//     console.log(obj.fruit)
// })
// obj.fruit = '🍌'

/**
 * class 类
 */
class Animal {
    @observable name = 'dog' // 类的装饰器
    @observable age = 1 // 类的装饰器
    get allAttribute() {
        return this.name  + '-' + this.age
    }
    @action add = () => {
        this.age += 1
    }
}
let animal = new Animal
autorun(() => {
    console.log(animal.name)
})
animal.name = 'cat'
animal.add()
