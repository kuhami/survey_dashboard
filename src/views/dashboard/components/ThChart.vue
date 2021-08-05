<template>
  <div :class="className" id="mapContainer" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const center = new TMap.LatLng(35.4230, 103.2115)
      let mapData = [{"lat":"31.13055","lng":"121.20782"},{"lat":"31.28056","lng":"121.41614"},{"lat":"31.13054","lng":"121.20782"},{"lat":"31.13057","lng":"121.20782"},{"lat":"31.13053","lng":"121.20783"},{"lat":"31.13054","lng":"121.20783"},{"lat":"31.10616","lng":"121.22533"}];
      const jsonData = JSON.stringify(mapData).replace(/\"/g, '') //这里去掉所有"

      //最后转回json对象
      mapData = eval('(' + jsonData + ')')

      //初始化地图
      const map = new TMap.Map("mapContainer", {
        // baseMap: {
        //     type: 'vector',
        //     features: ['base', 'building3d']  //隐藏矢量文字
        // },
        zoom: 3.7, //设置地图缩放级别
        center: center, //设置地图中心点坐标
        mapStyleId: "style1", //个性化样式
      });
      //初始化散点图并添加至map图层
      new TMap.visualization.Dot({
        faceTo: "screen",//散点固定的朝向
      })
        .addTo(map)
        .setData(mapData) //设置数据
    },
  }
}
</script>
