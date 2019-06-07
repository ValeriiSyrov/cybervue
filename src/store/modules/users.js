import { getUsers, deleteUser, updateUser, createUser } from '@/api/users'

const state = {
    users: {}
}

const mutations = {
    SET_USERS: (state, users) => {
        state.users = users
    }
}

const actions = {
    getUsers({commit}, data) {
        return new Promise((resolve, reject) => {
            getUsers(data).then(response => {
                commit('SET_USERS', response.data)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    deleteUser({commit}, id ) {
        return new Promise((resolve, reject) => {
            deleteUser(id).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateUser({},[data, id]) {
        return new Promise((resolve, reject) => {
            updateUser(data, id).then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    createUser({},data) {
        return new Promise((resolve, reject) => {
            createUser(data).then(response => {

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
