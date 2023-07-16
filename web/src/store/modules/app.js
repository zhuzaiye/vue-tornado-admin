/** app store module定义  */
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // 控制sidebar的伸缩
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  // 默认设备类型
  device: 'desktop'
}

// 定义修改state属性的函数方法
// 1. 使用commit 方法手动触发 mutation, 例如: this.$store.commit('TOGGLE_SIDEBAR')
// 2. 使用 mapMutations 辅助函数将 mutation 映射到组件中的方法, 例如:
// import { mapMutations } from 'vuex'
// methods: {
//   ...mapMutations(['increment'])
// }
const mutations = {
  // siderbar侧边栏伸缩控制
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭siderbar侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 应用设备控制
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

// 定义触发mutation的action方法, 用于异步操作,使用dispatch方法手动触发action
// 例如: this.$store.dispatch('toggleSideBar')
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
