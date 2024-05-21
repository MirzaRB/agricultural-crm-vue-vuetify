<script lang="ts" setup>
import { ref } from "vue";
import SelectInput, { SelectOption } from "@/components/Inputs/SelectInput.vue";
import { useDisplay } from "vuetify";
import store from "@/store";


const { lgAndUp } = useDisplay();

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
  <v-app-bar class="px-4 px-md-8  py-3 bg-white">
    <router-link to="/" class="text-decoration-none text-secondary">
      <h2 class="text-h4" tag="h2">Ag Records</h2>
    </router-link>

    <v-spacer />
    <div v-if="lgAndUp" class="d-flex align-center">
      <router-link to="/home"
        class="mr-6 text-primary text-decoration-none font-weight-medium text-uppercase">Home</router-link>

      <SelectInput :data="plotSelectData" :value="plot" bg-color="transparent" @on-change="onPlotChange" />

      <div class="d-flex">
        <v-img src="../../assets/images/profile.png" alt="Profile" class="profile-avatar mr-3" width="50" cover />
        <div>
          <p class="text-caption font-weight-bold text-medium-emphasis">
            Hello
          </p>
          <p class="font-weight-medium">Farmer John Doe</p>
        </div>
      </div>
    </div>




    <v-btn v-if="!lgAndUp" icon="mdi-menu" @click.stop="store.toggleDrawer()" />

  </v-app-bar>
</template>
