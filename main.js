import { Vue } from './js/Vue.js';

new Vue({
    el: '#app',
    data: {
        number: 0,
        obj: {
            a: 1
        },
        input: ''
    },
    created(){
        console.log('created', this.number);
    },
    mounted(){
        console.log('mounted', this.number);
    },
    update(key, value) {
        console.log('update', key, value);
    },
    methods: {
        click() {
            this.obj.a ++;
            this.number ++;
        },
        mouseover() {
            this.click();
        },
    }
});
