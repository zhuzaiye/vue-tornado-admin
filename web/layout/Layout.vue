<template>
  <el-container class="layout">
    <!--  侧边栏导航  -->
    <AsideNav/>
    <el-container>
      <!--  头部    -->
      <el-header>
        <div class="header-toggle" @click="">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(route, index) in keepAlives" :key="index">{{ route }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start'>
          <div class="block"><el-avatar :size="small" :src="avatarUrl"></el-avatar></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">个人</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--  内容    -->
      <el-main>
        <div class="app-main">
          <transition name="el-fade-in">
            <keep-alive :include="include">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideNav from "./AsideNav";
import {mapState} from 'vuex';

export default {
  components: {
    AsideNav
  },
  data() {
    return {
      keepAlives: [],
      visible: true,
      avatarUrl: "/assets/logo.png"
    }
  },
  computed: {
    ...mapState(['isCollapse']),
    include() {
      const include = []
      this.keepAlives.forEach((route) => {
        include.push(route.name)
      })
      return include
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      if (command === 'person') {
        this.$router.push({name: 'MemberDetail'})
      } else {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  .el-header {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 95px !important;
    padding: 0;
    z-index: 2;
  }

  .el-main {
    background-color: #f5f5f5;
    color: #333;
    height: calc(100vh - 95px);
    overflow: hidden;
    padding: 0 !important;

    .app-main {
      padding: 30px;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.4s;
  }

  .slide-fade-leave-active {
    transition: all 0.4s;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(15px);
    opacity: 0;
  }
}
</style>