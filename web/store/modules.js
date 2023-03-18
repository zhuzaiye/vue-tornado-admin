// module
// 使用单一状态树会导致所有状态都集中到一个较大对象中, 应用复杂就会导致store对象臃肿
// 于是，vuex通过module将store拆分成模块，每个模块拥有自己的state,mutation,action.getter

import {login} from "../apis/api";

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
        }
    },
    getter: {}
}

const userModule = {
    state: {},
    actions: {
        Login({commit}, payload) {
            return new Promise((resolve, reject) => {
                login(payload).then(
                    (response) => {
                        commit('SET_TOKEN', response.data.token)
                        resolve()
                    }
                ).catch((error) => {
                    reject(error)
                })
            })
        }
    },
    mutations: {
        SET_TOKEN(state, res) {
            localStorage.setItem('token', res.token)
        }
    },
    getter: {}
}


export {appModule, userModule}