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
						{{ getDateFormat(scope.row.publicationDate) }}
					</template>
				</el-table-column>

				<el-table-column label="title" min-width="300px">
					<template slot="header">
						<div  class="header-col-container" >
							 <el-popover
								placement="bottom"
								width="300"
								trigger="click" >

								<input class="el-input__inner"
									   type="text"
									   placeholder="Enter title"
									   v-model="filtered_value.title"
									   @keyup.enter="onTitleEnter" />

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
							<el-dropdown trigger="click" @command="onCategoryEnter">
								<span v-text="'CATEGORY'" />

								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="(category, index) in categories" :key="index"
													  v-text="category.title"
													  :command="category" />
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</template>

					<template slot-scope="scope">
						{{ scope.row.categoryId.title }}
					</template>
				</el-table-column>import moment from 'moment'
import moment from 'moment'
				<el-table-column label="taimport moment from 'moment'g" width="120">
					<template slot="header">
						<div class="header-col-container" >
							<el-popover
								placement="bottom"
								width="300"
								trigger="click" >

								<input class="el-input__inner"
									   type="text"
									   placeholder="Enter tags"
									   v-model="filtered_value.tag"
									   @keyup.enter="onTagEnter" />

								<span slot="reference" v-text="'TAG'"  />
							</el-popover>
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
import moment from 'moment'

export default {
	name: 'Articles',
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		categories() {
            return this.$store.state.home.categories.docs
        },
		requestData() {
			let data = {
				tag: (this.filtered_props.tag) ? this.filtered_value.tag.split(', ') : '',
				categoryId: (this.filtered_props.category) ? this.filtered_value.category._id : '',
				title: (this.filtered_props.title) ? this.filtered_value.title : '', // "dota",
				// status: "",

				// publicationDate: {
				// 	from: "2019-06-03T09:29:38.000+00:00",
				// 	to: "2019-06-12T09:49:38.000+00:00"
				// },

				sort: {
					status: (this.filtered_props.status) ? this.filtered_value.status : '',
					publicationDate: -1
				},
				pagination: {
					limit: 10,
					page: this.pagination_page
				}
			}

			return data
		}
	},
	data() {
		return {
			loading: true,
			pagination_page: 1,

			filtered_props: {
				date: false,
				title: false,
				category: false,
				tag: false,
				status: false
			},

			filtered_value: {
				date: '',
				title: '',
				category: '',
				tag: '',
				status: 0
			},
			input: ''
		}
	},
	methods: {
		// index column
		indexMethod(index) {
            return (this.pagination_page - 1) * 10 + index + 1
		},

		// publication date filter
		getDateFormat(date) {
			return moment(date).format('DD.MM.YYYY HH:mm')
		},
		datePickerFocus() {
			this.$refs.datepicker.$children[0].focus()
		},
		onChooseDate() {
			console.log(this.date)
		},


		onTitleEnter() {
			this.filtered_props.title = true
			this.pagination_page = 1

			this.getTableData()
		},

		// category filter
		onCategoryEnter(val) {
			this.filtered_props.category = true
			this.filtered_value.category = val
			this.pagination_page = 1

			this.getTableData()
		},

		//  tag filter
		onTagEnter() {
			this.filtered_props.tag = true
			this.pagination_page = 1

			this.getTableData()
		},

		// status filter
		onStatusFilter() {
			this.filtered_props.status = true
			this.filtered_value.status = (this.filtered_value.status < 1) ? 1 : -1
			this.pagination_page = 1

			this.getTableData()
		},

		// settings btns
		handlerAnalytics(id) {
			console.log(id)
		},
		handlerDelete(id) {
			this.loading = true;
			this.$store.dispatch('articles/deleteArticle', id).then(() => {
				this.$store.dispatch('articles/getArticle', this.requestData).then(() => {
					this.loading = false;
				})
			})
		},
		handlerEdit(id) {
			this.$router.push(`/edit/edit/${id}`)
		},

		handleCurrentChange(val) {

			this.getTableData()
		},
		getTableData() {
			console.log(this.requestData)

			this.loading = true;
			this.$store.dispatch('articles/getArticle', this.requestData).then(() => {
				this.loading = false;
			})
		}
	},
	created() {
		this.$store.dispatch('articles/getArticle', this.requestData).then(() => {
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
