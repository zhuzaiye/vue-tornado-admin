<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {sayHello} from '../apis/api'

export default {
  data() {
    return {
      msg: 'Hello World!'
    }
  },

  methods: {
    fetchData() {
      sayHello().then((res) => {
        console.log(res)
        this.msg = res.data.hello;
      })
    }
  },

  created() {
    this.fetchData()
  }
}
</script>