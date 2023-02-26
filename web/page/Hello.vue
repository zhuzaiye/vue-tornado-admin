<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {sayHello} from '../router/api'

export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },

  methods: {
    fetchData() {
      sayHello().then((res) => {
        console.log(res)
        this.msg = res.hello
      })
    }
  },

  created() {
    this.fetchData()
  }
}
</script>