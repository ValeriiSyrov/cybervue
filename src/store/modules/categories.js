import { getCategory, deleteCategory, createCategory, updateCategory } from '@/api/categories'

const state = {
    categories: {}
}

const mutations = {
    SET_CATEGORIES: (state, categories) => {
        state.categories = categories
    },
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

    createCategory({commit}, data) {
        return new Promise((resolve, reject) => {
            createCategory(data).then(response => {

                commit('home/ADD_NEW_CATEGORY', response.data, {root: true})

                resolve(response)
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
    },

    updateCategory({commit, dispatch}, [data, id]) {
        return new Promise((resolve, reject) => {
            updateCategory(data, id).then(response => {

                dispatch('editCategoryList', response.data)

                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    editCategoryList({commit, dispatch, rootState}, editable_category) {
        let categories = rootState.home.categories
        let docs = categories.docs.map(category => {
            if (category._id == editable_category._id) {
                category = editable_category
            }

            return category
        })

        categories.docs = docs

        commit('home/SET_CATEGORIES', categories, {root: true})
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
