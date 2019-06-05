import { getCategory, deleteCategory } from '@/api/categories'

const state = {
    categories: {}
}

const mutations = {
    SET_CATEGORIES: (state, categories) => {
        state.categories = categories
    }
}

const actions = {
    getCategory({commit}, data) {
        return new Promise((resolve, reject) => {
            getCategory().then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    deleteCategory({}, id) {
        return new Promise((resolve, reject) => {
            deleteCategory(id).then(response => {


                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    deleteCategoryFromList({commit, dispatch, rootState}, id) {
        let categories = rootState.home.categories
        let docs = categories.docs.filter(cetogory => {
            return cetogory._id !== id
        })

        categories.docs = docs

        commit('home/SET_CATEGORIES', categories, {root: true})
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
