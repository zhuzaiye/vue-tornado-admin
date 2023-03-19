<template>
  <div>
    <h2>{{ content }}</h2>
    <el-button plain @click="getHello">
      加载
    </el-button>
    <el-button plain @click="open2">
      取消
    </el-button>
  </div>
</template>

<script>
import {sayHello} from '../apis/api'

export default {
  data() {
    return {
      content: "Tornado+Vue2+Axios+Element-UI",
      message: ""
    }
  },
  methods: {
    getHello() {
      const h = this.$createElement;
      sayHello().then((res) => {
        console.log(res);
        this.message = res.data;
        this.$notify({
          message: h('i', {style: 'color: teal'}, this.message),
          type: 'success',
        });
      })
    },
    open2() {
      this.$notify({
        type: 'success',
        message: '取消成功',
        duration: 2000
      });
    }
  }
}
</script>