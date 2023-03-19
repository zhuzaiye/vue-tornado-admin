<template>
  <el-container>
    <el-header height="60px">
      <a class="logo" href="/">资源管理系统</a>
      <!-- 折叠菜单按钮 -->
      <div class="toggle" @click="">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <!-- 下拉式配置 -->
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px;margin-top: 15px;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="person">个人</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="keep-alive">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(route, index) in keepAlives" :key="index">{{ route }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-header>

    <el-container>
      <el-aside width="auto">
        <AsideNav></AsideNav>
      </el-aside>

      <el-main>
        <transition name="el-fade-in">
          <keep-alive :include="include">
            <router-view></router-view>
          </keep-alive>
        </transition>
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
// 占满全屏
.el-container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
}

/*上外边距50px，防止挡住Header*/
.el-aside, .el-main {
  margin-top: 50px;
}

/*设置背景色，方便观察效果*/
.el-header {
  background-color: #B3C0D1;
  color: #333;
  /* 上层显示，避免被Main和Aside遮挡 */
  z-index: 999;
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #eee;
  text-align: center;
}

/* 去除菜单右侧边框 */
.el-menu {
  border-right: none;
}

/* 设置展开时菜单宽度 */
.el-menu-vertical:not(.el-menu--collapse) {
  width: 230px;
}

.logo {
  color: #07145b;
  text-align: center;
  font-size: 26px;
  line-height: 50px;
  padding: 0 15px;
  font-weight: 400;
  text-decoration: none;
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
  left: 230px;
  cursor: pointer;
}

.toggle:hover {
  background-color: #ffd04b;
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
  left: 260px;
}

.keep-alive:hover {
  //background-color: #ffd04b;
  color: rgb(255, 255, 255);
}
</style>