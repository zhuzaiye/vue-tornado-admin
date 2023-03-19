<template>
  <el-menu router :default-active="defaultActive" class="el-menu-vertical" background-color="#545c64" text-color="#fff"
           active-text-color="#ffd04b" :collapse="isCollapse">
    <template v-for="(route, index) in routes">
      <template v-if="!route.children"></template>

      <el-submenu v-else-if="route.children.length>1" :index="route.path">
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(child, childIndex) in route.children"
                        :index="`${route.path}/${child.path}`"
                        :key="childIndex">
            <span slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item v-else-if="route.children.length===1"
                    :index="`${route.path}${route.children[0].path}`">
        <i :class="route.children[0].meta.icon"></i>
        <span slot="title">{{ route.children[0].meta.title }}</span>
      </el-menu-item>

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
      console.log(this.$store.state.isCollapse);
      return this.$store.state.isCollapse;
    },
    defaultActive: function () {
      return this.$route.path;
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// 导入混合样式文件
//@import "../style/mixin";
</style>