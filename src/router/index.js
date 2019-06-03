import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},

	{
		path: '/signup',
		component: () => import('@/views/signup/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},

	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import('@/views/dashboard/index'),
			meta: { title: 'Home', icon: 'dashboard' }
		}]
	},

	{
		path: '/categories',
		component: Layout,
		redirect: '/categories',
		children: [{
			path: 'categories',
			name: 'Categories',
			component: () => import('@/views/categories/index'),
			meta: { title: 'Categories', icon: 'categories' }
		}]
	},

	{
		path: '/articles',
		component: Layout,
		redirect: '/articles',
		children: [{
			path: 'articles',
			name: 'Articles',
			component: () => import('@/views/articles/index'),
			meta: { title: 'Articles', icon: 'articles' }
		}]
	},

	{
		path: '/edit',
		component: Layout,
		redirect: '/edit/edit',
		hidden: true,
		children: [{
			path: 'edit/:id',
			name: 'Edit',
			component: () => import('@/views/edit_article/index'),
		}]
	},

	{
		path: '/calendar',
		component: Layout,
		redirect: '/calendar',
		children: [{
			path: 'calendar',
			name: 'Calendar',
			component: () => import('@/views/calendar/index'),
			meta: { title: 'Calendar', icon: 'calendar' }
		}]
	},

	{
		path: '/users',
		component: Layout,
		redirect: '/users',
		children: [{
			path: 'users',
			name: 'Users',
			component: () => import('@/views/users/index'),
			meta: { title: 'Users', icon: 'user' }
		}]
	},

	{
		path: '/notifications',
		component: Layout,
		redirect: '/notifiations',
		children: [{
			path: 'notifiations',
			name: 'Notifiations',
			component: () => import('@/views/notifications/index'),
			meta: { title: 'Notifiations', icon: 'notification' }
		}]
	},

	{
		path: '/settings',
		component: Layout,
		redirect: '/settings',
		children: [{
			path: 'settings',
			name: 'Settings',
			component: () => import('@/views/settings/index'),
			meta: { title: 'Settings', icon: 'setting' }
		}]
	},

	// 404 page must be placed at the end !!!
	{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
