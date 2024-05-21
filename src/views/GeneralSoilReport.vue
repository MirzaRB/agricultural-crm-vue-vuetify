<script lang="ts" setup>
import { ref, watch } from "vue";
import Button from "@/components/Button.vue";
import { useRouter, useRoute } from "vue-router";
import NutrientBreakdownCharts from "@/components/NutrientBreakdownCharts.vue";
import CircularChart from "@/components/CircularChart.vue";
const router = useRouter();
const { query } = useRoute();





const reportPhysicalCharacteristics = ref([
  {
    label: "General Description",
    value: "",
  },
  {
    label: "Information Rate",
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
    label: "Etc...",
    value: "",
  },
]);





const currentGeneralPerctData = ref({
  series: [67],
  chartOptions: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
            color: "#fff",
          },
          value: {
            show: true,
            color: "#333",
            offsetY: 13,
            fontSize: "2rem",
          },
        },
        // track: {
        //   background: "#8DC44D",
        // },
      },
    },

    stroke: {
      lineCap: "round",
    },
    fill: {
      colors: ["#68C100"],
    },
    labels: ["Volatility"],
  },
});

const nutrientBreakdownData = [
  {
    title: "Nitrogen",
    key: "nitrogen",
    options: [
      {
        id: "nitrate-nitrogen-n",
        name: "Nitrate-Nitrogen -N",
        value: 49.9,
      },
      {
        id: "n2",
        name: "Nitrate",
        value: 49.9,
      },
    ],
  },
];



const healthStatusChartData = ref({
  series: [
    {
      name: "Health",
      data: [50, 60, 70, 20, 80, 75, 90, 70, 60],
    },
  ],
  chartOptions: {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  },
});



const trendData = ref({
  isUpward: true,
  progress: 25,
  progressText: "Since Previous Test",
})



const selectedNutrientId = ref(query.nutrientId as string);

watch(selectedNutrientId, (val) => {
  router.push({
    path: "general-soil-report",
    query: {
      nutrientId: val,
    },
  });
})

</script>

<template>
  <v-container fluid class="h-100 px-2 px-sm-8 px-md-12">
    <v-row>
      <v-col cols="12">
        <div class="bg-white px-3 py-8 pa-sm-10 rounded-xl">
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="12" xs="12" sm="4" md="6">
                <h3>General Soil Report 5/1</h3>
              </v-col>
              <v-col cols="12" xs="12" sm="8" md="6" class="text-center text-md-end">
                <router-link to="/" class="text-secondary text-decoration-none mr-4">Go to Plant
                  Overview</router-link>
                <Button text="View Soil Test PDF" color="primary" />
              </v-col>
            </v-row>
            <v-row>
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
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="px-2 font-weight-medium">Nutrient Breakdown</p>
                <v-container fluid class="bg-light-grey rounded-xl">
                  <v-row>
                    <v-col cols="12" xs="12" sm="12" md="6">
                      <div class="rounded-lg bg-white px-2 py-4">
                        <div class="px-2" v-for="nutrientCategory in nutrientBreakdownData" :key="nutrientCategory.key">
                          <p class="font-weight-medium mb-2">{{ nutrientCategory.title }}</p>
                          <div class="px-3" v-for="nutrient in nutrientCategory.options" :key="nutrient.id">
                            <input type="radio" hidden v-model="selectedNutrientId" :value="nutrient.id" :id="nutrient.id"
                              class="mr-2" />
                            <label class="d-flex align-center justify-space-between"
                              :class="selectedNutrientId === nutrient.id ? 'text-high-emphasis' : 'text-medium-emphasis'"
                              :for="nutrient.id">
                              <span>{{ nutrient.name }}</span> <span>{{ nutrient.value }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="6">
                      <NutrientBreakdownCharts v-if="selectedNutrientId" :line-chart-data="healthStatusChartData"
                        :progress-bar-data="trendData" />
                    </v-col>

                  </v-row>
                </v-container>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="text-center">
                  <p class="text-h6 text-center font-weight-bold">Goal Fulfillment Percentage</p>

                  <CircularChart width="100%" :height="250" :options="currentGeneralPerctData.chartOptions"
                    :series="currentGeneralPerctData.series" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
