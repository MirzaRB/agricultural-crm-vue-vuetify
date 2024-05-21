import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/default/Default.vue";
import LoginLayout from "@/layouts/NotLoggedInUser/View.vue";
import HomeView from "@/views/Home.vue";
import AddPlotUpdatesView from "@/views/AddPlotUpdates.vue";
import AddNewPlotView from "@/views/AddNewPlot.vue";
import AddSoilReportView from "@/views/AddSoilReport.vue";
import GeneralSoilReportView from "@/views/GeneralSoilReport.vue";
import store from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { path: "/home" },
    component: DefaultLayout,
    children: [
      {
        name: "Home",
        path: "home",
        meta: { title: "Dashboard" },
        component: HomeView,
      },
      {
        path: "add-plot-updates",
        component: AddPlotUpdatesView,
        meta: { title: "Add Plot Updates" },
      },
      {
        path: "add-new-plot",
        component: AddNewPlotView,
        meta: { title: "Add New Plot" },
      },
      {
        path: "add-soil-report",
        component: AddSoilReportView,
        meta: { title: "Add Soil Report" },
      },
      {
        path: "general-soil-report",
        component: GeneralSoilReportView,
      },
    ],
  },
  {
    path: "/login",
    component: LoginLayout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.path === "/login" && !store.getUserFromLocalStorage()) {
    console.log("No user found in local storage");
    next();
    return;
  }

  if (to.path === "/login" && store.getUserFromLocalStorage()) {
    console.log("User found in local storage and on login page");
    next("/");
    return;
  }

  if (to.path !== "/login" && store.getUserFromLocalStorage()) {
    console.log("User found in local storage and not on login page");
    next();
    return;
  }
  console.log("No user found in local storage and not on login page");
  next("/login");
});

export default router;
