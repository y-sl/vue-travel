import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
  city: "武汉"
}
const mutations = {
  changeCity (state, city) {
    state.city = city;
  }
}
export default new Vuex.Store({
  state,
  mutations
})