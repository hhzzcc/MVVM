import { VDom } from './VDom.js';

export class Compiler {
    constructor(vue) {
        this.vue = vue;
    }

    compile(node) {
        const reg = /(?<=\{\{)[^\}\}]+/g;

        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i];
            // 普通节点
            if (this.isElementNode(childNode)) {
                // 属性编译
                this.compileNode(childNode);
            }

            // 文本节点
            if (this.isTextNode(childNode) && reg.test(childNode.textContent)) {
                childNode.textContent.match(reg).forEach(val => {
                    //传入与正则式匹配的第一个字符串
                    this.createVdom(childNode, null, val);
                });
            }
            if (childNode.childNodes && childNode.childNodes.length) {
                this.compile(childNode);
            }
        }
    }

    compileNode(node) {
        if(node.hasAttribute('v-model')){
            this.createVdom(node, 'v-model', node.getAttribute('v-model'));
        }

        for (let i = 0; i < node.attributes.length; i++) {
            const attribute = node.attributes[i];
            if (/^@/.test(attribute.name)) {
                node[`on${attribute.name.split('@')[1]}`] = () => {
                    const method = this.vue.$methods[node.getAttribute(attribute.name)];
                    if (!method) {
                        console.error(`method ${node.getAttribute(attribute.name)} is no defined`);
                        return;
                    }
                    method.call(this.vue.$options);
                }
            }
        }
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }


    // 创建虚拟dom
    createVdom(node, dir, variable) {
        const vdom = new VDom(this.vue, node, dir, variable);

        // 将dom和数据关联起来
        vdom.bindObserver();

        // 更新数据
        vdom.update();

        // 指令解析并绑定成事件
        vdom.bindEvent();
    }
}