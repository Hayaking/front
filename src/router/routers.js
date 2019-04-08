import Vue from 'vue'
import Router from 'vue-router'
import login from '../view/login'
import _404 from '../view/404'
import chat from '../view/chat-board'
import search from '../view/search'
import circle from '../view/circle'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/index',
            name: 'index',
            component: chat,
        }, {
            path: '/',
            name: 'home',
        }, {
            path: '/login',
            name: 'login'
        }, {
            path: '/search',
            name: 'search',
            component: search
        }, {
            path: '/circle',
            name: 'circle',
            component: circle
        },{
            path: '*',
            name: '404',
            component: _404
        }
    ],

});
// 全局路由守卫
router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    const token = window.localStorage.getItem('token');
    let isLogin;  // 是否登录
    isLogin = !!token;
    if (isLogin) {
        if (to.path === '/' || to.path==='/login') next('/index');
        else next();
    } else {
        if(to.path==='/login'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
        }
    }
});
export default router;