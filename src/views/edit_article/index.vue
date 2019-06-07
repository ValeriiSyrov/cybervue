<template>
    <div class="pending-article-container">
        <el-main>
            <el-card>
                <el-header>
                    <h2>Edit Article</h2>
                </el-header>

                <el-form ref="editableForm" :model="editableData" :rules="rules" label-width="150px">
                    <el-form-item label="Title" prop="title">
                        <el-input v-model="editableData.title"
                                  placeholder="Title"/>
                    </el-form-item>

                    <el-form-item label="Category" prop="categoryId">
                        <el-select v-model="editableData.categoryId" placeholder="Select category">
                            <el-option v-for="(category, index) in categories" :key="index"
                                       :value="category._id"
                                       :label="category.title" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Description" prop="description">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 15}" v-model="editableData.description" placeholder="Enter description" />
                    </el-form-item>

                    <el-form-item label="Tag" prop="tag">
                        <el-input v-model="editableData.tag" placeholder="Tag" />
                    </el-form-item>

                    <el-form-item label="Recommendations" prop="rec">
                        <el-input v-model="editableData.rec" placeholder="Recommendations"></el-input>
                    </el-form-item>

                    <el-form-item label="Image" prop="file">
                        <input  type="file" @change="onFileInput($event)">
                    </el-form-item>

                    <el-form-item>
                        <el-button :type="(this.article_type !== 'approved') ? 'success' : 'warning'"
                                   plain
                                   @click="onSubmit"
                                   v-text="`${(this.article_type !== 'approved') ? 'Approve' : 'Edit'}`" />
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </div>
</template>

<script>
export default {
    computed: {
        editableArticle() {
            return this.$store.state.home.editable_article
        },
        categories() {
            return this.$store.state.home.categories.docs
        },
    },
    data() {
        const validateTitle = (rule, value, callback) => {
            if ( !(value.trim().length > 0) ) {
                callback(new Error('Please enter the correct title'))
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

        const validateDesc = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct description'))
            } else {
                callback()
            }
        }

        const validateTag = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct tags'))
            } else {
                callback()
            }
        }

        const validateRecomendation = (rule, value, callback) => {
            if (!(value.trim().length > 0)) {
                callback(new Error('Please enter the correct recomendation'))
            } else {
                callback()
            }
        }

        const validateFile = (rule, value, callback) => {
            if (!value) {
                callback(new Error('Please attach file'))
            } else {
                callback()
            }
        }

        return {

            editableData: {
                title: '',
                categoryId: '',
                description: '',
                tag: '',
                rec: '',
                files: ''
            },

            rules: {
                title: [{ required: true, trigger: 'blur', validator: validateTitle }],
                categoryId: [{ required: true, trigger: 'blur', validator: validateCategory }],
                description: [{ required: true, trigger: 'blur', validator: validateDesc }],
                tag: [{ required: true, trigger: 'blur', validator: validateTag }],
                // rec: [{ required: false, trigger: 'blur', validator: validateRecomendation }],
                // files: [{ required: false, trigger: 'blur', validator: validateFile }],
            },

            article_type: ''
        }
    },
    methods: {
        onFileInput(e) {
            this.editableData.files = e.target.files[0]
        },
        onSubmit() {
            this.$refs.editableForm.validate(valid => {
				if (valid) {
                    var form_data = new FormData();

                    console.log(this.editableData)

                    for ( var key in this.editableData ) {
                        if (this.editableData[key]) {
                            form_data.append(key, this.editableData[key]);
                        }
                    }

                    // if (this.article_type !== 'approved') {
                        form_data.append('status', 'approved');
                    // }

                    this.$store.dispatch('home/updateArticle', [form_data, this.$route.params.id])
				} else {
					console.log('error submit!!')
					return false
				}
			})
        }
    },
    created() {
        this.$store.dispatch('home/getArticleById', this.$route.params.id).then(response => {
            let data = {
                title: response.data.title,
                categoryId: response.data.categoryId._id,
                description: response.data.description,
                tag: response.data.tag.join(', '),
                rec: '',
                files: ''
            }


            this.article_type = response.data.status
            console.log(this.article_type)
            this.editableData = data
        })
    }
}
</script>

<style>
.el-header {
    display: flex;
    align-items: center;
}
</style>
