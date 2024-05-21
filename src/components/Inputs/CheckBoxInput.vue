<script lang="ts" setup>
import { ref, computed } from "vue";

export interface CheckBoxInputProps {
  label: string;
  value: boolean;
}

const props = withDefaults(defineProps<CheckBoxInputProps>(), {
  value: false,
});
const emit = defineEmits(["on-change"]);

const isChecked = ref(props.value);

const toggleChecked = () => {
  isChecked.value = !isChecked.value;
  emit("on-change");
};

const icon = computed(function () {
  return isChecked.value ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline";
});

defineExpose({
  toggleChecked,
  icon,
});
</script>

<template>
  <div class="d-flex align-center">
    <v-btn :icon="icon" class="elevation-0" @click="toggleChecked"></v-btn>

    <p class="px-2 font-weight-medium cursor-pointer" @click="toggleChecked">
      {{ label }}
    </p>
</div>
</template>
