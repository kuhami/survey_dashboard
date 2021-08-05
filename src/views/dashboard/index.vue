<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>样本调研时间点</span>
            </div>
            <line-chart :chart-data="lineChartData" />
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>样本调研位置点</span>
            </div>
            <th-chart :chart-data="lineChartData" />
          </el-card>
        </el-col>
      </el-row>

      <el-row style="background:#fff;margin-top:32px;">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>样本详细情况</span>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}" >
            <el-table-column prop="date" label="城市" align="left"></el-table-column>
            <el-table-column prop="name" label="总配额" sortable  align="center"></el-table-column>
            <el-table-column prop="name1" label="已完成" align="center"></el-table-column>
            <el-table-column prop="name2" label="今日新增" align="center"></el-table-column>
            <el-table-column prop="name3" label='待完成' align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import ThChart from './components/ThChart'
import { PostDashboardList } from '@/api/dashboard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    ThChart
  },
  data() {
    return {
      intervalId: null,
      lineChartData: lineChartData.newVisitis,
      tableData: [{
        id: 1,
        date: '上海市',
        name: '8',
        name1: '2',
        name2: '3',
        name3: '3',
        children: [{
          id: 11,
          date: '昊鲲001',
          name: '3',
          name1: '2',
          name2: '3',
          name3: '3',
        }, {
          id: 12,
          date: '昊鲲002',
          name: '5',
          name1: '2',
          name2: '3',
          name3: '3',
        }]
      },
        {
          id: 2,
          date: '北京',
          name: '18',
          name1: '12',
          name2: '0',
          name3: '6',
          children: [{
            id: 21,
            date: '昊鲲003',
            name: '6',
            name1: '1',
            name2: '0',
            name3: '1',
          }]
        }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    times() {
      return this.$store.getters.times
    }
  },
  watch: {
    times: function(times) {
      console.log(times)
      this.clear()
      if (times) {
        this.dataRefreh(times)
      }
    }
  },
  created() {
    PostDashboardList({ name: 1 })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 定时刷新数据函数
    dataRefreh(times) {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.$message({
          message: '刷新成功',
          type: 'success'
        })
        // 加载数据函数
        this.initData()
      }, times)
    },
    // 停止定时器
    clear() {
      // 清除计时器
      clearInterval(this.intervalId)
      // 设置为null
      this.intervalId = null
    },
    initData() {
      console.log(this.intervalId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container{

    .dashboard-editor-container {
      padding: 32px;
      background-color: rgb(240, 242, 245);
      position: relative;

      .github-corner {
        position: absolute;
        top: 0px;
        border: 0;
        right: 0;
      }

      .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
      }
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
