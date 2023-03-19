<template>
  <el-table :data="tableData" border>
    <el-table-column prop="date" label="日期" width="140"></el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2023-03-19',
      name: '蜀山大虫',
      address: '安徽省合肥市蜀山区甘泉路81号'
    }
    return {
      tableData: Array(10).fill(item)
    }
  }
}
</script>

<style scoped>

</style>