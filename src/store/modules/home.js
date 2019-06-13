import { getHomeInfo } from '@/api/home'
import { getCategory } from '@/api/categories'
import { getArticle, getArticleById, updateArticle } from '@/api/articles'

const state = {
    recent_publishing: {},
    pending_articles: {},
    categories: {},
    users: null,
    events: [],

    editable_article: {}
}

const mutations = {
    SET_RECENT_PUBLISHING: (state, recent_publishing) => {
        state.recent_publishing = recent_publishing
    },
    SET_PENDING_ARTICLES: (state, pending_articles) => {
        state.pending_articles = pending_articles
    },
    SET_CATEGORIES: (state, categories) => {
        state.categories = categories
    },
    ADD_NEW_CATEGORY: (state, category) => {
        state.categories.docs.push(category)
    },
    SET_USERS_COUNT: (state, users) => {
        state.users = users
    },
    SET_EVENTS: (state, events) => {
        state.events = events
    },
    SET_EDITABLE_ARTICLE: (state, editable_article) => {
        state.editable_article = editable_article
    }
}

const actions = {
    getHomeInfo({commit}, data) {
        return new Promise((resolve, reject) => {
            getHomeInfo(data).then(response => {
                commit('SET_RECENT_PUBLISHING', response.data.approvedArticleList)
                commit('SET_PENDING_ARTICLES', response.data.pendingArticleList)
                commit('SET_CATEGORIES', response.data.categoryList)
                commit('SET_USERS_COUNT', response.data.countUsers)
                commit('SET_EVENTS', response.data.events)

                commit('user/SET_USER_INFO', response.data.user, {root: true})

                commit('user/SET_NAME', response.data.user.login, {root: true}) // name
                commit('user/SET_AVATAR', 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png', {root: true}) // avatar
                commit('user/SET_ROLES', [(response.data.user.superUser) ? 'admin' : 'editor'], {root: true})
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    getCategory({commit}, data) {
        return new Promise((resolve, reject) => {
            getCategory(data).then(response => {
                commit('SET_CATEGORIES', response.data)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    getArticle({commit}, [type, data]) {
        return new Promise((resolve, reject) => {
            getArticle(data).then(response => {

                commit(type.type, response.data)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    getArticleById({commit}, id) {
        return new Promise((resolve, reject) => {
            getArticleById(id).then(response => {

                commit('SET_EDITABLE_ARTICLE', response.data)

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateArticle({}, [data, id]) {
        return new Promise((resolve, reject) => {
            updateArticle(data, id).then(response => {

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
