// Utilities
import { reactive } from "vue";

const store = reactive({
  isAppLoading: false,
  isDrawerOpen: false,
  currentRoute: "",
  loggedInUser: null,

  setAppLoading(isLoading: boolean) {
    this.isAppLoading = isLoading;
  },

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  },

  setLoggedInUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    this.loggedInUser = user;
  },

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  },

  getUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
});

export default store;
