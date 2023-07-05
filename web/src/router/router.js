// 前端路由定义
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入layout frame component
import Layout from "../layout/Layout";
// 引入app component
import Login from '../page/Login';
import Home from "../page/Home";
import Hello from "../page/Hello";
import Form from "../page/Table";
import Todo from "../page/Todo";

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: {title: 'Home', icon: 'el-icon-s-home'},
                props: ({params}) => params
            }
        ]
    },
    {
        path: '/about',
        component: Layout,
        meta: {"title": '测试', icon: 'el-icon-view'},
        // 总是跳到第一个child
        redirect: '/about/todo',
        children: [
            {
                path: 'todo',
                name: 'Todo',
                component: Todo,
                meta: {title: '测试VUE', icon: 'el-icon-chat-line-round'},
                props: ({params}) => params
            },
            {
                path: 'hello',
                name: 'Hello',
                component: Hello,
                meta: {title: '测试请求', icon: 'el-icon-chat-line-round'},
                props: ({params}) => params
            },
            {
                path: 'list',
                name: 'Form',
                component: Form,
                meta: {title: '测试表单', icon: 'el-icon-chat-line-round'},
                props: ({params}) => params
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 路由鉴权--前置守卫
router.beforeEach((to, from, next) => {
    // 如果路由指向login 放行
    if (to.path === '/login') {
        next();
    } else {
        // 如果不指向login, 先获取token
        let token = localStorage.getItem('token');
        // token 为空或者不存在 返回登录, 否则放行
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
})

export default router