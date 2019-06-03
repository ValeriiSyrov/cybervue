<template>
    <div class="dashboard-container">
		<div class="header">
			<el-row :gutter="20">
				<el-col v-for="(block, index) in headerStatBlock" :key="index"
						:xs="24" :sm="8" :md="8" :lg="8" :xl="8">
					<el-card>
						<span v-text="block.count" />
						<h2 v-text="`${block.name.split('_').join(' ').toUpperCase()}`" />
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="main">
			<el-row :gutter="20">
				<el-col v-for="(block, index) in mainData" :key="index"
						:xs="24" :sm="8" :md="8" :lg="8" :xl="8">
					<block-section :block="block" />
				</el-col>
			</el-row>
		</div>
    </div>
</template>

<script>
import BlockSection from './components/BlockSection'

import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	components: {
		BlockSection
	},
	computed: {
		headerStatBlock() {
			return [
				{
					name: 'users',
					count: this.$store.state.home.users
				},

				{
					name: 'aproved_articles',
					count: this.$store.state.home.recent_publishing.totalDocs
				},

				{
					name: 'pending_articles',
					count: this.$store.state.home.pending_articles.totalDocs
				},
			]
		},
		recentPublishing() {
			return {
				name: 'recent_publishing',
				list: this.$store.state.home.recent_publishing
			}
		},
		pendingArticles() {
			return {
				name: 'pending_articles',
				list: this.$store.state.home.pending_articles
			}
		},
		categories() {
			return {
				name: 'categories',
				list: this.$store.state.home.pending_articles
			}
		},
		mainData() {
			return [
				this.recentPublishing,
				this.pendingArticles,
				this.categories
			]
		}

	},
	data() {
		return {

		}
	},
	created() {
		this.$store.dispatch('home/getHomeInfo', [1, 1])
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	&-container {
		margin: 30px;

	}
}
</style>
<style scoped>
.dashboard-container >>> .el-row {
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
}
.dashboard-container >>> .el-col {
	margin-bottom: 10px;
}
.dashboard-container >>> .el-card {
	height: 100%;
}
.dashboard-container >>> .main .el-card__body {
	padding: 0
}
.dashboard-container >>> .header .el-card__body {
	text-align: center;
}
.dashboard-container >>> .el-col span {
	font-size: 20px;
}
.dashboard-container >>> .el-col:first-child span {
	color: #fd6d82;
}
.dashboard-container >>> .el-col:nth-child(2) span {
	color: #26d29c;
}
.dashboard-container >>> .el-col:nth-child(3) span {
	color: #ffab74;
}
.dashboard-container >>> .el-col h2 {
	margin-top: 5px;
	margin-bottom: 10px;
}
</style>
