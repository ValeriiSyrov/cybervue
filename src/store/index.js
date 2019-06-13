import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import articles from './modules/articles'
import calendar from './modules/calendar'
import categories from './modules/categories'
import home from './modules/home'
import notifications from './modules/notifications'
import settings from './modules/settings'
import user from './modules/user'
import users from './modules/users'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		articles,
		calendar,
		categories,
		home,
		notifications,
		settings,
		user,
		users,
		permission
	},
	getters
})

export default store
