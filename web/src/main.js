// 引入vue2框架
import Vue from 'vue'

// 引入element-ui以及normalize.css
import 'normalize.css/normalize.css'

// 引入element-ui以及
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局css
import '@/styles/index.scss'

// 引入app, store和router组件爱你
import App from '@/App'
import store from '@/store'
import router from '@/router'

// 引入权限控制组件
import '@/permission'
// 引入icon组件
import '@/icons';

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
