class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        this.key = key
        // 负责更新视图的cb
        this.cb = cb

        // 把watcher对象记录到Dep类的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中会调用addSub
        this.newValue = this.vm[this.key]
        Dep.target = null
    }

    // 当数据发生变化的时候，更新视图
    update() {
        const oldValue = this.newValue
        this.newValue = this.vm[this.key]
        if (oldValue === this.newValue) {
            return
        } 
        this.cb(this.newValue)
    }
}