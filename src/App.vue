<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <p class="display-1 mb-0 blue--text text--lighten-5">Vue TODO</p>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/yihsuan717/vue-todo" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-content class="grey lighten-5">
      <todo-list></todo-list>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import TodoList from "@/components/TodoList.vue";

export default Vue.extend({
  name: "App",

  components: {
    // HelloWorld
    "todo-list": TodoList
  }
});
</script>
