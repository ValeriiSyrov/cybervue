<template>
    <div class="categories-container">
		<el-card>
			<el-header>
				<div class="categories-header">
					<h3>categories</h3>
					<el-button type="danger"
							   @click="showModal" >
						Add category
					</el-button>
				</div>
			</el-header>

			<el-main class="categories-main">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6"
							v-for="(item, index) in category.docs" :key="index">
						<div class="categoty-item-container">
							<img :src="`https://cybersp.herokuapp.com/${item.img}`" :alt="item.title">

							<div class="centered-block">
								<div class="name-wrapper">
									<span>{{item.title}}</span>
								</div>

								<div class="btns-wrapper">
									<el-button type="success" icon="el-icon-edit-outline" circle plain @click="showModal(item)" />
									<el-button type="success" icon="el-icon-delete" circle plain @click="removeCategory(item._id)" />
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-main>
		</el-card>

		<el-dialog title="Edit category"
				   :visible.sync="modal"
				   width="75%"
			       :before-close="handleClose">

			<el-form ref="editableCategory" :model="editableCategory" :rules="rules" label-width="150px">
				<el-form-item label="Title" prop="title">
					<el-input v-model="editableCategory.title"
								placeholder="Title"/>
				</el-form-item>

				<el-form-item label="Description" prop="description">
					<el-input type="textarea" :autosize="{ minRows: 5, maxRows: 15}" v-model="editableCategory.description" placeholder="Enter description" />
				</el-form-item>

				<el-form-item label="Image" prop="files">
					<input  type="file" @change="onFileInput($event)">
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">Cancel</el-button>
				<el-button :type="(this.editable_category) ? 'success' : 'warning'"
						   plain
						   @click="handleConfirm"
						   v-text="(!this.editable_category) ? 'Create' : 'Update'" />
			</div>
		</el-dialog>
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
		const validateTitle = (rule, value, callback) => {
            if ( !(value.trim().length > 0) ) {
                callback(new Error('Please enter the correct title'))
            } else {
                callback()
            }
        }

        const validateDesc = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct description'))
            } else {
                callback()
            }
		}

		const validateFile = (rule, value, callback) => {
            if (!(value || this.editable_category)) {
                callback(new Error('Please attach the file'))
            } else {
                callback()
            }
		}

		return {
			modal: false,
			editable_category: false,
			editable_category_id: null,

			editableCategory: {
                title: '',
                description: '',
                files: ''
            },

            rules: {
                title: [{ required: true, trigger: 'blur', validator: validateTitle }],
				description: [{ required: true, trigger: 'blur', validator: validateDesc }],
				files: [{ required: true, trigger: 'blur', validator: validateFile }],
            },
		}
	},
	methods: {
		showModal(category) {
			this.modal = true

			if (category._id) {
				this.editable_category = true
				this.editable_category_id = category._id

				this.editableCategory.title = category.title
				this.editableCategory.description = category.description
			}
		},

		onFileInput(e) {
            this.editableCategory.files = e.target.files[0]
        },

		handleConfirm() {
			this.$refs.editableCategory.validate(valid => {
				if (valid) {
					let form_data = new FormData();
					for ( var key in this.editableCategory ) {
                        if (this.editableCategory[key]) {
                            form_data.append(key, this.editableCategory[key]);
                        }
					}

					if (this.editable_category) this.editCategory(form_data)
					else this.addCategory(form_data)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},

		addCategory(data) {
			this.$store.dispatch('categories/createCategory', data).then(response => {
				this.handleClose()
			})
		},

		editCategory(data) {
			this.$store.dispatch('categories/updateCategory', [data, this.editable_category_id]).then(response => {
				this.handleClose()
			})
		},

		removeCategory(id) {
			this.$store.dispatch('categories/deleteCategory', id).then(() => {
				this.$store.dispatch('categories/deleteCategoryFromList', id)
			})
		},

		handleClose() {
			this.$refs.editableCategory.resetFields();

			this.modal = false,
			this.editable_category = false,
			this.editable_category_id = null,

			this.editableCategory = {
                title: '',
                description: '',
                files: ''
            }
		},
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
