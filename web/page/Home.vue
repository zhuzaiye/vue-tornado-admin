<template>
  <div>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20">
        <el-col :span="4" :offset="4">
          <div class="data_list today_head"><span class="data_num head">当日数据：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ generationCount }}</span> 生成任务</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ resourceCount }}</span> 资源套数</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{ missionCount }}</span> 部署任务</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" :offset="4">
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
      generationCount: 12,
      resourceCount: 250,
      missionCount: 4,
      allUserCount: 100,
      allOrderCount: 800,
      allAdminCount: 300,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

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

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
