<script setup lang="ts">
const props = defineProps<{
  progress: number;
  isUpward: boolean;
  progressText: string;
}>();
</script>

<template>
  <div class="d-flex align-center">
    <v-icon v-if="props.isUpward" icon="mdi-arrow-up" class="mr-1 text-primary"></v-icon>
    <v-icon v-else icon="mdi-arrow-down" class="mr-1 text-red"></v-icon>
    <p class="d-inline-flex align-center flex-shrink-0 mr-4">
      {{ props.progress }} %
    </p>
    <div class="progress-bar bg-main-bg rounded-xl w-100 my-6">
      <div class="progress-bar-progress rounded-lg bg-primary" :style="{ width: props.progress + '%' }"></div>
      <p class="w-full text-end text-medium-emphasis font-weight-medium mt-1">{{ props.progressText }}</p>
    </div>
  </div>
</template>

<style>
.progress-bar {
  height: 16px;
}

.progress-bar-progress {
  height: 16px;
}
</style>
