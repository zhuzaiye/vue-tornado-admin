import Vue from 'vue'
// 前端路由
import router from './router/router'
// vuex store
import store from './store'
// element-ui的全部组件
import ElementUI from 'element-ui'
// element-ui的css
import 'element-ui/lib/theme-chalk/index.css'
// 客户端主程序
import App from './App.vue'

Vue.config.debug = true
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')