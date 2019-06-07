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
						<ul><li v-for="(item, index) in scope.row.calendar" :key="index" v-text="item" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="status" width="200">
					<template slot-scope="scope">
						<div class="table-btns-wrapper">
							<el-button @click="handlerAnalytics(scope.row._id)" circle><svg-icon icon-class="analytics" /></el-button>
							<el-button @click="handlerDelete(scope.row._id)" icon="el-icon-delete" circle />
							<el-button @click="showModal(scope.row)" icon="el-icon-edit-outline" circle />
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
					<el-input v-model="editableUser.calendar"
							  placeholder="User events"/>
				</el-form-item>

				<el-form-item label="Setting" prop="setting">
					<el-input v-model="editableUser.setting"
							  placeholder="Settings"/>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button :type="(this.editable_user) ? 'success' : 'warning'"
						   plain
						   @click="handleConfirm"
						   v-text="(!this.editable_user) ? 'Create' : 'Update'" />
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
		}
	},
	data() {
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
				calendar: '',
				setting: '',
				password: ''
			},
			rules: {
				// event: [{ required: true, trigger: 'blur', validator: validateEvent }],
            },
		}
	},
	methods: {
		indexMethod(index) {
			return (this.pagination_page - 1) * 10 + index + 1
		},

		handlerAnalytics(id) {
			console.log(id)
		},
		handlerDelete(id) {
			this.loading = true
			this.$store.dispatch('users/deleteUser', id).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
				})
			})
		},


		handleConfirm() {
			this.$refs.editableUser.validate(valid => {
				if (valid) {
					let form_data = new FormData();
					for ( var key in this.editableUser ) {
                        if (this.editableUser[key]) {
							if (key == 'subscribe') {
								form_data.append(key, this.editableUser[key].split(', '));
							} else {
								form_data.append(key, this.editableUser[key]);
							}
                        }
					}

					if (this.editable_event) this.editUser(form_data)
					else this.createUser(form_data)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},

		handlerEdit(data) {
			console.log(data)
		},
		createUser(data) {
			this.loading = true
			this.$store.dispatch('users/createUser', data).then(() => {
				this.$store.dispatch('users/getUsers', { limit: 10, page: this.pagination_page }).then(() => {
					this.loading = false
				})
			})
		},

		showModal(user) {
			this.modal = true

			if (user._id) {
				this.editable_user = true
				this.editable_user_id = event._id

				this.editableUser.login = user.login
				this.editableUser.email = user.email
				this.editableUser.team = user.team
				this.editableUser.calendar = user.calendar
				this.editableUser.setting = user.setting
				this.editableUser.password = user.password
			}
		},
		handleClose() {
			this.modal = false

			// this.$refs.editableEvent.resetFields()


			// this.editable_event = false
			// this.editable_event_id = null

			// this.editableEvent = {
			// 	event: '',
			// 	team1: '',
			// 	team2: '',
			// 	subscribe: '',
			// 	categoryId: '',
			// 	date: ''
			// }
		},

		handleCurrentChange(val) {
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
