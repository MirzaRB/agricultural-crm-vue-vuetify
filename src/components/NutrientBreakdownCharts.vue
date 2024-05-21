<script lang="ts" setup>

import Progressbar from "./Progressbar.vue";



const props = defineProps<{
  lineChartData: any;
  progressBarData: any
}>();

</script>



<template>
  <div class="rounded-lg bg-white px-2 py-4">
    <p class="font-weight-medium px-2">Total N PPM</p>
    <apexchart width="100%" height="250" type="line" :options="props.lineChartData.chartOptions"
      :series="props.lineChartData.series">
    </apexchart>
  </div>

  <div class="rounded-lg bg-white px-4 py-4 mt-6">
    <p class="">Current Trend</p>
    <Progressbar :progress="props.progressBarData.progress" :isUpward="props.progressBarData.isUpward"
      :progressText="props.progressBarData.progressText" />
  </div>
</template>