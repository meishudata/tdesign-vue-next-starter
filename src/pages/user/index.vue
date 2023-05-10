<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，{{ usr.name }}
          <span class="regular"> 下午好</span>
        </div>
        <!-- <img src="@/assets/assets-tencent-logo.png" class="logo" /> -->
      </div>

      <t-card class="user-info-list" title="个人信息" :bordered="false">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="ellipsis" />
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col class="contract" :span="3">
            <div class="contract-title">手机号码</div>
            <div class="contract-detail">{{ usr.phone }}</div>
          </t-col>
          <t-col class="contract" :span="9">
            <div class="contract-title">昵称</div>
            <div class="contract-detail">{{ usr.nickname }}</div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">国家</div>
            <div class="contract-detail">{{ usr.country }}</div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">省份</div>
            <div class="contract-detail">{{ usr.prov }}</div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">市县</div>
            <div class="contract-detail">{{ usr.city }}</div>
          </t-col>
        </t-row>
      </t-card>

      <t-card class="content-container" :bordered="false">
        <t-tabs value="second">
          <t-tab-panel value="first" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
          <t-tab-panel value="second" label="内容列表">
            <t-card :bordered="false" class="card-padding-no" title="主页访问数据" describe="（次）">
              <template #actions>
                <t-date-range-picker
                  class="card-date-picker-container"
                  :default-value="LAST_7_DAYS"
                  theme="primary"
                  mode="date"
                  @change="onLineChange"
                />
              </template>
              <div id="lineContainer" style="width: 100%; height: 328px" />
            </t-card>
          </t-tab-panel>
          <t-tab-panel value="third" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
        </t-tabs>
      </t-card>
    </t-col>
  </t-row>
</template>
<script lang="ts">
export default {
  name: 'UserIndex',
};
</script>
<script setup lang="ts">
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';

import { getUserStore, useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';
import { LAST_7_DAYS } from '@/utils/date';

import { getFolderLineDataSet } from './index';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

let lineContainer: HTMLElement;
let lineChart: echarts.ECharts;
const store = useSettingStore();
const chartColors = computed(() => store.chartColors);

const userStore = getUserStore();
const { usr } = userStore;

const usrInfo = () => {
  const arr = [];
  for (const p in usr) {
    console.log(p);
  }
};
usrInfo();

const onLineChange = (value) => {
  lineChart.setOption(getFolderLineDataSet(value));
};

const initChart = () => {
  lineContainer = document.getElementById('lineContainer');
  lineChart = echarts.init(lineContainer);
  lineChart.setOption({
    grid: {
      x: 30, // 默认是80px
      y: 30, // 默认是60px
      x2: 10, // 默认80px
      y2: 30, // 默认60px
    },
    ...getFolderLineDataSet({ ...chartColors.value }),
  });
};

const updateContainer = () => {
  lineChart?.resize({
    width: lineContainer.clientWidth,
    height: lineContainer.clientHeight,
  });
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
  window.addEventListener('resize', updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
});

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([lineChart]);
  },
);
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
