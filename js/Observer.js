import { Dep } from "./Dep.js";
import { target } from './VDom.js';

export class Observer {
    constructor () {}

    // 数据监听
    observe (data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        for(const key in data) {
            const dep = new Dep();
            let val = data[key];
            this.observe(val);

            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: true,
                get () {
                    target && dep.addTarget(target);
                    return val;
                },

                set (newVal) {
                    if (newVal !== val) {
                        val = newVal;
                        // 数据变动通知更新视图
                        dep.notify(newVal);
                    }
                }
            })
        }
    }
}