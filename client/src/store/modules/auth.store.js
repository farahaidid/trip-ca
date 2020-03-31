
import { API } from "../../axios/config.axios"

const initialState = {
   loggedIn: false,
   loggedUser: {}
}

const state = { ...initialState }

const getters = {
   LOGGED_IN: state => state.loggedIn,
   LOGGED_USER: state => state.loggedUser
}

const mutations = {
   SET_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   },
   SET_AUTH_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   }
}

const actions = {
   LOGIN: ({ commit }, { email, password }) => new Promise(async resolve => {
      try {
         let user = (await API.post("user/login", { email, password })).data
         commit("SET_STATE", { loggedIn: true, loggedUser: user })
         resolve({ user })
      }
      catch (error) { resolve({ error: error.response.data.message }) }
   }),
   FETCH_USER_PROFILE: async ({ commit, state }) => {
      let { _id, token } = state.loggedUser
      try {
         let user = (await API.get(`user/${_id}?token=${token}`)).data
         commit("SET_STATE", { loggedUser: { ...user, token } })
      }
      catch (error) {
         console.log(error.response)
      }
   },
   UPDATE_USER_PROFILE: ({ dispatch, state }, data) => new Promise(async resolve => {
      let { _id, token } = state.loggedUser
      try {
         let response = (await API.patch(`user/${_id}?token=${token}`, { ...data })).data
         if (response.message === "UPDATED") { dispatch("FETCH_USER_PROFILE") }
         resolve(response)
      }
      catch (error) { resolve({ error: error.response.data.message }) }
   }),
   RESET_PASSWORD: ({ }, data) => new Promise(async resolve => {
      try {
         let response = (await API.post('reset-password', data)).data
         if (response.message === "RESET DONE") { resolve(response) }
      }
      catch (error) { resolve({ error: error.message }) }
   })
}

export default {
   namespaced: true, state,
   getters, mutations, actions
}