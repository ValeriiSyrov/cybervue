import { getHomeInfo } from '@/api/home'

const state = {
    recent_publishing: {},
    pending_articles: {},
    categories: {},
    users: null
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
    SET_USERS_COUNT: (state, users) => {
        state.users = users
    }
}

const actions = {
    getHomeInfo({commit}, [page, limit]) {
        return new Promise((resolve, reject) => {
            getHomeInfo({page: page, limit: limit}).then(response => {
                console.log(response.data)

                commit('SET_RECENT_PUBLISHING', response.data.approvedArticleList)
                commit('SET_PENDING_ARTICLES', response.data.pendingArticleList)
                commit('SET_CATEGORIES', response.data.categoryList)
                commit('SET_USERS_COUNT', response.data.countUsers)

                commit('user/SET_USER_INFO', response.data.user, {root: true})

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
