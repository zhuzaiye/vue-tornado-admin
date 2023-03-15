// module
// 使用单一状态树会导致所有状态都集中到一个较大对象中, 应用复杂就会导致store对象臃肿
// 于是，vuex通过module将store拆分成模块，每个模块拥有自己的state,mutation,action.getter

import {login} from "../router/api";

const appModule = {
    state: {
        isCollapsed: false,
    },
    actions: {
        toggleAside(context, payload) {
            context.commit('TOGGLE_ASIDE', payload)
        }
    },
    mutations: {
        TOGGLE_ASIDE(state, payload) {
            state.isCollapse = !state.isCollapse
            if (payload) state.withoutAnimation = payload.withoutAnimation
        }
    },
    getter: {}
}

const userModule = {
    state: {},
    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                login(payload).then(
                    (res) => {
                        commit('SET_DATA', res)
                        resolve()
                    }
                ).catch((error) => {
                    reject(error)
                })
            })
        }
    },
    mutations: {
        SET_DATA(state, res) {
            localStorage.setItem('token', res.token)
        }
    },
    getter: {}
}



export {appModule, userModule}