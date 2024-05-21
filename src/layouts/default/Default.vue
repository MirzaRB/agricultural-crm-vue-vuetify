<template>
  <v-app class="bg-main-bg">
    <default-bar />
    <default-drawer />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultDrawer from "./AppDrawer.vue";
import DefaultView from "./View.vue";

</script>
