
import { Observer } from './Observer.js';
import { Compiler } from './Compiler.js';
export class Vue {
    constructor(options) {
        this._options = options;
        this.$options = Object.assign(options.data, options.methods);
        this.$el = document.querySelectorAll(options.el)[0];
        this.$data = options.data;
        this.$methods = options.methods;
        this.init();
    }

    init() {
        const observer = new Observer();
        const compiler = new Compiler(this);
        this.callHook('created');
        observer.observe(this.$data);
        compiler.compile(this.$el);
        this.callHook('mounted');
    }

    callHook(str, ...arg) {
        if (this._options[str]) {
            this._options[str].call(this.$options, ...arg);
        }
    }
}