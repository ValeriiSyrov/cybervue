<template>
    <div class="calendar-container">
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
						{{ getDateFormat(scope.row.publicationDate) }}
					</template>
				</el-table-column>

				<el-table-column label="EVENT" width="150">
					<template slot-scope="scope">
						{{ scope.row.event }}
					</template>
				</el-table-column>

				<el-table-column label="CATEGORY" width="200">
					<template slot-scope="scope">
						<!-- {{ scope.row.category }} -->
						{{ scope.row._id }}
					</template>
				</el-table-column>

				<el-table-column label="TEAM 1" width="150">
					<template slot-scope="scope">
						<!-- {{ scope.row.category }} -->
						{{ scope.row.team1 }}
					</template>
				</el-table-column>

				<el-table-column label="TEAM 2" width="150">
					<template slot-scope="scope">
						<!-- {{ scope.row.category }} -->
						{{ scope.row.team2 }}
					</template>
				</el-table-column>

				<el-table-column label="SUBSCRIBE" min-width="300px">
					<template slot-scope="scope">
						<ul><li v-for="(mail, index) in scope.row.subscribe" :key="index" v-text="mail" /></ul>
					</template>
				</el-table-column>

				<el-table-column label="RESULT" width="300">
					<template slot-scope="scope">

					</template>
				</el-table-column>

				<el-table-column label="status" width="200">
					<template slot-scope="scope">
						<div class="table-btns-wrapper">
							<el-button @click="handlerAnalytics(scope.row._id)" circle><svg-icon icon-class="analytics" /></el-button>
							<el-button @click="handlerDelete(scope.row._id)" icon="el-icon-delete" circle />
							<el-button @click="handlerEdit(scope.row._id)" icon="el-icon-edit-outline" circle />
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
	name: 'Calendar',
	computed: {
		events() {
			console.log(this.$store.state.calendar.events)
			return this.$store.state.calendar.events
		}
	},
	data() {
		return {
			loading: true
		}
	},
	methods: {
		indexMethod() {
			return 1
		},

		// publication date filter
		getDateFormat(date) {
			return moment(date).format('DD.MM.YYYY HH:mm')
		},

		// settings
		handlerAnalytics(id) {
			console.log(id)
		},
		handlerDelete(id) {
			console.log(id)
		},
		handlerEdit(id) {
			console.log(id)
		},
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
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>
