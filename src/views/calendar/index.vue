<template>
    <div class="calendar-container">
		<el-header>
			<div class="calendar-header">
				<h3>Events</h3>

				<el-button type="danger"
				           @click="showModal"
						   v-text="'Add event'" />
			</div>
		</el-header>

		<el-main>
			<el-table v-loading="loading"
					  :data="events.docs"
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

				<el-table-column label="PUBLICATION DATE" width="200">
					<template slot-scope="scope">
						{{ getDateFormat(scope.row.date) }}
					</template>
				</el-table-column>

				<el-table-column label="EVENT" min-width="200px">
					<template slot-scope="scope">
						{{ scope.row.event }}
					</template>
				</el-table-column>

				<el-table-column label="CATEGORY" width="150">
					<template slot-scope="scope">
						{{ scope.row.categoryId.title }}
					</template>
				</el-table-column>

				<el-table-column label="TEAM 1" width="125">
					<template slot-scope="scope">
						{{ scope.row.team1 }}
					</template>
				</el-table-column>

				<el-table-column label="TEAM 2" width="122">
					<template slot-scope="scope">
						{{ scope.row.team2 }}
					</template>
				</el-table-column>

				<el-table-column label="SUBSCRIBE" width="250">
					<template slot-scope="scope">
						<ul><li v-for="(mail, index) in scope.row.subscribe" :key="index" v-text="mail" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="RESULT" width="150">
					<template slot-scope="scope">
						{{ scope.row.result }}
					</template>
				</el-table-column>

				<el-table-column label="STATUS" width="150">
					<template slot-scope="scope">
						<div class="table-btns-wrapper">
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
				:total="events.totalDocs">
            </el-pagination>
        </el-footer>

		<el-dialog title="Edit event"
				   :visible.sync="modal"
				   width="75%"
			       :before-close="handleClose">

			<el-form ref="editableEvent" :model="editableEvent" :rules="rules" label-width="150px">
				<el-form-item label="Event" prop="event">
					<el-input v-model="editableEvent.event"
							  placeholder="Event"/>
				</el-form-item>

				<el-form-item label="Team 1" prop="team1">
					<el-input v-model="editableEvent.team1"
							  placeholder="Team 1"/>
				</el-form-item>

				<el-form-item label="Team 2" prop="team2">
					<el-input v-model="editableEvent.team2"
							  placeholder="Team 2"/>
				</el-form-item>

				<el-form-item label="Subscribe" prop="subscribe">
					<el-input v-model="editableEvent.subscribe"
							  placeholder="Subscribe"/>
				</el-form-item>

				<el-form-item label="Category" prop="categoryId">
					<el-select v-model="editableEvent.categoryId" placeholder="Select category">
						<el-option v-for="(category, index) in categories" :key="index"
									:value="category._id"
									:label="category.title" />
					</el-select>
				</el-form-item>

				<el-form-item label="Date" prop="date">
					<el-date-picker v-model="editableEvent.date"
									type="date"
									placeholder="Pick a day" />
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button :type="(this.editable_event) ? 'success' : 'warning'"
						   plain
						   @click="handleConfirm"
						   v-text="(!this.editable_event) ? 'Create' : 'Update'" />
			</div>

		</el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
	name: 'Calendar',
	computed: {
		events() {
			return this.$store.state.calendar.events
		},
		categories() {
            return this.$store.state.home.categories.docs
        },
	},
	data() {
		const validateEvent = (rule, value, callback) => {
            if ( !(value.trim().length > 0) ) {
                callback(new Error('Please enter the correct event'))
            } else {
                callback()
            }
        }

        const validateTeam1 = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct team1'))
            } else {
                callback()
            }
		}

		const validateTeam2 = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct team1'))
            } else {
                callback()
            }
		}

		const validateCategory = (rule, value, callback) => {
            if ( !(value.length > 0) ) {
                callback(new Error('Please enter the correct category'))
            } else {
                callback()
            }
        }

		const validateDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('Please pick the date'))
            } else {
                callback()
            }
		}

		return {
			loading: true,
			pagination_page: 1,

			modal: false,
			editable_event: false,
			editable_event_id: null,

			editableEvent: {
				event: '',
				team1: '',
				team2: '',
				subscribe: '',
				categoryId: '',
				date: ''
			},
			rules: {
				event: [{ required: true, trigger: 'blur', validator: validateEvent }],
				team1: [{ required: true, trigger: 'blur', validator: validateTeam1 }],
				team2: [{ required: true, trigger: 'blur', validator: validateTeam2 }],
				categoryId: [{ required: true, trigger: 'blur', validator: validateCategory }],
				date: [{ required: true, trigger: 'blur', validator: validateDate }],
            },
		}
	},
	methods: {
		indexMethod(index) {
            return (this.pagination_page - 1) * 10 + index + 1
		},

		// publication date filter
		getDateFormat(date) {
			return moment(date).format('DD.MM.YYYY HH:mm')
		},

		// settings
		handlerDelete(id) {
			this.loading = true;
			this.$store.dispatch('calendar/deleteEvent', id).then(() => {
				this.$store.dispatch('calendar/getEvents', {limit: 10, page: 1}).then(() => {
					this.loading = false;
				})
			})
		},

		handleCurrentChange(val) {
			this.$store.dispatch('calendar/getEvents', {limit: 10, page: val}).then(() => {
				this.loading = false;
			})
		},

		handleConfirm() {
			this.$refs.editableEvent.validate(valid => {
				if (valid) {
					let form_data = new FormData();
					for ( var key in this.editableEvent ) {
                        if (this.editableEvent[key]) {
							if (key == 'subscribe') {
								form_data.append(key, this.editableEvent[key].split(', '));
							} else {
								form_data.append(key, this.editableEvent[key]);
							}
                        }
					}

					if (this.editable_event) this.editEvent(form_data)
					else this.addEvent(form_data)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},

		editEvent(data) {
			this.loading = true;
			this.$store.dispatch('calendar/updateEvent', [data, this.editable_event_id]).then(() => {
				this.$store.dispatch('calendar/getEvents', {limit: 10, page: this.pagination_page}).then(() => {
					this.handleClose()
					this.loading = false;
				})
			})
		},
		addEvent(data) {
			this.loading = true;
			this.$store.dispatch('calendar/createEvent', data).then(() => {
				this.$store.dispatch('calendar/getEvents', {limit: 10, page: this.pagination_page}).then(() => {
					this.handleClose()
					this.loading = false;
				})
			})
		},

		showModal(event) {
			this.modal = true

			if (event._id) {
				this.editable_event = true
				this.editable_event_id = event._id

				this.editableEvent.event = event.event
				this.editableEvent.team1 = event.team1
				this.editableEvent.team2 = event.team2
				this.editableEvent.subscribe = (event.subscribe) ? event.subscribe.join(', ') : ''
				this.editableEvent.categoryId = event.categoryId._id
				this.editableEvent.date = event.date
			}
		},
		handleClose() {
			this.$refs.editableEvent.resetFields()

			this.modal = false

			this.editable_event = false
			this.editable_event_id = null

			this.editableEvent = {
				event: '',
				team1: '',
				team2: '',
				subscribe: '',
				categoryId: '',
				date: ''
			}
		}
	},
	created() {
		this.$store.dispatch('calendar/getEvents', {limit: 10, page: 1}).then(() => {
			this.loading = false;
		})
	}
}
</script>

<style lang="scss" scoped>
.calendar {
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
