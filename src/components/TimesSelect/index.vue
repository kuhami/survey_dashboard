<template>
  <div v-if="times" @click="onHandStop">
    <i class="el-icon-video-pause" /><span class="time-span">{{ times/1000 }}秒钟</span>
  </div>
  <el-dropdown trigger="click" @command="handleSetSize" v-else="!times">
    <div>
      <i class="el-icon-video-play" />
      <!--<i class="el-icon-video-pause" />-->
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of timesOptions" :key="item.value" :disabled="times===item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      timesOptions: [
        { label: '2秒钟', value: '2000' },
        { label: '5秒钟', value: '5000' },
        { label: '10秒钟', value: '10000' },
        { label: '30秒钟', value: '30000' }
      ]
    }
  },
  computed: {
    times() {
      return this.$store.getters.times
    }
  },
  created() {
    console.log(this.times)
  },
  methods: {
    onHandStop() {
      this.$store.dispatch('app/setTimes', 0)
    },
    handleSetSize(times) {
      this.$store.dispatch('app/setTimes', times)
      // this.refreshView()
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .time-span{
    font-size: 14px;
    margin-left: 4px;
  }
  .el-icon-video-pause{
    vertical-align: middle;
  }
</style>
