<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";
import SelectInput, { SelectOption } from "@/components/Inputs/SelectInput.vue";
import TextInput from "@/components/Inputs/TextInput.vue";
import PersonalizedGoalSearch from "@/components/PersonalizedGoalSearch.vue";
import PersonalizedGoalsInput from "@/components/PersonalizedGoalsInput.vue";
import Button from "@/components/Button.vue";




export interface INutrientsOption {
  id: string;
  text: string;
  unit: string;
  testResultValue: string | number;
  minAllowed: string | number;
  maxAllowed: string | number;
  minValue: string | number;
  maxValue: string | number;
}

export interface INutrientsData {
  title: string;
  key: string;
  options: INutrientsOption[];
}



const { smAndDown } = useDisplay();

const propNutrientsData = [
  {
    title: "Nitrogen",
    key: "nitrogen",
    options: [
      { id: "nitrate-nitrogen-n", text: "Nitrate-Nitrogen -N", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "0", maxAllowed: "12", minValue: "", maxValue: "" },
      { id: "nitrate", text: "Nitrate (NO3)", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "Ammonium", text: "Ammonium (NO4)", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
    ]
  },
  {
    title: "Phosphorus",
    key: "phosphorus",
    options: [
      { id: "p1", text: "Phosphorus 1", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "p2", text: "Phosphorus 2", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "p3", text: "Phosphorus 3", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "p4", text: "Phosphorus 4", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
    ]
  },
  {
    title: "Soil Health",
    key: "soil-health",
    options: [
      { id: "sh1", text: "Soil Health 1", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "sh2", text: "Soil Health 2", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "sh3", text: "Soil Health 3", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
      { id: "sh4", text: "Soil Health 4", unit: "mg/kg (ppm)", testResultValue: "", minAllowed: "", maxAllowed: "", minValue: "", maxValue: "" },
    ]
  },
]

const plotNickname = ref("");
const goal = ref<"personalized" | "default" | "">("")

const search = ref<string>("");
const selectedNutrients = ref<INutrientsOption[]>([]);
const nutrientsData = ref<INutrientsData[]>(propNutrientsData)


const onNutrientsDataChange = (value: INutrientsData[]): void => {
  nutrientsData.value = value;
}


const onSelectedNutrientsChange = (value: INutrientsOption[]) => {
  selectedNutrients.value = value;
};

const onSearchChange = (value: string) => {
  search.value = value;
  if (!search.value) {
    nutrientsData.value = propNutrientsData;
  }
}


const removeNutrientFromSelected = (id: string) => {
  selectedNutrients.value = selectedNutrients.value.filter((nutrient) => nutrient.id !== id);
};




const plantGrowingData = [
  { label: "Select Plant Growing", value: "" },
  { label: "Alfa", value: "alfa" },
];

const plantGrowing = ref(plantGrowingData[0]);

const onPlantGrowingChange = (value: SelectOption) => {
  plantGrowing.value = value;
};

const onPlotNicknameChange = (value: string) => {
  plotNickname.value = value;
  console.log(plotNickname.value);
};

const returnContainerClass = computed(() => {
  if (smAndDown.value) {
    return "px-4";
  } else {
    return "px-10";
  }
});


watch(goal, () => {
  selectedNutrients.value = []
})



defineExpose({
  search,
  selectedNutrients,
  nutrientsData,
  onSearchChange,
  onSelectedNutrientsChange,
  onNutrientsDataChange,
  plotNickname,
  plantGrowingData,
  plantGrowing,
  onPlantGrowingChange,
  onPlotNicknameChange,
});






</script>

<template>
  <v-container fluid :class="'h-100 ' + returnContainerClass">
    <v-row>
      <v-col cols="12">
        <div class="bg-white px-4 py-8 pa-lg-10 rounded-xl">
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="12">
                <h3>Add New Plot</h3>
              </v-col>

              <v-col cols="12" md="6" class="mt-4">
                <div class="">
                  <TextInput :value="plotNickname" label="Creating a Nickname for your Plot" placeholder="Plot Name"
                    @on-change="onPlotNicknameChange" />
                </div>

                <div class="mt-6">
                  <v-radio-group v-model="goal">
                    <v-radio label="I would like to make personalized goals" value="personalized" class="custom-radio" />

                    <v-card v-if="goal === 'personalized'" width="100%" variant="tonal">
                      <v-card-text>
                        Please select a nutrient and set a goal range for that nutrient. You are able to set as many goals
                        as you’d like for your plot.
                      </v-card-text>
                      <PersonalizedGoalSearch search-input-label="" search-input-placeholder="Search for Nutrient Options"
                        :nutrients-data="nutrientsData" :selectedNutrients="selectedNutrients" :search="search"
                        @on-search-change="onSearchChange" @on-selected-nutrients-change="onSelectedNutrientsChange"
                        @on-nutrients-data-change="onNutrientsDataChange" />
                    </v-card>

                    <v-radio label="I would like to use the software default goals" value="default"
                      class="custom-radio mt-2" />
                  </v-radio-group>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="mt-4">
                  <SelectInput :data="plantGrowingData" :value="plantGrowing" label="What are you growing in this Plot?"
                    bg-color="light-grey" @onChange="onPlantGrowingChange" />
                </div>

                <div class="mt-8">
                  <p class="font-weight-medium">Selected Nutrient Goals</p>
                  <v-container fluid class="px-0">
                    <PersonalizedGoalsInput :selected-nutrients="selectedNutrients"
                      @on-selected-nutrients-change="onSelectedNutrientsChange" @on-remove="removeNutrientFromSelected" />
                  </v-container>
                </div>
              </v-col>
              <v-col cols="12" class="mt-2">
                <div class="text-end">
                  <Button text="Save the Plot" color="primary" size="large" class="font-weight-medium" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<style>
.custom-radio label.v-label {
  /* color: #2D3540 !important; */
  opacity: 1 !important;
  font-weight: 500 !important;
}
</style>