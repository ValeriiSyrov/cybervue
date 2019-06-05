<template>
    <div class="articles-container">
		<el-main>
			<el-table v-loading="loading"
					  :data="articles.docs"
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

				<el-table-column width="200">
					<template slot="header">
						<div class="header-col-container" >
							<span v-text="'PUBLICATION DATE'" @click="datePickerFocus" />

							<el-date-picker
								ref="datepicker"
								type="date"
								v-model="filtered_value.date"
								@change="onChooseDate" />
						</div>
					</template>

					<template slot-scope="scope">
						{{ scope.row.publicationDate }}
					</template>
				</el-table-column>

				<el-table-column label="title" min-width="300px">
					<template slot="header">
						<div  class="header-col-container" >
							 <el-popover
								placement="bottom"
								width="300"
								trigger="click" >

								<el-input v-model="filtered_value.date"
										  placeholder="Enter title"
										  @keyup.enter.native="onTitleEnter" />

								<span slot="reference" v-text="'TITLE'"  />
							</el-popover>
						</div>
					</template>

					<template slot-scope="scope">
						{{ scope.row.title }}
					</template>
				</el-table-column>

				<el-table-column label="category" width="150">
					<template slot="header">
						<div class="header-col-container" >
							<el-dropdown trigger="click">
								<span v-text="'CATEGORY'" />

								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>Action 1</el-dropdown-item>
									<el-dropdown-item>Action 2</el-dropdown-item>
									<el-dropdown-item>Action 3</el-dropdown-item>
									<el-dropdown-item disabled>Action 4</el-dropdown-item>
									<el-dropdown-item divided>Action 5</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</template>
					<template slot-scope="scope">
						{{ scope.row.categoryId.title }}
					</template>
				</el-table-column>

				<el-table-column label="tag" width="120">
					<template slot="header">
						<div class="header-col-container" >
							<el-dropdown trigger="click">
								<span v-text="'TAG'" />

								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>Action 1</el-dropdown-item>
									<el-dropdown-item>Action 2</el-dropdown-item>
									<el-dropdown-item>Action 3</el-dropdown-item>
									<el-dropdown-item disabled>Action 4</el-dropdown-item>
									<el-dropdown-item divided>Action 5</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</template>

					<template slot-scope="scope">
						{{ scope.row.tag.join(' ') }}
					</template>
				</el-table-column>

				<el-table-column label="status" width="100">
					<template slot="header">
						<span v-text="'STATUS'" @click="onStatusFilter"/>
					</template>
					<template slot-scope="scope">
						{{ scope.row.status }}
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

		<el-footer>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pagination_page"
                layout="prev, pager, next"
                :total="articles.totalDocs">
            </el-pagination>
        </el-footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Articles',
	computed: {
		articles() {
			console.log(this.$store.state.articles.articles)
			return this.$store.state.articles.articles
		},
		requestData() {
			let data = {
				tag: (this.filtered_props.tag) ? '' : '', // ["team4"],
				//categoryId: (this.filtered_props.tag) ? '' : '', // ["5cf38dc574ae9f22a0c2c67f"],
				title: (this.filtered_props.title) ? '' : '', // "dota",
				// status: "",
				publicationDate: {
					from: "2019-06-03T09:29:38.000+00:00",
					to: "2019-06-12T09:49:38.000+00:00"
				},
				sort: {
					publicationDate:-1,
					status: 1
				},
				pagination: {
					limit: 10,
					page: this.pagination_page
				}
			}
		}
	},
	data() {
		return {
			loading: true,
			pagination_page: null,

			filtered_props: {
				date: false,
				title: false,
				category: false,
				tag: false
			},

			filtered_value: {
				date: '',
				title: '',
				category: '',
				tag: ''
			}
		}
	},
	methods: {
		// index column
		indexMethod(index) {
            return (this.pagination_page - 1) * 10 + index + 1
		},

		// date picker
		datePickerFocus() {
			this.$refs.datepicker.$children[0].focus()
		},
		onChooseDate() {
			console.log(this.date)
		},


		onTitleEnter() {

		},

		onStatusFilter() {

		},

		// settings btns
		handlerAnalytics(id) {
			console.log(id)
		},
		handlerDelete(id) {
			console.log(id)
		},
		handlerEdit(id) {
			console.log(id)
		},
		handleCurrentChange(val) {

			let data = {
				"status": "",

				"pagination": {
					"limit": 10,
					"page": val
				}
			}

			this.loading = true;
			this.$store.dispatch('articles/getArticle', data).then(() => {
				this.loading = false;
			})
		},
		getTableData() {
			this.loading = true;
			this.$store.dispatch('articles/getArticle', this.requestData).then(() => {
				this.loading = false;
			})
		}
	},
	created() {
		let data = {
			"status": "",

			sort: {
				publicationDate:-1,
				status: 1

			},

			"pagination": {
				"limit": 10,
				"page": 1
			}
		}

		this.$store.dispatch('articles/getArticle', data).then(() => {
			this.loading = false;
		})
	}
}
</script>

<style lang="scss">
.articles {
	&-container {
		margin: 30px;

		.table-btns-wrapper {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.el-pagination {
			display: flex;
			justify-content: center;
		}

		.el-table__body-wrapper {
			overflow-x: auto;
		}

		.header-col-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}

		.header-col-container .el-date-editor {
			height: 0;
		}
	}
}
</style>
