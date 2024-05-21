<script setup lang="ts">
import { computed } from "vue";

export interface TextInputProps {
  value: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  variant?: "solo" | "filled" | "outlined" | "plain" | "underlined";
  density?: "comfortable" | "compact";
  placeholder?: string;
  hideDetails?: boolean;
  bgColor?: string;
  afterTextIcon?: string;
  beforeTextIcon?: string;
  inputClasses?: string;
  containerClasses?: string;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  bgColor: "light-grey",
  variant: "solo",
  density: "comfortable",
  type: "text",
  hideDetails: true,
  singleLine: true,
});



const emit = defineEmits(["on-change"]);

const inputValue = computed({
  get: () => props.value,
  set: (newValue: string) => {
    emit("on-change", newValue);
  },
})



</script>

<template>
  <div :class="props.containerClasses">
    <p v-if="props.label" class="px-2 font-weight-medium">{{ props.label }}</p>
    <v-text-field v-model="inputValue" :type="props.type" :variant="props.variant" :hide-details="props.hideDetails"
      :placeholder="props.placeholder" :density="props.density" :prepend-inner-icon="props.beforeTextIcon"
      :append-inner-icon="props.afterTextIcon" :class="'bg-' + props.bgColor + ' ' + props.inputClasses"
      class="custom-input rounded-lg mt-1 elevation-0 font-weight-medium" />
  </div>
</template>

