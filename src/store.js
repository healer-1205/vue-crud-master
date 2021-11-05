import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchValue: localStorage.getItem('searchValue')? localStorage.getItem('searchValue') : "",
    selectedStatus: localStorage.getItem('selectedStatus')? localStorage.getItem('selectedStatus') : ""
  },
  mutations: {
    updateSearchValue: (state, payload) => {
      state.searchValue = payload;
      localStorage.setItem('searchValue', payload);
    },
    updateStatus: (state, payload) => {
      state.selectedStatus = payload;
      localStorage.setItem('selectedStatus', payload);
    }
  }
});

export default store;