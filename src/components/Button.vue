<script setup lang="ts">

export interface IProps {
  color?: string;
  beforeTextIcon?: string;
  afterTextIcon?: string;
  size?: string;
  btnClass?: string;
  text: string | number;
}


const props = withDefaults(defineProps<IProps>(), {
  color: "primary",
  size: "large",
});

const emit = defineEmits(["click"])


</script>

<template>
  <v-btn :color="props.color" :prepend-icon="props.beforeTextIcon" :append-icon="props.afterTextIcon" :size="props.size"
    :class="props.btnClass" @click="emit('click')">
    {{ props.text }}
  </v-btn>
</template>
