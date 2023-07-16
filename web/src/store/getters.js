// 在 Vuex store 的配置对象中，使用 getters 属性来定义获取 state 中数据的方法
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}

export default getters

/**
在组件中使用 Vuex store 的 getters：

使用 this.$store.getters 来获取整个 getters 对象。

<template>
  <div>
    <p>Count: {{ $store.getters.getCount }}</p>
  </div>
</template>
使用计算属性和 mapGetters 辅助函数来获取 getters 中的特定属性。

<template>
  <div>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getCount'
    ]),
    count() {
      return this.getCount
    }
  }
}
</script>
注意，mapGetters 辅助函数会将 getters 中的属性映射为组件中的计算属性。

如果你需要在计算属性中对 getters 中的属性进行处理，可以使用对象展开符和计算属性的方式：

<template>
  <div>
    <p>Count multiplied by 2: {{ doubledCount }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      count: 'getCount',
      doubledCount: 'getDoubledCount'
    })
  }
}
</script>
*/
