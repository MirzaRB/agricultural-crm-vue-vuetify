<script lang="ts" setup>
import CircularChart from "@/components/CircularChart.vue";
import SelectInput, { SelectOption } from "@/components/Inputs/SelectInput.vue";
import ProgressBar from "@/components/Progressbar.vue";
import { ref } from "vue";
import { useDisplay } from 'vuetify'
import { useRouter } from "vue-router";
import { computed } from "vue";
import Button from "@/components/Button.vue";

const router = useRouter();
const { smAndDown } = useDisplay();

const soilTestDateData = [
  { value: "", label: "View Soil Test" },
  { value: "21", label: "2/1" },
  { value: "51", label: "5/1" },
  { value: "101", label: "10/1" },
];

const soilTestDate = ref(soilTestDateData[0]);

const reportYearData = [
  { value: "", label: "View Yearly Report" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
];

const reportYear = ref(reportYearData[0]);

const onSoilTestDateChange = (value: SelectOption) => {
  soilTestDate.value = value;
  if (soilTestDate.value.value !== "") { router.push({ path: "/general-soil-report", query: { date: soilTestDate.value.value } }) }
};

const onReportYearChange = (value: SelectOption) => {
  reportYear.value = value;
};

const healthStatusChartData = ref({
  series: [
    {
      name: "Health",
      data: [50, 60, 70, 20, 80, 75, 90, 70, 60],
    },
  ],
  chartOptions: {
    chart: {
      height: "700px",
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

const currentGeneralPerctData = ref({
  series: [67],
  chartOptions: {
    chart: {
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

const returnContainerClass = computed(() => {
  if (smAndDown.value) {
    return "px-4";
  } else {
    return "px-12";
  }
});
</script>

<template>
  <v-container fluid :class="returnContainerClass" class="h-100">
    <v-row class="">
      <v-col cols="12" md="12" lg="3" align-self="center">
        <div class="text-h5 font-weight-medium">Garden Plot 1</div>
      </v-col>

      <v-col cols="12" xs="12" sm="8" md="8" lg="6" align-self="center">
        <div class="d-flex flex-wrap">
          <SelectInput :data="soilTestDateData" :value="soilTestDate" bg-color="transparent"
            @on-change="onSoilTestDateChange" />

          <SelectInput :data="reportYearData" :value="reportYear" bg-color="transparent"
            @on-change="onReportYearChange" />
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="4" md="4" lg="3" align-self="center">
        <div class="text-md-end">
          <Button text="Add New Plot" color="primary" before-text-icon="mdi-plus" size="large"
            @click="router.push('/add-new-plot')" />
        </div>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="8" lg="8">
        <div class="bg-white px-5 py-8 rounded-xl">
          <div class="d-flex justify-space-between flex-wrap">
            <h3 class="text-h6 mb-4">General Soil Health Status</h3>
            <span class="text-medium-emphasis mb-4">Goal Completion Percentage</span>
          </div>

          <div>
            <apexchart width="100%" height="400" type="line" :options="healthStatusChartData.chartOptions"
              :series="healthStatusChartData.series"></apexchart>
          </div>
        </div>
        <div class="d-flex justify-center justify-sm-end flex-wrap">
          <Button text="Add Soil Report" class="mt-8" color="primary" before-text-icon="mdi-plus" size="large"
            @click="router.push('/add-soil-report')"></Button>

          <Button text="Add Plot Update" class="mt-8 ml-2 ml-sm-4" prepend-icon="mdi-plus" size="large"
            @click="router.push('/add-plot-updates')" />

        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <div class="d-flex flex-column rounded-xl bg-white px-5 py-8 h-100">
          <h3 class="text-h6">Current General Percentage</h3>

          <div id="perct-chart">
            <CircularChart width="100%" :height="300" :options="currentGeneralPerctData.chartOptions"
              :series="currentGeneralPerctData.series" />
          </div>
          <v-spacer />
          <h3 class="text-xl">Current Trends</h3>
          <ProgressBar :progress="50" :is-upward="true" :progress-text="'Since last year'" />
          <ProgressBar :progress="60" :is-upward="false" :progress-text="'this year'" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
