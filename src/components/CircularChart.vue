<script setup lang="ts">
import { ApexOptions } from "apexcharts";

export interface IProps {
  height?: string | number;
  width?: string | number;
  options?: ApexOptions;
  series: number[];
}

const props = defineProps<IProps>();

</script>

<template>
  <apexchart :width="props.width" :height="props.height" :options="props.options" :series="props.series" type="radialBar">
  </apexchart>
</template>
