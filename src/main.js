import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router/routers.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';
// import store from 'store/index';
import md5 from 'js-md5';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:9092',
}));
Vue.prototype.$md5 = md5;
new Vue({
    router,
    // store,
    render: h => h(App),
    sockets: {
        connect() {
            this.$Message.success('链接成功');
        },
    },
}).$mount('#app');
