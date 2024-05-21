<template>
  <v-container class="h-100" fluid>
    <v-row class="justify-center h-100">
      <v-col cols="12" sm="8" md="6" align-self="center">
        <div class="px-4 py-10 bg-white rounded-xl px-sm-10 py-sm-14">

          <h2 class="text-h3">Login</h2>

          <TextInput :value="email" label="Enter your Email" type="email" bg-color="light-grey" @on-change="onEmailChange"
            container-classes="mt-12" />

          <TextInput :value="password" label="Password" type="password" bg-color="light-grey"
            @on-change="onPasswordChange" container-classes="mt-6" />

          <div class="mt-6 text-end">
            <v-btn class="font-weight-medium" size="large" color="primary" @click.prevent="handleSubmit">Log In</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" setup>

import { useRouter } from "vue-router";
import TextInput from "@/components/Inputs/TextInput.vue";
import { ref } from "vue"
import store from "@/store";

const router = useRouter();

const email = ref('');
const password = ref('');

const onEmailChange = (value: string) => {
  email.value = value;
}
const onPasswordChange = (value: string) => {
  password.value = value;
}

const handleSubmit = () => {
  console.log(email.value, password.value)
  store.setLoggedInUser({ email: email.value, password: password.value })
  router.push('/home')
}


</script>