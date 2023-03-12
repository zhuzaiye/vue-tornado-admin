// 前端路由定义
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入路由相关组件
import Login from '../page/Login';
import Layout from "../layout/Layout";
import Home from "../page/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/',
        // 基础组件 Layout
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: { title: '首页', icon: 'el-icon-s-home' },
                props: ({ params }) => params
            }
        ]
    },
    {
        path: '/list',
        component: Layout,
        meta: { title: '表单', icon: 'el-icon-s-order' },
        children: [
            {
                path: 'detail',
                name: 'TradeDetail',
                component: Home,
                meta: { title: '详情页', icon: 'el-icon-c-scale-to-original' },
                props: ({ params }) => params
            },
            {
                path: 'persion',
                name: 'MemberDetail',
                component: Home,
                meta: { title: '个人资料', icon: 'el-icon-user' },
                props: ({ params }) => params
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 路由鉴权--前置守卫
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') || to.fullPath === '/login') {
        next()
    } else if (from.fullPath !== '/login') {
        router.push('/login')
    }
})

export default router