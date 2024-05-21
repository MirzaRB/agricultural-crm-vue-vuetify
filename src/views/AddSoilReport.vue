<script lang="ts" setup>
import { ref, watch } from "vue";
import { SelectOption } from "@/components/Inputs/SelectInput.vue";
import PersonalizedGoalSearch from "@/components/PersonalizedGoalSearch.vue";
import MultipleUpload from "@/components/MultipleUpload.vue";
import SoilReportNutrientInputs from "@/components/SoilReportNutrientInputs.vue";
import { INutrientsData, INutrientsOption } from "./AddNewPlot.vue";

const propNutrientsData = [
  {
    title: "Nitrogen",
    key: "nitrogen",
    options: [
      {
        id: "nitrate-nitrogen-n",
        text: "Nitrate-Nitrogen -N",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: 10,
        minValue: "",
        maxValue: "",
      },
      {
        id: "nitrate",
        text: "Nitrate (NO3)",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: 100,
        minValue: "",
        maxValue: "",
      },
      {
        id: "Ammonium",
        text: "Ammonium (NO4)",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
    ],
  },
  {
    title: "Phosphorus",
    key: "phosphorus",
    options: [
      {
        id: "p1",
        text: "Phosphorus 1",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: 0,
        maxValue: 100,
      },
      {
        id: "p2",
        text: "Phosphorus 2",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: 12,
        minValue: "",
        maxValue: "",
      },
      {
        id: "p3",
        text: "Phosphorus 3",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: 0,
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
      {
        id: "p4",
        text: "Phosphorus 4",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
    ],
  },
  {
    title: "Soil Health",
    key: "soil-health",
    options: [
      {
        id: "sh1",
        text: "Soil Health 1",
        unit: "mg/kg (ppm)",
        testResultValue: 0,
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
      {
        id: "sh2",
        text: "Soil Health 2",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
      {
        id: "sh3",
        text: "Soil Health 3",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
      {
        id: "sh4",
        text: "Soil Health 4",
        unit: "mg/kg (ppm)",
        testResultValue: "",
        minAllowed: "",
        maxAllowed: "",
        minValue: "",
        maxValue: "",
      },
    ],
  },
];

const reportPhysicalCharacteristics = ref([
  {
    label: "General Description",
    value: "",
  },
  {
    label: "Texture",
    value: "",
  },
  {
    label: "Cover",
    value: "",
  },
  {
    label: "Others",
    value: "",
  },
]);

const uploadedFiles = ref<File[]>([]);

const plotNickname = ref("");
const goal = ref<"personalized" | "default" | "">("");

const search = ref<string>("");
const selectedNutrients = ref<INutrientsOption[]>([]);
const nutrientsData = ref<INutrientsData[]>(propNutrientsData);

const onNutrientsDataChange = (value: INutrientsData[]): void => {
  nutrientsData.value = value;
};

const onSelectedNutrientsChange = (value: INutrientsOption[]) => {
  selectedNutrients.value = value;
};

const onSearchChange = (value: string) => {
  search.value = value;
  if (!search.value) {
    nutrientsData.value = propNutrientsData;
  }
};



const removeNutrientFromSelected = (value: string) => {
  selectedNutrients.value = selectedNutrients.value.filter(
    (nutrient) => nutrient.id !== value
  );
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


const handleFilesChange = (files: File[]) => {
  uploadedFiles.value = files;
};

watch(goal, () => {
  selectedNutrients.value = [];
});

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
  <v-container fluid class="h-100 px-2 px-sm-8 px-md-12">
    <v-row>
      <v-col cols="12">
        <div class="bg-white px-3 py-8 pa-sm-10 rounded-xl">
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="12" class="">
                <h3>New Soil Reports for Garden</h3>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6">
                <div>
                  <p class="px-2 font-weight-medium">Select Date of Reports</p>
                  <v-text-field ref="dateOfUpdate" type="date" density="comfortable" variant="solo" :hide-details="true"
                    class="bg-light-grey rounded-lg elevation-0 mt-1" />
                </div>

                <div class="mt-6">
                  <p class="px-2 font-weight-medium">Report Nutrient Tested</p>
                  <v-card width="100%" variant="tonal">
                    <PersonalizedGoalSearch search-input-placeholder="Search for Nutrient Options" :search="search"
                      :selected-nutrients="selectedNutrients" :nutrients-data="nutrientsData"
                      @on-search-change="onSearchChange" @on-selected-nutrients-change="onSelectedNutrientsChange"
                      @on-nutrients-data-change="onNutrientsDataChange" />
                  </v-card>
                </div>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6">
                <div>
                  <MultipleUpload :uploaded-files="uploadedFiles" cols="12" @on-files-change="handleFilesChange" />
                </div>

                <div v-if="selectedNutrients.length > 0" class="mt-6">
                  <p class="px-2 font-weight-medium">Selected Nutrients</p>

                  <SoilReportNutrientInputs :selected-nutrients="selectedNutrients"
                    @on-selected-nutrients-change="onSelectedNutrientsChange" @on-remove="removeNutrientFromSelected" />
                </div>
              </v-col>

              <v-col cols="12">
                <p class="px-2 font-weight-medium">
                  Reports Physical Characteristics
                </p>
                <v-card width="100%" variant="tonal" class="pb-6 px-4">
                  <v-container fluid>
                    <v-row>
                      <template v-for="item in reportPhysicalCharacteristics" :key="item.id">
                        <v-col cols="12" xs="12" sm="4" md="2" class="pa-0 mt-6" align-self="end">
                          <p class="px-2 font-weight-medium">
                            {{ item.label }}
                          </p>
                        </v-col>
                        <v-col cols="12" xs="12" sm="8" md="10" class="pa-0" align-self="center">
                          <v-text-field density="compact" variant="filled" :hide-details="true" class="elevation-0 mt-1"
                            :placeholder="item.label" />
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <v-col cols="12" class="mt-4">
                <div class="text-end">
                  <v-btn color="primary" size="large">Finish</v-btn>
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
