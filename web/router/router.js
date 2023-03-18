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

Vue.use(VueRouter)

export const routes = [
    {
        path: "/hello",
        name: "hello",
        component: Hello,
    },
    {
        path: '/login',
        name: "Login",
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
    }
]

const router = new VueRouter({
    routes
})

// 路由鉴权--前置守卫
// router.beforeEach((to, from, next) => {
//     // localStorage.getItem('token') ||
//     if (to.fullPath === '/login') {
//         next()
//     } else if (from.fullPath !== '/login') {
//         router.push('/login')
//     }
// })

export default router