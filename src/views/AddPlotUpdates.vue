<script lang="ts" setup>
import MultipleUpload from "@/components/MultipleUpload.vue";
import Button from "@/components/Button.vue";
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";


const router = useRouter();
const route = useRoute();
const { mdAndDown } = useDisplay();
const plotId = route.params.plotId;


const uploadedFiles: Ref<File[]> = ref([]);

const updateTypeTabsData = ref([
  {
    label: "Fertilizer Application",
    value: "fertilizer",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Seeding New Crop",
    value: "seedingNewCrop",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Weather",
    value: "weather",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Live Stock",
    value: "liveStock",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Management",
    value: "management",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Irrigation",
    value: "irrigation",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
  {
    label: "Other",
    value: "other",
    fields: [
      { label: "Cost Per Acre", placeholder: "20$", type: "number", value: "", id: "cost-per-acre" },
      { label: "Rate", placeholder: "70$", type: "number", value: "", id: "rate" },
      { label: "Type", placeholder: "ABC Type", type: "text", value: "", id: "type" },
    ]
  },
]);

const handleFilesChange = (files: File[]) => {
  uploadedFiles.value = files;
};

const handleTabClick = (tab: string) => {
  router.push({ path: "/add-plot-updates", query: { tab } });
};

const dateOfUpdate = ref("");

const updateTypeTab = ref(route.query.tab);
</script>

<template>
  <v-container fluid class="h-100 px-2 px-sm-8 px-md-12">
    <v-row>
      <v-col cols="12">
        <div class="bg-white px-3 py-8 pa-sm-10 rounded-xl">
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="12">
                <h3>Plot Updates</h3>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6">
                <p class="px-2 font-weight-medium">Select Date of Update</p>
                <v-text-field ref="dateOfUpdate" type="date" density="comfortable" variant="solo" :hide-details="true"
                  class="elevation-0 mt-1 bg-light-grey rounded-lg" />
              </v-col>

              <v-col cols="12" class="mt-4">
                <div class="">
                  <p class="px-2">Description Of Updates</p>

                  <div class="bg-light-grey rounded-xl mt-1">
                    <v-container fluid class="">
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="4" lg="3" xl="2">
                          <v-tabs v-model="updateTypeTab" :direction="mdAndDown ? 'horizontal' : 'vertical'"
                            class="pa-2 bg-white rounded-lg h-100">
                            <template v-for="tabData in updateTypeTabsData" :key="tabData.value">
                              <v-tab :value="tabData.value" @click="handleTabClick(tabData.value)">{{ tabData.label
                              }}</v-tab>
                            </template>
                          </v-tabs>
                        </v-col>

                        <v-col cols="12" xs="12" sm="12" md="8" lg="9" xl="10" class="">
                          <v-window v-model="updateTypeTab">
                            <template v-for="(tabData) in updateTypeTabsData" :key="tabData.value">
                              <v-window-item :value="tabData.value">
                                <v-container fluid>
                                  <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="6" lg="6" v-for="field in tabData.fields"
                                      :key="field.id">
                                      <div>
                                        <p v-if="!!field.label" class="px-2 font-weight-medium">{{ field.label }}</p>
                                        <v-text-field v-model="field.value" :type="field.type" variant="solo" hide-details
                                          :placeholder="field.placeholder" density="comfortable"
                                          class="rounded-lg mt-1 elevation-0 font-weight-medium custom-input" />
                                      </div>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-window-item>
                            </template>
                          </v-window>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" class="mt-2">
                <MultipleUpload cols="12" xs-cols="12" sm-cols="12" md-cols="6" lg-cols="4"
                  :uploaded-files="uploadedFiles" @on-files-change="handleFilesChange" />
              </v-col>

              <v-col cols="12" class="mt-2">

                <div class="text-end">
                  <Button text="Finish" color="primary" size="large" class="font-weight-medium" />
                </div>

              </v-col>
            </v-row>
          </v-container>


        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-input {
  box-shadow: none !important;
  background-color: #969a9f33 !important;
}
</style>
