import Vue from "vue";
import Vuex from "vuex";
import { TodoItem } from "@/types";

Vue.use(Vuex);

const STORAGE_KEY = 'vue-todo'

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as TodoItem[]
  },
  mutations: {
    addTodo(state, todo: TodoItem) {
      state.todos.push(todo)
    },
    removeTodo(state, todo: TodoItem) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo(state, { todo, text = todo.text, done = todo.done }) {
      todo.text = text
      todo.done = done
      const index = state.todos.indexOf(todo)
      state.todos.splice(index, 1, todo)
    }
  },
  actions: {
    addTodo({ commit }, text) {
      commit('addTodo', {
        uid: Date.now(),
        text,
        done: false
      })
    },
    removeTodo({ commit }, todo) {
      commit('removeTodo', todo)
    },
    toggleTodo({ commit }, todo) {
      commit('editTodo', { todo, done: !todo.done })
    },
  },
  plugins: [store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后调用
      // mutation 的格式为 { type, payload }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos))
      console.log(`${STORAGE_KEY} todo: `, state.todos);
    })
  }]
  // modules: {},
});
