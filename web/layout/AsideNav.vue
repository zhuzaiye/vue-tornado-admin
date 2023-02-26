<template>
  <div class="aside">
    <transition name="aside-bg">
      <div v-show="!isCollapse"
           @click="toggleAside(false)"
           class="aside-bg"
      ></div>
    </transition>
    <div class="aside-nav" :class="asideClass">
      <el-menu>
        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document"></i>数据管理</template>
          <el-menu-item index="userList">用户列表</el-menu-item>
          <el-menu-item index="shopList">商家列表</el-menu-item>
          <el-menu-item index="foodList">食品列表</el-menu-item>
          <el-menu-item index="orderList">订单列表</el-menu-item>
          <el-menu-item index="adminList">管理员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
          <el-menu-item index="addShop">添加商铺</el-menu-item>
          <el-menu-item index="addGoods">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-star-on"></i>图表</template>
          <el-menu-item index="visitor">用户分布</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-edit"></i>编辑</template>
          <el-menu-item index="vueEdit">文本编辑</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item index="adminSet">管理员设置</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"><i class="el-icon-warning"></i>说明</template>
          <el-menu-item index="explain">说明</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse
    },
    withoutAnimation() {
      return this.$store.state.app.withoutAnimation
    },
    asideClass() {
      return {
        'aside-is-collapse': this.isCollapse,
        'aside-without-animation': this.withoutAnimation
      }
    }
  },
  methods: {
    toggleAside(withoutAnimation) {
      this.$store.dispatch('app/toggleAside', {
        withoutAnimation: withoutAnimation
      })
    },
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

.aside-is-collapse {
  width: 64px;

  .aside-top {
    .top-logo {
      width: 46px;
    }
  }
}

.aside-without-animation {
  transition: 0s;

  .aside-top {
    .top-logo {
      transition: 0s;
    }
  }
}

// 导航背景动画
.aside-bg-enter-active {
  transition: all 0.3s;
}

.aside-bg-leave-active {
  transition: all 0.3s;
}

.aside-bg-enter,
.aside-bg-leave-to {
  opacity: 0;
}

.el-menu-item-group__title {
  padding: 0 !important;
}
</style>