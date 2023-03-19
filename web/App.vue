<template>
  <div>
    <!-- 使用 <router-view></router-view> 来渲染最高级路由匹配到的组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Vue2+Tornado+axios+Element-ui'
    }
  }
}
</script>

<style lang="scss" scoped>

* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

</style>
