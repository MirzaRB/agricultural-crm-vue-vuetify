// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import VueApexCharts from "vue3-apexcharts";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(VueApexCharts).use(vuetify).use(router);
}
