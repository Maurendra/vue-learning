import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    logout: ({ commit }) => {
      commit("setUser", null);
    },
  },
});

export default store;
