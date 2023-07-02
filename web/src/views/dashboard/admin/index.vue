<template>
    <div class="dashboard-editor-container">
        <el-row class="btn-group">
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/components/index">Components</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn light-blue-btn" to="/charts/index">Charts</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn pink-btn" to="/excel/download">Excel</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn green-btn" to="/example/table/table">Table</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn tiffany-btn" to="/example/form/edit">Form</router-link>
            </el-col>
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn yellow-btn" to="/theme/index">Theme</router-link>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <pie-chart></pie-chart>
            </el-col>

            <el-col :span="12">
                <bar-chart></bar-chart>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pieChart from './pieChart'
import barChart from './barChart'

export default {
    name: 'dashboard-admin',
    components: { pieChart, barChart },
    data() {
        return {
            statisticsData: {
                article_count: 1024,
                pageviews_count: 1024
            }
        }
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar',
            'roles'
        ])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    margin: 30px;

    .btn-group {
        margin-bottom: 60px;
    }
}</style>
