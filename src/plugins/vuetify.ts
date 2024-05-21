/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  display: {
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
  defaults: {
    global: {},
    VBtn: {
      solo: true,
    },
    VTextField: {
      filled: true,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          "main-bg": "#F4FBFB",
          "on-main-bg": "#2D3540",
          primary: "#8DC44D",
          "on-primary": "#FFFFFF",
          secondary: "#2D3540",
          "light-grey": "#EEEEEE",
          surface: "#FFFFFF00",
          "on-surface": "#2D3540",
        },
        variables: {
          "high-emphasis-opacity": "1",
          "medium-emphasis-opacity": "0.6",
          "layout-topbar-height": "88px",
          "layout-top": "88px",
        },
      },
    },
  },
});
