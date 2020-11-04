// 订阅器

export class Dep {
    constructor() {
        this.vdoms = [];
    }

    // 将watcher添加进来
    addTarget(vdom) {
        this.vdoms.push(vdom);
    }

    // 更新视图
    notify(newVal) {
        // 一个数据可能被多个dom绑定
        this.vdoms.forEach(vdom => {
            vdom.setValue(newVal);
            vdom.update();
        });
    }
}