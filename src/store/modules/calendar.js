import { createEvent, updateEvent, deleteEvent, getEvents } from '@/api/calendar'

const state = {
    events: []
}

const mutations = {
    SET_EVENTS: (state, events) => {
        state.events = events
    }
}

const actions = {
    getEvents({commit}, data) {
        return new Promise((resolve, reject) => {
            getEvents(data).then(response => {

                commit('SET_EVENTS', response.data)

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateEvent({}, [data, id]) {
        return new Promise((resolve, reject) => {
            updateEvent(data, id).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    deleteEvent({}, id) {
        return new Promise((resolve, reject) => {
            deleteEvent(id).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    createEvent({}, data) {
        return new Promise((resolve, reject) => {
            createEvent(data).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
