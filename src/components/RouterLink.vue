<script setup lang="ts">
export interface IProps {
  to: string;
  text: string;
  color: string;
  class: string;
}

const props = defineProps<IProps>();
</script>

<template>
  <router-link :to="props.to" class="text-decoration-none {{ props.class  }}"
    >Home</router-link
  >
</template>
