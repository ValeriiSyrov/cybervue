<template>
    <div class="settings-container">
		<el-header>
			<div class="settings-header">
				<h3>Settings</h3>

				<el-button type="danger"
				           @click="showCreateModeratorModal"
						   v-text="'Add new moderator'" />
			</div>
		</el-header>

		<el-main>
			<el-table v-loading="loading"
					  :data="moderators.docs"
					  border
					  fit
					  highlight-current-row
					  style="width: 100%" >

				<el-table-column align="center"
								 label="ID"
								 width="80"
								 type="index"
								 :index="indexMethod" />

				<el-table-column label="LOGIN" width="250">
					<template slot-scope="scope">
						{{ scope.row.login }}
					</template>
				</el-table-column>

				<el-table-column label="CATEGORY" width="300">
					<template slot-scope="scope">
						<ul><li v-for="(category, index) in scope.row.allowedCategories" :key="index" v-text="category.title" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="ARTICLES" min-width="200px">
					<template slot-scope="scope">
						{{ scope.row.articles }}
					</template>
				</el-table-column>

				<el-table-column label="SETTINGS" width="200">
					<template slot-scope="scope">
						<div class="table-btns-wrapper">
							<el-button @click="showPermissionModal(scope.row)" circle><svg-icon icon-class="user" /></el-button>
							<el-button @click="showPasswordModal(scope.row)"  circle><svg-icon icon-class="password" /></el-button>
							<el-button @click="handlerDelete(scope.row)" icon="el-icon-delete" circle />
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
				:total="moderators.totalDocs">
            </el-pagination>
        </el-footer>

		<el-dialog title="Permission"
				   :visible.sync="modal.permission"
				   width="75%"
			       :before-close="closePermissionModal">
			<el-form ref="editableUser" :model="permissionData" label-width="150px">
				 <el-form-item v-for="(category, index) in categories" :key="index" :label="category.title">
					 <switch-el @switch="switchHandler"
					 			:category="category"
								:allowed="permissionData.categories" />
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="closePermissionModal">Cancel</el-button>
				<el-button type="success"
							plain
							@click="handleConfirmPermissions"
							v-text="'Confirm'" />
			</div>
		</el-dialog>

		<el-dialog title="Password"
				   :visible.sync="modal.password"
				   width="75%"
			       :before-close="closePasswordModal">
			<el-form ref="editableUser" :model="passwordData" :rules="passwordRules" label-width="150px">
				<el-form-item label="Password" prop="password">
					<el-input v-model="passwordData.password"
							  placeholder="Enter new password"/>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="closePasswordModal">Cancel</el-button>
				<el-button type="success"
						   plain
						   @click="handleConfirmPassword"
						   v-text="'Confirm'" />
			</div>
		</el-dialog>

		<el-dialog title="New moderator"
				   :visible.sync="modal.create_moderator"
				   width="75%"
			       :before-close="closeCreateModeratorModal">

			<el-form ref="createModerator" :model="createModerator" :rules="moderatorRules" label-width="150px">
				<el-form-item label="Nickname" prop="login">
					<el-input v-model="createModerator.login"
							  placeholder="Enter moderator nickname"/>
				</el-form-item>

				<el-form-item label="Password" prop="password">
					<el-input v-model="createModerator.password"
							  placeholder="Password" />
				</el-form-item>

				<el-form-item label="Email" prop="email">
					<el-input v-model="createModerator.email"
							  placeholder="Enter email"/>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="closeCreateModeratorModal">Cancel</el-button>
				<el-button type="success"
						   plain
						   @click="handleCreateModerator"
						   v-text="'Confirm'" />
			</div>
		</el-dialog>
    </div>
</template>

<script>
import SwitchEl from './components/switch.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'Settings',
	components: {
		SwitchEl
	},
	computed: {
		moderators() {
			return this.$store.state.users.users
		},
		categories() {
            return this.$store.state.home.categories.docs
        },
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

		return {
			pagination_page: 1,
			loading: true,

			modal: {
				permission: false,
				password: false,
				create_moderator: false
			},

			permissionData: {
				categories: []
			},

			passwordData: {
				password: ''
			},

			passwordRules: {
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
			},

			createModerator: {
				login: '',
				email: '',
				password: '',
			},

			moderatorRules: {
				login: [{ required: true, trigger: 'blur', validator: validateLogin }],
				email: [{ required: true, trigger: 'blur', validator: validateEmail }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }],
			},
		}
	},
	methods: {
		// user column index
		indexMethod(index) {
			return (this.pagination_page - 1) * 10 + index + 1
		},

		// Permissions settings
		showPermissionModal(user) {
			this.modal.permission = true

			this.editable_moderator = user
			this.permissionData.categories = user.allowedCategories.slice(0, user.allowedCategories.length)
		},
		closePermissionModal() {
			this.modal.permission = false
		},
		handleConfirmPermissions() {
			let data = {
				userId: this.editable_moderator._id,
				allowedCategories: this.permissionData.categories
			}

			this.loading = true
			this.$store.dispatch('users/setAllowedCategories', data).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page, moderator: true }).then(() => {
					this.loading = false
					this.closePermissionModal()
				})
			})
		},
		switchHandler(category) {
			if (category[0]) {
				this.permissionData.categories.push(category[1])
			} else {
				let categories = this.permissionData.categories.filter(el => {
					return el._id != category[1]._id
				})
				this.permissionData.categories = categories
			}
		},

		// change user password
		showPasswordModal(user) {
			this.modal.password = true
			this.editable_moderator = user
		},
		closePasswordModal() {
			this.modal.password = false
		},
		handleConfirmPassword() {
			this.$refs.editableUser.validate(valid => {
				if (valid) {
					let data = {
						login: this.editable_moderator.login,
						email: this.editable_moderator.email,
						moderator: true,
						password: this.passwordData.password
					}

					this.$store.dispatch('users/updateUser', [data, this.editable_moderator._id]).then(() => {
						this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
							this.loading = false
							this.closePasswordModal()
						})
					})
				}
			})
		},

		// delete user
		handlerDelete(user) {
			this.loading = true
			this.$store.dispatch('users/deleteUser', user._id).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
				})
			})
		},

		// create moderator
		showCreateModeratorModal() {
			this.modal.create_moderator = true
		},
		closeCreateModeratorModal() {
			this.$refs.createModerator.resetFields()
			this.modal.create_moderator = false
		},
		handleCreateModerator() {
			this.$refs.createModerator.validate(valid => {
				if (valid) {
					let data = {
						login: this.createModerator.login,
						email: this.createModerator.email,
						password: this.createModerator.password,
						moderator: true
					}

					this.loading = true
					this.$store.dispatch('users/createUser', data).then(() => {
						this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
							this.loading = false
							this.closeCreateModeratorModal()
						})
					})
				}
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
			page: 1,
			moderator: true
		}
		this.$store.dispatch('users/getUsers', data).then(() => {
			this.loading = false
		})
	}
}
</script>

<style lang="scss" scoped>
.settings {
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
			justify-content: space-around;
			align-items: center;
		}
	}
}
</style>
