import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../page/Login'
import Layout from "../layout/Layout"
import Home from "../page/Home"

Vue.use(VueRouter)

const routes = [
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
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') || to.fullPath === '/login') {
        next()
    } else if (from.fullPath !== '/login') {
        router.push('/login')
    }
})

export default router