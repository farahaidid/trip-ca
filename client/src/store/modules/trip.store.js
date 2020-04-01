
import { API } from "../../axios/config.axios"

const initialState = {
   trips: []
}

const state = { ...initialState }

const getters = { TRIPS: state => state.trips }

const mutations = {
   SET_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   },
   SET_TRIP_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   }
}

const actions = {
   SAVE_TRIP: ({ commit, state, rootState }, { city, dateFrom, dateTo, price }) => new Promise(async resolve => {
      try {
         let { _id, token } = rootState.AUTH.loggedUser
         let data = {
            city, dateFrom: new Date(dateFrom).toISOString(),
            dateTo: new Date(dateTo).toISOString(),
            price
         }
         let trip = (await API.post(`user/${_id}/trips?token=${token}`, data)).data
         let trips = [{ ...trip }, ...state.trips]
         commit("SET_STATE", { trips })
         resolve({ message: "Trip saved successfully!" })
      }
      catch (error) { resolve({ error: error.message }) }
   }),
   FETCH_TRIPS: ({ commit, rootState }) => new Promise(async resolve => {
      try {
         let { _id, token } = rootState.AUTH.loggedUser
         let trips = (await API.get(`user/${_id}/trips?token=${token}`)).data
         console.log("TRIPS", trips)
         commit("SET_STATE", { trips })
      }
      catch (error) { resolve({ error: error.message }) }
   }),
   DELETE_TRIP: ({ dispatch, state, rootState }, tripId) => new Promise(async resolve => {
      try {
         let { _id, token } = rootState.AUTH.loggedUser
         await API.delete(`user/${_id}/trip/${tripId}?token=${token}`)
         dispatch("FETCH_TRIPS")
      }
      catch (error) { resolve({ error: error.message }) }
   })
}

export default {
   namespaced: true, state,
   getters, mutations, actions
}