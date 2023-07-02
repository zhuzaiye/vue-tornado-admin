// main.js
// 导入Vue.js
import Vue from 'vue'
// element-ui的全部组件 & element-ui的css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false


//runtime
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");