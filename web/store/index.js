// https://v3.vuex.vuejs.org/
import Vue from 'vue'
import Vuex from 'vuex'
import {appModule, userModule} from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    modules: {
        appModule,
        userModule
    },
    getters: {}
})


export default store


