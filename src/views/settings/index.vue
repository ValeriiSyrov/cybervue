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
			<el-table :data="moderators.docs"
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
						<ul><li v-for="(category, index) in scope.row.allowedCategories" :key="index" v-text="category" /></ul>
						{{ scope.row.category }}
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

		<el-dialog title="Permission"
				   :visible.sync="modal.permission"
				   width="75%"
			       :before-close="closePermissionModal">
			<el-form ref="editableUser" :model="permissionData" label-width="150px">
				 <el-form-item v-for="(category, index) in categories" :key="index" :label="category">
					<el-switch v-model="permissionData.test"></el-switch>
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
			<el-form ref="editableUser" :model="passwordData" label-width="150px">
				<el-form-item label="Password" prop="login">
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
			<el-form ref="editableUser" :model="passwordData" label-width="150px">
				<el-form-item label="Password" prop="login">
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Settings',
	computed: {
		moderators() {
			return this.$store.state.users.users
		},
		categories() {
            return this.$store.state.home.categories.docs
        },
	},
	data() {
		return {
			pagination_page: 1,

			modal: {
				permission: false,
				password: false,
				create_moderator: false
			},

			permissionData: {
				test: false
			},

			passwordData: {
				password: ''
			},

			editable_moderator: {}

			// moderators: {
			// 	docs: [
			// 		{
			// 			login: 'username',
			// 			category: 'category',
			// 			articles: 'articles'
			// 		}
			// 	]
			// }
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
		},
		closePermissionModal() {
			this.modal.permission = false
		},
		handleConfirmPermissions() {
			console.log(this.permissionData)
		},

		// change user password
		showPasswordModal(user) {
			this.modal.password = true
		},
		closePasswordModal() {
			this.modal.password = false
		},
		handleConfirmPassword() {
			console.log(this.passwordData)
		},

		// delete user
		handlerDelete(user) {

		},

		// create moderator
		showCreateModeratorModal() {
			this.modal.create_moderator = true
		},
		closeCreateModeratorModal() {
			this.modal.create_moderator = false
		}
	},
	created() {
		let data = {
			limit: 10,
			page: 1,
			moderator: false
		}
		this.$store.dispatch('users/getUsers', data).then(() => {
			this.loading = false
		})
	}
}
</script>

<style lang="scss" scoped>
.settings {
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
