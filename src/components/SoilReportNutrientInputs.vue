<script lang="ts" setup>

import { INutrientsOption } from "@/views/AddNewPlot.vue";
import { computed } from "vue"


export interface MinMaxInputProps {
  selectedNutrients: INutrientsOption[],
}

const props = withDefaults(defineProps<MinMaxInputProps>(), {

});
const emit = defineEmits(["on-selected-nutrients-change", "on-remove", "on-change"]);



const computedSelectedNutrients = computed({
  get: () => props.selectedNutrients,
  set: (value) => {
    emit("on-selected-nutrients-change", value)
  }
})


</script>


<template>
  <v-container fluid>
    <v-row v-for="nutrient in computedSelectedNutrients" class="d-flex align-center justify-space-between"
      :key="nutrient.id">
      <v-col cols="4">
        <p class="d-inline-block text-medium-emphasis">{{ nutrient.text }}</p>
      </v-col>

      <v-col cols="6">
        <div class="d-flex px-3 py-2 rounded-lg bg-light-grey">
          <input class="w-100" type="number" v-model="nutrient.testResultValue" step=1 :placeholder="nutrient.unit"
            :min="nutrient.minAllowed || 0" :max="nutrient.maxAllowed" />
        </div>
      </v-col>

      <v-col cols="2">
        <v-btn icon="mdi-close" @click="emit('on-remove', nutrient.id)" size="small" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
input[type="number"]:focus {
  outline: none;
  border: none
}


input[type="number"]:focus-within {
  outline: none;
  border: none
}
</style>