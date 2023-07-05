<template>
    <div class="app-wrapper">
        <el-aside width="auto" class="sidebar-container">
            <AsideNav />
        </el-aside>
        <div class="navbar">
            <el-header class="app-header">
                <!-- 折叠菜单按钮 -->
                <div class="toggle" @click="handleToggle">
                    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                </div>
                <div class="keep-alive">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
                        <el-breadcrumb-item v-for="(route, index) in breadList" :key="index" :to="{ path: route.path }">
                            {{ route.meta.title }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!-- 下拉式配置 -->
                <el-dropdown @command="handleCommand" class="right-menu">
                    <i class="el-icon-setting" style="margin-right: 15px;margin-top: 15px;"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="person">个人</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
        </div>
        <div class="main-container">
            <section class="app-main">
                <transition name="fade-transform" mode="out-in">
                    <router-view :key="key" />
                </transition>
            </section>
        </div>
    </div>
</template>

<script>

import AsideNav from "./AsideNav";
import { logout } from "../apis/api";

export default {
    components: {
        AsideNav
    },
    data() {
        return {
            isCollapse: false,
            breadList: [] // 路由集合
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    computed: {
        key() {
            return this.$route.path
        }
    },
    methods: {
        isHome(route) {
            return route.name === "Home";
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
            const first = matched[0];
            if (!this.isHome(first)) {
                matched = [{ path: '/home', meta: { title: 'Home' } }].concat(matched)
            }
            this.breadList = matched.filter(item => item.meta && item.meta.title);
        },
        handleToggle() {
            this.isCollapse = !this.isCollapse;
        },
        handleCommand(command) {
            console.log(command)
            if (command === 'person') {
                this.$router.push({ name: 'MemberDetail' })
            } else {
                logout().then(res => {
                    if (res.msg === "ok") {
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                    }
                });
            }
        }
    },
    created() {
        this.getBreadcrumb();
    }
}
</script>

<style lang="scss" scoped>
$sideBarWidth: 210px;

$menuText: #bfcbd9;
$menuActiveText: #409EFF;
$subMenuActiveText: #f4f4f5;
$menuBg: #304156;
$menuHover: #263445;

$subMenuBg: #1f2d3d;
$subMenuHover: #001528;

.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}

.sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    // reset element-ui css
    .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .el-scrollbar__bar.is-vertical {
        right: 0px;
    }

    .el-scrollbar {
        height: 100%;
    }

    .is-horizontal {
        display: none;
    }

    a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
    }

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }

    // menu hover
    .submenu-title-noDropdown,
    .el-submenu__title {
        &:hover {
            background-color: $menuHover !important;
        }
    }

    .is-active>.el-submenu__title {
        color: $subMenuActiveText !important;
    }

    & .nest-menu .el-submenu>.el-submenu__title,
    & .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
            background-color: $subMenuHover !important;
        }
    }
}

.main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    position: relative;
}

.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 93px);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 15px;
    padding-top: 60px;
}

.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    // background-color: #b8dfe3;
    color: #333;
    position: fixed;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;

    .keep-alive {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }
    }
}

.toggle {
    color: #000000;
    text-align: center;
    font-size: 26px;
    line-height: 60px;
    display: inline-block;
    padding: 0 15px;
    border-left: solid 1px #ccc;
    position: absolute;
    left: 0px;
    cursor: pointer;
}

/* 下拉菜单 */
.el-dropdown {
    color: #000000;
    text-align: center;
    font-size: 26px;
    line-height: 50px;
    float: right;
}

.keep-alive {
    //color: #303133;
    text-align: center;
    font-size: 26px;
    line-height: 60px;
    display: inline-block;
    padding: 25px 25px;
    position: absolute;
    left: 30px;
}

// .keep-alive:hover {
//     //background-color: #ffd04b;
//     color: rgb(255, 255, 255);
// }
</style>