<template>
  <div>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="data_list today_head"><span class="data_num head">当日数据：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ userCount }}</span> 新增用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ orderCount }}</span> 新增订单</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ adminCount }}</span> 新增管理员</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ allUserCount }}</span> 注册用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ allOrderCount }}</span> 订单</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ allAdminCount }}</span> 管理员</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      userCount: 12,
      orderCount: 20,
      adminCount: 4,
      allUserCount: 7000,
      allOrderCount: 80000,
      allAdminCount: 300,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../style/mixin';

.data_section {
  padding: 20px;
  margin-bottom: 40px;

  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #E5E9F2;

    .data_num {
      color: #333;
      font-size: 26px;
    }

    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }

  .today_head {
    background: #FF9800;
  }

  .all_head {
    background: #20A0FF;
  }
}
</style>
