import { getArticle, deleteArticle } from '@/api/articles'

const state = {
    articles: {}
}

const mutations = {
    SET_ARTICLES: (state, articles) => {
        state.articles = articles
    },
}

const actions = {
    getArticle({commit}, data) {
        return new Promise((resolve, reject) => {
            getArticle(data).then(response => {

                commit('SET_ARTICLES', response.data)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    deleteArticle({}, id) {
        return new Promise((resolve, reject) => {
            deleteArticle(id).then(response => {
                resolve()
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
