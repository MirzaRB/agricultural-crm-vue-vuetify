<script lang="ts" setup>
import store from "@/store";
import { ref } from "vue";
import SelectInput, { SelectOption } from "@/components/Inputs/SelectInput.vue";



const plotSelectData: SelectOption[] = [
  { value: "", label: "Select a Plot" },
  { value: "gardenPlot1", label: "Garden Plot 1" },
  { value: "gardenPlot2", label: "Garden Plot 2" },
  { value: "gardenPlot3", label: "Garden Plot 3" },
];
const plot = ref(plotSelectData[0]);

const onPlotChange = (value: SelectOption) => {
  plot.value = value;
};


</script>

<template>
  <v-navigation-drawer temporary v-model="store.isDrawerOpen" style="height: calc((100% - 64px) - 24px); top: 88px;">
    <div class="d-flex align-center py-4 px-2">
      <v-img src="../../assets/images/profile.png" alt="Profile" class="profile-avatar mr-3 flex-shrink-1" cover />
      <div class="flex-grow-1">
        <p class="text-caption font-weight-bold text-medium-emphasis">
          Hello
        </p>
        <p class="font-weight-medium">Farmer John Doe</p>
      </div>
    </div>

    <v-divider></v-divider>

    <div class="px-2 mt-4">


      <router-link to="/home"
        class="text-primary text-decoration-none font-weight-medium text-uppercase px-4">Home</router-link>

      <SelectInput :data="plotSelectData" :value="plot" bg-color="transparent" @on-change="onPlotChange" />
    </div>
  </v-navigation-drawer>
</template>