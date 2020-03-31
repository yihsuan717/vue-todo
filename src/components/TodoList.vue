<template>
  <v-container id="container">
    <v-row align="start" justify="center">
      <v-col class="text-center">
        <h1
          class="display-3 blue--text text--lighten-4 font-weight-medium my-3"
        >
          TODOS
        </h1>

        <v-card>
          <v-list class="pa-0" flat>
            <v-list-item class="pa-0">
              <v-text-field
                :label="'New todo input'"
                @keydown.enter="addTodo"
                autofocus
                autocomplete="off"
                clearable
                color="primary"
                hide-details
                maxlength="1023"
                placeholder="What needs to be done?"
                solo
                flat
                v-model="newTodo"
              ></v-text-field>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mt-3">
          <v-card-actions class="px-3" v-show="todos.length">
            <v-progress-circular
              v-show="filterType === 'all'"
              :value="progress"
              color="blue"
              size="28"
              class="mr-2"
            ></v-progress-circular>
            <span class="primary--text">
              {{ remaining }}
            </span>

            <v-spacer></v-spacer>

            <v-btn-toggle
              class="elevation-0"
              mandatory
              v-model="filterType"
              v-show="todos.length"
            >
              <v-btn
                :key="key"
                :value="key"
                class="mx-0"
                color="primary"
                text
                small
                v-for="(val, key) in filters"
              >
                {{ key }}
              </v-btn>
            </v-btn-toggle>
          </v-card-actions>
          <v-list class="pa-0">
            <template v-for="todo in filteredTodos">
              <v-divider :key="`${todo.uid}-divider`"></v-divider>
              <v-list-item :key="todo.uid">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="todo.done"
                    @change="toggleTodo(todo)"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content
                  :class="{ 'primary--text': todo.done, completed: todo.done }"
                  >{{ todo.text }}</v-list-item-content
                >
                <v-list-item-action>
                  <v-btn @click="removeTodo(todo)" color="red lighten-3" icon>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <!-- footer -->
        <footer-layout class="mt-6"></footer-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { TodoItem } from "@/types";
import { mapActions } from "vuex";
import FooterInfo from "@/components/FooterInfo.vue";

export default Vue.extend({
  name: "TodoList",
  components: {
    "footer-layout": FooterInfo
  },
  data() {
    return {
      newTodo: "",
      filters: {
        all: (todos: TodoItem[]) => todos,
        active: (todos: TodoItem[]) => todos.filter(todo => !todo.done),
        completed: (todos: TodoItem[]) => todos.filter(todo => todo.done)
      } as any,
      filterType: "all"
    };
  },
  methods: {
    ...mapActions(["removeTodo", "toggleTodo"]),
    addTodo() {
      const text = this.newTodo.trim();
      if (text) {
        this.$store.dispatch("addTodo", text);
      }
      this.newTodo = "";
    }
  },
  computed: {
    todos(): TodoItem[] {
      return this.$store.state.todos;
    },
    remaining(): string {
      let remaining = "";
      switch (this.filterType) {
        case "all":
          remaining = `${
            this.$store.state.todos.filter((todo: TodoItem) => todo.done).length
          } / ${this.$store.state.todos.length}`;
          break;
        case "active":
          remaining = `${
            this.$store.state.todos.filter((todo: TodoItem) => !todo.done)
              .length
          } items active`;
          break;
        case "completed":
          remaining = `${
            this.$store.state.todos.filter((todo: TodoItem) => !todo.done)
              .length
          } items completed`;
          break;
        default:
          break;
      }
      return remaining;
    },
    progress() {
      console.log(`this: ${this}`);
      return (
        (this.$store.state.todos.filter((todo: TodoItem) => todo.done).length /
          this.$store.state.todos.length) *
        100
      );
    },
    filteredTodos(): TodoItem[] {
      let res = [];
      if (this.filterType === "all") {
        res = this.$store.state.todos;
      } else if (this.filterType === "active") {
        res = this.$store.state.todos.filter((todo: TodoItem) => !todo.done);
      } else if (this.filterType === "completed") {
        res = this.$store.state.todos.filter((todo: TodoItem) => todo.done);
      }
      return res;
    }
  }
});
</script>

<style lang="scss" scoped>
#container {
  max-width: 550px;

  .completed {
    text-decoration: line-through;
  }
}
</style>
