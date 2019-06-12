<template>
    <div class="users-container">
		<el-header>
			<div class="users-header">
				<h3>Users</h3>

				<el-button type="danger"
				           @click="showModal"
						   v-text="'Add user'" />
			</div>
		</el-header>

		<el-main>
			<el-table v-loading="loading"
					  :data="users.docs"
					  element-loading-text="Loading"
					  border
					  fit
					  highlight-current-row
					  style="width: 100%" >

				<el-table-column align="center"
								 label="ID"
								 width="80"
								 type="index"
								 :index="indexMethod" />

				<el-table-column label="NICKNAME" min-width="150px">
					<template slot-scope="scope">
						{{ scope.row.login }}
					</template>
				</el-table-column>

				<el-table-column label="EMAIL" width="200">
					<template slot-scope="scope">
						{{ scope.row.email }}
					</template>
				</el-table-column>

				<el-table-column label="TEAM" width="200">
					<template slot-scope="scope">
						<ul><li v-for="(item, index) in scope.row.team" :key="index" v-text="item" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="SUBSCRIBE" width="250">
					<template slot-scope="scope">
						<ul><li v-for="(item, index) in scope.row.subscribe" :key="index" v-text="item" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="CALENDAR" width="300">
					<template slot-scope="scope">
						<ul><li v-for="(item, index) in scope.row.calendar" :key="index" v-text="item.event" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="status" width="250">
					<template slot-scope="scope">
						<div class="table-btns-wrapper">
							<el-button @click="handlerAnalytics(scope.row)" circle><svg-icon icon-class="analytics" /></el-button>
							<el-button @click="showNotifyModal(scope.row)" circle ><svg-icon icon-class="notification" /></el-button>
							<el-button @click="showModal(scope.row)" icon="el-icon-edit-outline" circle />
							<el-button @click="handlerDelete(scope.row._id)" icon="el-icon-delete" circle />
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-main>

		<el-footer>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pagination_page"
                layout="prev, pager, next"
				:total="users.totalDocs">
            </el-pagination>
        </el-footer>

		<el-dialog title="Edit user"
				   :visible.sync="modal"
				   width="75%"
			       :before-close="handleClose">

			<el-form ref="editableUser" :model="editableUser" :rules="rules" label-width="150px">
				<el-form-item label="Nickname" prop="login">
					<el-input v-model="editableUser.login"
							  placeholder="Enter user nickname"/>
				</el-form-item>

				<el-form-item label="Password" prop="password">
					<el-input v-model="editableUser.password"
							  placeholder="Password" />
				</el-form-item>

				<el-form-item label="Email" prop="email">
					<el-input v-model="editableUser.email"
							  placeholder="Enter email"/>
				</el-form-item>

				<el-form-item label="Team" prop="team">
					<el-input v-model="editableUser.team"
							  placeholder="User teams"/>
				</el-form-item>

				<el-form-item label="Calendar" prop="calendar">
					<el-select v-model="editableUser.calendar"
							   multiple

							   placeholder="Events">
						<el-option v-for="(item) in filteredEvents"
								   :key="item._id"
						           :label="item.event"
						           :value="item._id">
						</el-option>
					</el-select>
				</el-form-item>

				<!-- <el-form-item label="Setting" prop="setting">
					<el-input v-model="editableUser.setting"
							  placeholder="Settings"/>
				</el-form-item> -->
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button :type="(this.editable_user) ? 'success' : 'warning'"
						   plain
						   @click="handleConfirm"
						   v-text="(!this.editable_user) ? 'Create' : 'Update'" />
			</div>
		</el-dialog>

		<el-dialog title="Notify"
				   :visible.sync="notify_modal"
				   width="75%"
			       :before-close="handleCloseNotify">
			<el-form ref="notifyData" :model="notifyData" :rules="notifyRules" label-width="150px">
				<el-form-item label="Title" prop="title">
					<el-input v-model="notifyData.title"
							  placeholder="Enter notify title"/>
				</el-form-item>

				<el-form-item label="Message" prop="message">
					<el-input type="textarea"
							  :autosize="{ minRows: 5, maxRows: 15}"
							  v-model="notifyData.message"
							  placeholder="Enter notify message" />
				</el-form-item>

			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCloseNotify">Cancel</el-button>
				<el-button type="success"
							plain
							@click="handleConfirmNotify"
							v-text="'Send'" />
			</div>
		</el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Users',
	computed: {
		users() {
			return this.$store.state.users.users
		},
		events() {
            return this.$store.state.home.events
		},
		filteredEvents() {
			let events = this.events.filter(item => {
				let add = true

				if (this.editableUser.calendar.length) {
					this.editableUser.calendar.forEach(el => {
						if (el._id == item._id || el == item._id) add = false
					})
				}

				return add
			})

			return events
		}
	},
	data() {
		const validateLogin = (rule, value, callback) => {
			if (!(value.trim().length > 0)) {
				callback(new Error('Please enter the correct user name'))
			} else {
				callback()
			}
		}

		const validatePassword = (rule, value, callback) => {
			if (!(value.trim().length > 0)) {
				callback(new Error('Please enter the correct password'))
			} else {
				callback()
			}
		}

		const validateEmail = (rule, value, callback) => {
			if (!(value.trim().length > 0)) {
				callback(new Error('Please enter the correct email'))
			} else {
				callback()
			}
		}

		const validateNotifyTitle = (rule, value, callback) => {
			if (!(value.trim().length > 0)) {
				callback(new Error('Please enter the correct title'))
			} else {
				callback()
			}
		}

		return {
			loading: true,
			pagination_page: 1,

			modal: false,
			editable_user: false,
			editable_user_id: null,

			editableUser: {
				login: '',
				email: '',
				team: '',
				calendar: [],
				setting: '',
				password: '',

			},
			rules: {
				login: [{ required: true, trigger: 'blur', validator: validateLogin }],
				email: [{ required: true, trigger: 'blur', validator: validateEmail }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }],
			},

			notify_modal: false,
			editable_user: '',
			editable_user_id: '',

			notifyData: {
				title: '',
				message: ''
			},

			notifyRules: {
				title: [{ required: true, trigger: 'blur', validator: validateNotifyTitle }]
			}
		}
	},
	methods: {
		// user column index
		indexMethod(index) {
			return (this.pagination_page - 1) * 10 + index + 1
		},

		// handler analytics
		handlerAnalytics(id) {
			console.log(id)
		},

		// NOTOFICATION
		// show notify modal
		showNotifyModal(user) {
			this.notify_modal = true
			this.editable_user_id = user._id
		},
		// hide notify modal
		handleCloseNotify() {
			this.notify_modal = false
			this.editable_user_id = ''

			this.notifyData = {
				title: '',
				message: ''
			}
		},
		// handler send notify
		handleConfirmNotify() {
			let data = this.notifyData
			data.idUser = this.editable_user_id
			this.$refs.notifyData.validate(valid => {
				if (valid) {
					this.$store.dispatch('notifications/sendNotification', data).then(() => {
						this.handleCloseNotify()
					})
				}
			})
		},

		// CREATE/EDIT USER
		// show editable modal
		showModal(user) {
			this.modal = true

			if (user._id) {
				this.editable_user = true
				this.editable_user_id = user._id

				this.editableUser.login = user.login
				this.editableUser.password = user.password
				this.editableUser.email = user.email
				this.editableUser.team = user.team ? user.team.join(', ') : ''
				this.editableUser.calendar = user.calendar
				// this.editableUser.setting = user.setting
			}
		},
		// hide editable modal
		handleClose() {
			this.modal = false

			this.$refs.editableUser.resetFields()

			this.editable_user = false
			this.editable_user_id = null

			this.editableUser = {
				login: '',
				email: '',
				team: '',
				calendar: [],
				setting: '',
				password: '',
			}
		},
		// handler create/edit user
		handleConfirm() {
			this.$refs.editableUser.validate(valid => {
				if (valid) {
					let form_data = {} // new FormData();
					for ( var key in this.editableUser ) {
						console.log(this.editableUser[key])
                        if (this.editableUser[key]) {
							if (key == 'subscribe') {
								form_data[key] = this.editableUser[key].split(', ')
							} else {
								form_data[key] = this.editableUser[key];
							}
                        }
					}

					if (this.editable_user) this.editUser(form_data)
					else this.createUser(form_data)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		// edit user
		editUser(data) {
			this.$store.dispatch('users/updateUser', [data, this.editable_user_id]).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
					this.handleClose()
				})
			})
		},
		// create user
		createUser(data) {
			this.loading = true
			this.$store.dispatch('users/createUser', data).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
					this.handleClose()
				})
			})
		},

		// handler delete user
		handlerDelete(id) {
			this.loading = true
			this.$store.dispatch('users/deleteUser', id).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
				})
			})
		},

		// pagination
		handleCurrentChange(val) {
			this.loading = true
			this.$store.dispatch('users/getUsers', {limit: 10, page: this.pagination_page}).then(() => {
				this.loading = false
			})
		},
	},
	created() {
		let data = {
			limit: 10,
			page: 1
		}
		this.$store.dispatch('users/getUsers', data).then(() => {
			this.loading = false
		})
	},
	beforeDestroy() {
		this.$store.commit('users/SET_USERS', [])
	}
}
</script>

<style lang="scss" scoped>
.users {
	&-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h3 {
			text-transform: uppercase;
		}

		h3,
		.el-button {
			font-size: 16px;
		}
	}

	&-container {
		margin: 30px;

		.table-btns-wrapper {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		}

		.el-pagination {
			display: flex;
			justify-content: center;
		}
	}
}
</style>
