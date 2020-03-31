import Vue from 'vue'
import Vuex from 'vuex'

// Persisted State
import createPersistedState from "vuex-persistedstate"

// Using vuex
Vue.use(Vuex)

// Modules
import AUTH from "../store/modules/auth.store"
import TRIP from "../store/modules/trip.store"

export default new Vuex.Store({
   plugins: [createPersistedState()],
   modules: {
      AUTH, TRIP
   }
})
