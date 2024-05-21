<script lang="ts" setup>
import { computed, ref } from "vue";

export interface SelectOption {
  label: string;
  value: string;
}

export interface IProps {
  data: SelectOption[];
  value: SelectOption;
  placeholder?: string;
  label?: string;
  bgColor?: string;
  density?: "comfortable" | "compact";
  singleLine?: boolean;
  hideDetails?: boolean;
  containerClasses?: string;
  inputClasses?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  bgColor: "light-grey",
  density: "comfortable",
  singleLine: true,
  hideDetails: true,
});


const emit = defineEmits(["on-change"]);

const modelValue = ref<SelectOption>(props.value);

const computedSelection = computed({
  get() {
    return modelValue.value;
  },
  set(value) {
    modelValue.value = value;
    emit("on-change", modelValue.value);
  },
});
</script>

<template>
  <div :class="props.containerClasses">
    <p :v-if="!!props.label" class="px-2 font-weight-medium">
      {{ props.label }}
    </p>
    <v-select variant="solo" v-model="computedSelection" :items="props.data" item-title="label" item-value="value"
      :density="props.density" return-object :single-line="props.singleLine" :hide-details="props.hideDetails"
      :onchange="emit('on-change', computedSelection)" :class="'bg-' + props.bgColor + ' ' + props.inputClasses"
      class="custom-select rounded-lg mt-1 elevation-0 font-weight-medium"></v-select>
  </div>
</template>

<style scoped>
.custom-select {
  min-width: 175px !important;
}
</style>
