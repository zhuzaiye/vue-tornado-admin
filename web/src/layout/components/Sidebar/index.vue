<!-- sidebar 组件定义 -->
<template>
    <div class="">
        <!-- el-scrollbar 滚动条实现 -->
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!-- 
                mode: 模式 横(horizontal)/竖(vertical)两种模式
                collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
                background-color: 菜单的背景色（仅支持 hex 格式）
                text-color:	菜单的文字颜色（仅支持 hex 格式）
                active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）
             -->
            <el-menu :default-active="activeMenu" 
                     :collapse="isCollapse" 
                     :background-color="variables.menuBg"
                     :text-color="variables.menuText" 
                     :unique-opened="false" 
                     :active-text-color="variables.menuActiveText" 
                     :collapse-transition="false" 
                     mode="vertical">
                <sidebar-item v-for="route in routes" 
                             :key="route.path" 
                             :item="route" 
                             :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.module.scss'

export default {
    components: { SidebarItem},
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        routes() {
            return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        variables() {
            return variables
        },
        // 控制侧边栏的打开和关闭
        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>

