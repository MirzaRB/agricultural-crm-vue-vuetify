<script lang="ts" setup>
import TextInput from "./Inputs/TextInput.vue";
import { computed, ref } from "vue";
import { INutrientsData, INutrientsOption } from "@/views/AddNewPlot.vue";

export interface IProps {
  search: string
  searchInputPlaceholder?: string
  searchInputLabel?: string
  selectedNutrients: INutrientsOption[],
  nutrientsData: INutrientsData[],
}

const props = defineProps<IProps>()
const emit = defineEmits(["on-selected-nutrients-change", "on-nutrients-data-change", "on-search-change"])

const panels = ref([])
const nutrientsData = ref(props.nutrientsData)

// eslint-disable-next-line vue/no-setup-props-destructure
const staticData = props.nutrientsData


const computedSearch = computed({
  get: () => props.search,
  set: (value) => {
    emit("on-search-change", value)
  }
})



const onSearchChange = (value: string) => {
  nutrientsData.value = staticData
  emit("on-search-change", value)
  if (!value) {
    nutrientsData.value = staticData
    emit("on-nutrients-data-change", staticData)
    panels.value = []
    return
  }
  panels.value = []
  const newNutrientsData = nutrientsData.value.map((item) => {
    const options = item.options.filter((option) => {
      return option.text.toLowerCase().includes(value.toLowerCase())
    })
    if (options.length > 0) {
      panels.value.push(item.key)
    }
    return {
      ...item,
      options
    }
  })

  nutrientsData.value = newNutrientsData
  emit("on-nutrients-data-change", newNutrientsData)
}

const computedSelectedNutrients = computed({
  get: () => {
    return props.selectedNutrients.map((item) => {
      return item.id
    })
  },
  set: (newSelected) => {
    const oldSelected = props.selectedNutrients.map((item) => {
      return item.id
    })

    const addDiff = newSelected.filter((x) => !oldSelected.includes(x))


    if (addDiff.length > 0) {
      let newEntry: INutrientsOption = {} as INutrientsOption

      staticData.forEach((nutrientCategory) => {
        nutrientCategory.options.forEach((nutrient) => {
          if (nutrient.id === addDiff[0]) {
            newEntry = { ...nutrient, minValue: "", maxValue: "" }
          }
        })
      })

      const newSelectedNutrients = [...props.selectedNutrients, newEntry]

      emit("on-selected-nutrients-change", newSelectedNutrients)
    }
    else {
      const removeDiff = oldSelected.filter((x) => !newSelected.includes(x))
      const newSelectedNutrients = props.selectedNutrients.filter((item) => {
        return !removeDiff.includes(item.id)
      })

      emit("on-selected-nutrients-change", newSelectedNutrients)

    }
  }
})

const checkIfNutrientIsSelected = (id: string): boolean => {
  return computedSelectedNutrients.value.includes(id);
}


const isSelected = (id: string) => {
  if (checkIfNutrientIsSelected(id)) {
    return "text-high-emphasis"
  }
  else {
    return "text-medium-emphasis"
  }
}

</script>

<template>
  <v-card-item class="pa-2">
    <TextInput :value="computedSearch" :placeholder="props.searchInputPlaceholder" :label="props.searchInputLabel"
      @on-change="onSearchChange" after-text-icon="mdi-magnify" />

    <v-expansion-panels variant="accordion" multiple v-model="panels" class="mt-3">
      <v-expansion-panel v-for="nutrientCategory in nutrientsData" :value="nutrientCategory.key"
        :key="nutrientCategory.key">
        <v-expansion-panel-title class="font-weight-bold ">
          {{ nutrientCategory.title }}
        </v-expansion-panel-title>

        <v-expansion-panel-text class="">
          <div v-for="item in nutrientCategory.options" :key="item.id"
            class="d-flex align-center px-1 px-lg-4 mt-2 justify-space-between text-medium-emphasis"
            style="user-select: none;">
            <input type="checkbox" hidden v-model="computedSelectedNutrients" :value="item.id" :name="item.id"
              :id="item.id" class="mr-2" />

            <label :for="item.id" :class="'font-weight-medium ' + isSelected(item.id)">
              {{ item.text }}
              <span class=" ml-2 ">
                {{ item.unit }}
              </span>
            </label>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-card-item>
</template>


<style scoped>
input[type="checkbox"] {
  transform: scale(1.4);
}
</style>