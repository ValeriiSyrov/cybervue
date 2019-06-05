<template>
    <div class="categories-container">
		<el-card>
			<el-header>
				<div class="categories-header">
					<h3>categories</h3>
					<el-button type="danger"
							   @click="addCategory" >
						Add category
					</el-button>
				</div>
			</el-header>

			<el-main class="categories-main">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6"
							v-for="(item, index) in category.docs" :key="index">
						<div class="categoty-item-container">
							<img :src="`http://192.168.0.83:7000/${item.img}`" :alt="item.title">

							<div class="centered-block">
								<div class="name-wrapper">
									<span>{{item.title}}</span>
								</div>

								<div class="btns-wrapper">
									<el-button type="success" icon="el-icon-edit-outline" circle plain @click="editCategory(item._id)" />
									<el-button type="success" icon="el-icon-delete" circle plain @click="removeCategory(item._id)" />
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-main>
		</el-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Categories',
	computed: {
		category() {
			return this.$store.state.home.categories
		}
	},
	data() {
		return {

		}
	},
	methods: {
		addCategory(item) {
			console.log('add category')
		},

		editCategory(item) {
			console.log('edit category')
		},

		removeCategory(id) {
			console.log(id)
			this.$store.dispatch('categories/deleteCategory', id).then(() => {
				this.$store.dispatch('categories/deleteCategoryFromList', id)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.categories {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>

<style lang="scss">
.categories {
	&-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h3,
		.el-button {
			font-size: 16px;
		}

		h3 {
			text-transform: uppercase;
		}
	}

	&-main {
		.el-col {
			margin-bottom: 20px;
		}
		.categoty-item-container {
			position: relative;
			height: 200px;

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.centered-block {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.name-wrapper {
				background: rgba(0,0,0,.5);
				padding: 2px 12px;
				font-size: 32px;
				font-weight: bold;
				color: #fff;
				text-align: center;
				margin-bottom: 10px;
			}

			.btns-wrapper {
				text-align: center;
			}
		}
	}
}
</style>
