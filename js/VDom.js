
let target = null;

const parsePath = path => {
    const p = path.split('.');
    return data => {
        p.forEach(val => {
            data = data[val];
        });
        return data;
    };
};

export class VDom {
    constructor(vue, node, dir, variable) {
        this.vue = vue;
        this.$el = node;
        this.dir = dir;
        this.variable = variable;
        this.value = null;
    }

    // 触发Observer get，将数据和dom关联
    bindObserver() {
        target = this;
        this.setValue(parsePath(this.variable)(this.vue.$data));
        target = null;
    }

    setValue(val) {
        this.value = val;
    }

    update() {
        if (this.dir) {
            switch(this.dir) {
                case 'v-model':
                    this.$el.value = this.value;
                    break;
            }
        }
        // 没绑定属性视为文本节点，替换{{}}
        else {
            const reg = new RegExp(`{{${this.variable}}}`, 'g');
            this.$el.textContent = this.value;
        }

        this.vue.callHook('update', this.variable, this.value);
    }

    bindEvent() {
        if(this.dir === 'v-model'){
            this.$el.addEventListener('input', e => {
                this.vue.$data[this.variable] = e.target.value;
            });
        }
    }

}

export { target };