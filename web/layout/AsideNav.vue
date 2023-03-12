<template>
    <div class="aside">
        <transition name="aside-bg">
            <div v-show="!isCollapse" @click="" class="aside-bg"></div>
        </transition>
        <div class="aside-nav" :class="asideClass">
            <el-menu :collapse="isCollapse" :default-active="activePath" :collapse-transition="false">
                <div v-for="(route, index) in routes" :key="index">
                    <template v-if="!route.children"></template>
                    <el-submenu v-else-if="route.children.length > 1" :index="route.path">
                        <template slot="title">
                            <i :class="route.meta.icon"></i>
                            <span slot="title">{{ route.meta.title }}</span>
                        </template>
                        <el-menu-item-group>
                            <template v-for="(child, childIndex) in route.children">
                                <el-menu-item v-if="!child.meta.hidden" :index="`${route.path}/${child.path}`"
                                    :key="childIndex" @click="routeTo(child, route)">
                                    <i :class="child.meta.icon"></i>
                                    {{ child.meta.title }}
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-submenu>
                    <template v-else-if="route.children.length == 1">
                        <!-- 单一 -->
                        <el-menu-item :index="`${route.path} == '/' ? '' : ${route.path}/${route.children[0].path}`"
                            @click="routeTo(route.children[0], route)">
                            <i :class="route.children[0].meta.icon"></i>
                            <span slot="title">{{ route.children[0].meta.title }}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            beforeHandlerState: false
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.app.isCollapse
        },
        asideClass() {
            return {
                'aside-is-collapse': this.isCollapse
            }
        }
    },
    methods: {
        routeTo(route, father) {
            const beforePath = father ? father.path === '/' ? '/' : father.path + '/' : '';
            const path = beforePath + route.path;
            if (this.$route.fullPath === path) {
                return this.$router.push({ path })
            };
        }
    }
}
</script>

<style lang="scss" scoped>
// 导入混合样式文件
//@import "../style/mixin";
.aside {
    .aside-bg {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background: #000000;
        opacity: 0.3;
        z-index: 9;
    }

    .aside-nav {
        border-right: solid 0.1px #e6e6e6;
        box-sizing: content-box !important;
        width: 200px;
        height: 100vh;
        transition: 0.3s;
        position: relative;
        z-index: 10;
        background: #ffffff;
    }

    .el-menu {
        border-right: 0 !important;
        min-height: calc(100% - 60px) !important;
    }
}

.el-menu-item-group__title {
    padding: 0 !important;
}
</style>