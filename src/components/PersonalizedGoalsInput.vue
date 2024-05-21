<script lang="ts" setup>

import { INutrientsOption } from "@/views/AddNewPlot.vue";
import { computed } from "vue"


export interface MinMaxInputProps {
  selectedNutrients: INutrientsOption[],
}

const props = defineProps<MinMaxInputProps>()

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
    <v-row v-for="nutrient in computedSelectedNutrients" class="d-flex align-center justify-space-between mb-4 mb-lg-0"
      :key="nutrient.id">
      <v-col cols="12" xs="12" sm="4" class=" pa-lg-4 pa-0">
        <p class="d-inline-block text-medium-emphasis">{{ nutrient.text }}</p>
      </v-col>

      <v-col cols="9" xs="10" sm="6" class="pa-0 pa-lg-2">
        <div class="d-flex px-3 py-2 rounded-lg bg-light-grey">
          <input :class="'w-50'" type="number" v-model="nutrient.minValue" step=1 placeholder="Min" min="0" />
          <input :class="'ml-3 w-50'" type="number" v-model="nutrient.maxValue" step=1 placeholder="Max" min="0" />
        </div>
      </v-col>

      <v-col cols="3" xs="2" sm="2" class="text-end pa-0 pa-lg-2 ">
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