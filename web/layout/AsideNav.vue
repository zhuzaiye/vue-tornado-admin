<template>
  <el-menu default-active="1-4-1" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical"
           @open="handleOpen" @close="handleClose" :collapse="isCollapse">

    <template v-for="(route, index) in routes">
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
    </template>
  </el-menu>
</template>

<script>

import {routes} from "../router/router";

export default {
  data() {
    return {
      routes: routes,
      beforeHandlerState: false
    }
  },
  computed: {
    isCollapse() {
      console.log(this.$store.state.isCollapse)
      return this.$store.state.isCollapse
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
        return this.$router.push({path})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 导入混合样式文件
//@import "../style/mixin";

.el-menu-vertical {
  width: 200px;
  border-right: 0 !important;
  min-height: calc(100% - 60px) !important;
  background-color: #545c64;
}

.el-menu-item-group__title {
  padding: 0 !important;
}
</style>